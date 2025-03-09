"use server";
import db from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getEntryById = cache(async (entryId: string) => {
	const user = await getUserByClerkId();
	return retrieveCachedEntryById(entryId, user.id);
});

const retrieveCachedEntryById = unstable_cache(retrieveEntryById, [], {
	tags: ["journal:entry"],
	revalidate: 3600 * 24,
});

async function retrieveEntryById(entryId: string, userId: string) {
	const entry = await db.journalEntry.findUnique({
		where: {
			userId_id: {
				userId,
				id: entryId,
			},
		},
		include: {
			analysis: true,
		},
	});

	if (!entry) {
		redirect("/journal");
	}
	return entry;
}
