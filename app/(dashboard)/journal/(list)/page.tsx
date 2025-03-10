import db from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import { unstable_cache } from "next/cache";
import EntryCard from "./_components/EntryCard";

async function getEntries(userId: string) {
    const entries = await db.journalEntry.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            analysis: true,
        },
    });
    return entries ?? [];
}

const getCachedEntries = unstable_cache(getEntries, [], {
    tags: ["journal:entries"],
    revalidate: 3600 * 24,
});

export default async function JournalListPage() {
    const user = await getUserByClerkId();
    const entries = await getCachedEntries(user.id);

    return (
        <>
            {entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
            ))}
        </>
    );
}
