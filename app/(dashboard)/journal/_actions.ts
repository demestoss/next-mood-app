"use server";
import db from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import type { JournalEntry } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
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
	redirect(`/journal/${entry.id}`);
}

interface UpdateJournalInput extends Pick<JournalEntry, "content"> {}

export async function updateJournalEntry(
	entryId: string,
	input: UpdateJournalInput,
) {
	const user = await getUserByClerkId();
	const entry = await db.journalEntry.update({
		where: {
			userId: user.id,
			id: entryId,
		},
		data: input,
	});
	revalidatePath(`/journal/${entry.id}`);
}
