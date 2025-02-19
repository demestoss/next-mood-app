"use server";
import db from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewJournalEntry() {
	const user = await getUserByClerkId();
	const entry = await db.journalEntry.create({
		data: {
			userId: user.id,
			content: "Write about your day!",
		},
	});
	revalidateTag("journal:entries");
	redirect(`journal/${entry.id}`);
}
