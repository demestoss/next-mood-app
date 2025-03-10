import { formatFullDate } from "@/utils/date";
import { Card, CardBody } from "@heroui/card";
import { Plus } from "lucide-react";
import { createNewJournalEntry } from "../../_actions";

export default function NewEntryCard() {
	return (
		<Card isPressable isHoverable onPress={createNewJournalEntry} className="max-w-[500px] min-h-[180px]">
			<CardBody className="h-full flex flex-row gap-6 p-2 pl-6 items-center">
				<Plus size={32} />
				<div className="flex flex-col gap-1">
					<span className="text-xl">New Entry </span>
					<span>{formatFullDate(new Date())}</span>
				</div>
			</CardBody>
		</Card>
	);
}
