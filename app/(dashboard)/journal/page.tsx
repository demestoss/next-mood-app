import db from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import { unstable_cache } from "next/cache";
import EntryCard from "./_components/EntryCard";
import NewEntryCard from "./_components/NewJournalEntryCard";

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

export default async function JournalPage() {
	const user = await getUserByClerkId();
	const entries = await getCachedEntries(user.id);

	return (
		<div className="p-10">
			<h2 className="text-3xl mb-8">Journal</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
				<NewEntryCard />
				{entries.map((entry) => (
					<EntryCard key={entry.id} entry={entry} />
				))}
			</div>
		</div>
	);
}
