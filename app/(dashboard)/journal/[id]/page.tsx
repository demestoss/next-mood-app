import EntrySidebar from "@/app/(dashboard)/journal/[id]/_components/EntrySidebar";
import db from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import EntryEditor from "./_components/EntryEditor";

async function getEntry(entryId: string, userId: string) {
	const entry = await db.journalEntry.findUnique({
		where: {
			userId_id: {
				userId,
				id: entryId,
			},
		},
		include: {
			analysis: true,
		},
	});

	if (!entry) {
		redirect("/journal");
	}
	return entry;
}

const getCachedEntry = unstable_cache(getEntry, [], {
	tags: ["journal:entry"],
	revalidate: 3600 * 24,
});

export default async function JournalEntryPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const entryId = (await params).id;
	const user = await getUserByClerkId();
	const entry = await getCachedEntry(entryId, user.id);

	return (
		<div className="w-full h-full grid grid-cols-3">
			<div className="col-span-2">
				<EntryEditor entry={entry} />
			</div>
			<div className="col-span-1">
				<EntrySidebar entry={entry} />
			</div>
		</div>
	);
}
