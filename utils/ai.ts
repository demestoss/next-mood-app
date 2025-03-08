import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
	z.object({
		mood: z
			.string()
			.describe("the mood of the person who wrote the journal entry."),
		summary: z
			.string()
			.describe(
				"quick short summary of the entire entry with maximum 12 words.",
			),
		subject: z
			.string()
			.describe(
				"the short informative subject of the journal entry with maximum 32 characters.",
			),
		negative: z
			.boolean()
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

	return prompt.format({
		entry: content,
	});
};

export const analyze = async (content: string) => {
	const input = await getPrompt(content);
	const model = new ChatOpenAI({
		temperature: 0,
		model: "gpt-4o-mini",
		apiKey: process.env.OPENAI_API_KEY,
	});
	const result = await model.invoke(input);

	try {
		return parser.parse(`${result.content}`);
	} catch (e) {
		console.error(e);
	}
};
