"use client";
import { Textarea } from "@heroui/input";
import { Spinner } from "@heroui/react";
import type { JournalEntry } from "@prisma/client";
import { useState, useTransition } from "react";
import { useAutoSave } from "./useAutoSave";

export default function Editor({
	entry,
	onSave,
}: {
	entry: JournalEntry;
	onSave: (content: string) => Promise<void>;
}) {
	const [value, setValue] = useState(entry.content);
	const [enabled, setEnabled] = useState(false);
	const [isPending, startTransition] = useTransition();

	useAutoSave({
		data: value,
		onSave: async (content) => {
			startTransition(async () => {
				await onSave(content);
			});
		},
		interval: 2000,
		enabled,
	});

	return (
		<div className="w-full h-full relative">
			{isPending && (
				<div className="absolute top-2 right-2 z-10">
					<Spinner color={"success"} size={"sm"} />
				</div>
			)}
			<Textarea
				className="w-full h-full"
				classNames={{
					inputWrapper: "grow border-none",
					innerWrapper: "h-full",
					input: "grow h-full",
				}}
				variant={"faded"}
				radius={"none"}
				disableAutosize
				maxRows={256}
				size={"lg"}
				height={"100%"}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
					setEnabled(true);
				}}
				onPaste={() => {
					setEnabled(true);
				}}
			/>
		</div>
	);
}
