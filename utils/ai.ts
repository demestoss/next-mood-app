import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import type { JournalEntry } from "@prisma/client";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
	z.object({
		mood: z
			.string()
			.describe("the mood of the person who wrote the journal entry."),
		summary: z.string().describe("quick summary of the entire entry."),
		negative: z
			.string()
			.describe(
				"is the journal entry negative? (i.e. does it contain negative emotions?).",
			),
		color: z
			.string()
			.describe(
				"a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.",
			),
	}),
);

const getPrompt = async (content: string) => {
	const formatInstructions = parser.getFormatInstructions();

	const prompt = new PromptTemplate({
		template:
			"Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formatInstructions}\n{entry}",
		inputVariables: ["entry"],
		partialVariables: {
			formatInstructions,
		},
	});

	const input = await prompt.format({
		entry: content,
	});
	console.log(input);
	return input;
};

export const analyze = async (entry: JournalEntry) => {
	const input = await getPrompt(entry.content);
	const model = new ChatOpenAI({
		temperature: 0,
		model: "gpt-4o-mini",
		apiKey: process.env.OPENAI_API_KEY,
	});
	const result = await model.invoke(input);
	console.log(result);
};
