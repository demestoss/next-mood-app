"use server";
import db from "@/db/db";
import { qa } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";

export const sendQuestion = async (_: unknown, form: FormData) => {
	let question = (form.get("question") ?? "") as string;
	question = question.trim();
	if (!question) {
		return {
			error: "Question cannot be empty",
		};
	}

	const user = await getUserByClerkId();
	const entries = await db.journalEntry.findMany({
		where: {
			userId: user.id,
		},
		select: {
			id: true,
			content: true,
			createdAt: true,
		},
	});

	const answer = await qa(question, entries);

	return {
		response: answer,
	};
};
