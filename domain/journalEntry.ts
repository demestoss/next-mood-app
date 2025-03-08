import type { JournalEntry, Prisma } from "@prisma/client";

export type JournalEntryWithAnalysis = Prisma.JournalEntryGetPayload<{
	include: { analysis: true };
}>;

export type UpdateJournalInput = Pick<JournalEntry, "content">;
