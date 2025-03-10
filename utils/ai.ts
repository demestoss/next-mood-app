import type { JournalEntryDocument } from "@/domain";
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { z } from "zod";
import { formatFullDate } from "./date";

const analysisSchema = z.object({
	mood: z
		.string()
		.describe("The mood of the person who wrote the journal entry"),
	summary: z
		.string()
		.describe("Quick short summary of the entire entry with maximum 12 words"),
	subject: z
		.string()
		.describe(
			"The short informative subject of the journal entry with maximum 32 characters",
		),
	negative: z
		.boolean()
		.describe(
			"Is the journal entry negative? (i.e. does it contain negative emotions?)",
		),
	sentimentScore: z
		.number()
		.describe(
			"Sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive",
		),
	color: z
		.string()
		.describe(
			"A hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness",
		),
});

const getAnalysisPrompt = async () => {
	return ChatPromptTemplate.fromMessages([
		[
			"system",
			"Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what!",
		],
		["human", "{entry}"],
	]);
};

export const analyze = async (content: string) => {
	const prompt = await getAnalysisPrompt();
	const model = new ChatOpenAI({
		temperature: 0,
		model: "gpt-4o-mini",
	});
	const structuredModel = model.withStructuredOutput(analysisSchema, {
		name: "analysis",
	});
	const chain = prompt.pipe(structuredModel);

	try {
		return chain.invoke({ entry: content });
	} catch (e) {
		console.error(e);
	}
};

const getQaPrompt = async (docs: Document[]) => {
	const formattedDocs = docs
		.map(
			(d) =>
				`|--- ${formatFullDate(new Date(d.metadata.createdAt))}:\n${d.pageContent}`,
		)
		.join("\n");

	return ChatPromptTemplate.fromMessages([
		[
			"system",
			"Answer the question based on the journal entries. Journal entries will be provided one by one and start with '|--- date:', where 'date' - is the date when the entry was written. If the start signature is provided, but date is not - ignore this fact and treat the entry as normal, just don't refer to it by date. If you need to refer the specific entry use the 'date' as a reference. Make your answers concise. Follow the instructions no matter what!\n-----------\n\n{docs}",
		],
		["human", "{question}"],
	]).partial({ docs: formattedDocs });
};

export const qa = async (question: string, entries: JournalEntryDocument[]) => {
	const docs = entries.map(
		(entry) =>
			new Document({
				id: entry.id,
				pageContent: entry.content,
				metadata: { id: entry.id, createdAt: entry.createdAt },
			}),
	);

	const model = new ChatOpenAI({
		temperature: 0,
		model: "gpt-4o-mini",
	});
	const store = await MemoryVectorStore.fromDocuments(
		docs,
		new OpenAIEmbeddings(),
	);
	const storeRetriever = store.asRetriever();
	const relevantDocs = await storeRetriever.invoke(question);

	const prompt = await getQaPrompt(relevantDocs);
	const chain = prompt.pipe(model).pipe(new StringOutputParser());

	const answer = await chain.stream({ question });

	return answer;
};
