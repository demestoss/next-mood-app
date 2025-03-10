import type { JournalEntryWithAnalysis } from "@/domain";
import { formatFullDate } from "@/utils/date";
import { Card, CardBody, CardHeader } from "@heroui/card";
import Link from "next/link";

export default function EntryCard({
    entry,
}: { entry: JournalEntryWithAnalysis }) {
    const analysisData = [
        {
            name: "subject",
            value: entry.analysis?.subject,
        },
        {
            name: "mood",
            value: entry.analysis?.mood,
        },
    ];

    return (
        <Link href={`/journal/${entry.id}`}>
            <Card className="p-2 max-w-[500px]">
                <CardHeader className="p-2">
                    {formatFullDate(entry.createdAt)}
                </CardHeader>
                <CardBody className="flex flex-col gap-2 p-2">
                    <div className="line-clamp-1">
                        {entry.analysis?.summary ?? entry.content}
                    </div>
                    <div className="flex flex-col gap-2 border-t border-default-100 pt-2">
                        {analysisData.map(({ name, value }) => (
                            <div key={name} className="flex justify-between">
                                <div>{name}</div>
                                <div>{value}</div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
}
