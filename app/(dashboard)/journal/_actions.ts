"use server";
import db from "@/db/db";
import type { UpdateJournalInput } from "@/domain";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewJournalEntry() {
    const user = await getUserByClerkId();
    const entry = await db.journalEntry.create({
        data: {
            userId: user.id,
            content: "Write about your day!",
            analysis: {
                create: {
                    color: "#93c5fd",
                    mood: "happy",
                    summary: "",
                    subject: "",
                    negative: false,
                    sentimentScore: 0,
                    userId: user.id,
                },
            },
        },
    });

    revalidateTag("journal:entries");
    redirect(`/journal/${entry.id}`);
}

export async function updateJournalEntry(
    entryId: string,
    input: UpdateJournalInput,
) {
    const user = await getUserByClerkId();
    const entry = await db.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: entryId,
            },
        },
        data: input,
    });

    // This cound be done in a background job
    const analysis = await analyze(entry.content);
    if (analysis) {
        await db.analysis.upsert({
            where: {
                entryId,
            },
            create: {
                entryId,
                userId: user.id,
                ...analysis,
            },
            update: analysis,
        });
    }

    revalidateTag("journal:entries");
    revalidatePath(`/journal/${entry.id}`);
}
