import db from "@/db/db";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { unstable_cache } from "next/cache";
import EntryCard from "./_components/EntryCard";
import NewEntryCard from "./_components/NewJournalEntryCard";

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
		revalidate: 3600 * 24,
	},
);

export default async function JournalPage() {
	const user = await getUserByClerkId();
	const entries = await getEntries(user.id);

	// await analyze(
	// 	"create a text color that will be working good with tailwind blue-300",
	// );

	return (
		<div className="p-10">
			<h2 className="text-3xl mb-8">Journal</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(0,320px))] gap-4">
				<NewEntryCard />
				{entries.map((entry) => (
					<EntryCard key={entry.id} entry={entry} />
				))}
			</div>
		</div>
	);
}
