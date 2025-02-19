import JournalEntryEditor from "@/app/(dashboard)/journal/_components/JournalEntryEditor";
import db from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

const getEntry = unstable_cache(
	async (entryId: string, userId: string) => {
		const entry = await db.journalEntry.findUnique({
			where: {
				userId,
				id: entryId,
			},
		});

		if (!entry) {
			redirect("/journal");
		}

		return entry;
	},
	[],
	{
		tags: ["journal:entry"],
		revalidate: 3600 * 24,
	},
);

export default async function JournalEntryPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const entryId = (await params).id;
	const user = await getUserByClerkId();
	const entry = await getEntry(entryId, user.id);

	return (
		<div className="w-full h-full">
			<JournalEntryEditor entry={entry} />
		</div>
	);
}
