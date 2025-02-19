import { createNewJournalEntry } from "@/app/(dashboard)/journal/_actions";
import { Card, CardBody } from "@heroui/card";
import { Plus } from "lucide-react";

export default function NewEntryCard() {
	return (
		<Card isPressable isHoverable onPress={createNewJournalEntry}>
			<CardBody className="h-full flex flex-row gap-6 p-2 pl-6 items-center">
				<Plus size={32} />
				<div className="flex flex-col gap-1">
					<span>New Entry </span>
					<span>{new Date().toDateString()}</span>
				</div>
			</CardBody>
		</Card>
	);
}
