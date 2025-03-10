import type { JournalEntryWithAnalysis } from "@/domain";
import { formatFullDate } from "@/utils/date";

export default function EntrySidebar({
    entry: { analysis, createdAt },
}: { entry: JournalEntryWithAnalysis }) {
    const analysisData = [
        {
            name: "Summary",
            value: analysis?.summary,
        },
        {
            name: "Subject",
            value: analysis?.subject,
        },
        {
            name: "Mood",
            value: analysis?.mood,
        },
        {
            name: "Negative",
            value: analysis?.negative ? "True" : "False",
        },
    ];

    return (
        <div>
            <div className="px-2 py-3 border-b-1 border-b-default-200">
                <h2 className="text-xl">{formatFullDate(createdAt)}</h2>
            </div>
            <div
                className="px-6 py-10 border-b-1 border-b-default-200"
                style={{ background: analysis?.color }}
            >
                <h2 className="text-2xl">Analysis</h2>
            </div>
            <ul>
                {analysisData.map((item) => (
                    <li
                        key={item.name}
                        className="flex items-center gap-4 justify-between px-2 py-4 border-b border-default-200"
                    >
                        <span className="text-large font-semibold">
                            {item.name}
                        </span>
                        <span>{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
