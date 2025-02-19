"use client";

import { updateJournalEntry } from "@/app/(dashboard)/journal/_actions";
import Editor from "@/components/Editor";
import type { JournalEntry } from "@prisma/client";
import { delay } from "framer-motion";

export default function JournalEntryEditor({ entry }: { entry: JournalEntry }) {
	return (
		<Editor
			entry={entry}
			onSaveAction={async (content) => {
				await updateJournalEntry(entry.id, { content });
			}}
		/>
	);
}
