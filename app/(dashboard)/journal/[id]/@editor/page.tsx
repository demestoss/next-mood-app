import { getEntryById } from "../getEntryById";
import type { EntryParams } from "../layout";
import EntryEditor from "./EntryEditor";

export default async function EntryEditorPage({
	params,
}: { params: EntryParams }) {
	const entryId = (await params).id;
	const entry = await getEntryById(entryId);

	return <EntryEditor entry={entry} />;
}
