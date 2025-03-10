"use client";
import { updateJournalEntry } from "@/app/(dashboard)/journal/_actions";
import Editor from "@/components/Editor";
import type { JournalEntry } from "@prisma/client";

export default function EntryEditor({ entry }: { entry: JournalEntry }) {
    return (
        <Editor
            entry={entry}
            onSave={async (content) => {
                await updateJournalEntry(entry.id, { content });
            }}
        />
    );
}
