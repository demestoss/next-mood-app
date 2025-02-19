import JournalEntryCard from "@/app/(dashboard)/journal/_components/JournalEntryCard";
import NewEntryCard from "@/app/(dashboard)/journal/_components/NewJournalEntryCard";
import db from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import { unstable_cache } from "next/cache";

const getEntries = unstable_cache(
	async (userId: string) => {
		const entries = await db.journalEntry.findMany({
			where: {
				userId: userId,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return entries ?? [];
	},
	[],
	{
		tags: ["journal:entries"],
		revalidate: 3600,
	},
);

export default async function JournalPage() {
	const user = await getUserByClerkId();
	const entries = await getEntries(user.id);

	return (
		<div className="p-10">
			<h2 className="text-3xl mb-8">Journal</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(0,320px))] gap-4">
				<NewEntryCard />
				{entries.map((entry) => (
					<JournalEntryCard key={entry.id} entry={entry} />
				))}
			</div>
		</div>
	);
}
