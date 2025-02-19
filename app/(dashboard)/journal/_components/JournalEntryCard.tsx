import { Card, CardBody, CardHeader } from "@heroui/card";
import type { JournalEntry } from "@prisma/client";
import Link from "next/link";

export default function JournalEntryCard({ entry }: { entry: JournalEntry }) {
	const createdAt = new Date(entry.createdAt);

	return (
		<Link href={`/journal/${entry.id}`}>
			<Card className="p-2">
				<CardHeader className="p-2">
					{createdAt.toDateString()}, {createdAt.toLocaleTimeString()}
				</CardHeader>
				<CardBody className="flex flex-col gap-2 p-2">
					<div className="line-clamp-1 pb-2">{entry.content}</div>
					<div className="border-t border-default-100 pt-2">summary</div>
					<div>mood</div>
				</CardBody>
			</Card>
		</Link>
	);
}
