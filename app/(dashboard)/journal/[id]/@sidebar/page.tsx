import { getEntryById } from "../getEntryById";
import type { EntryParams } from "../layout";
import EntrySidebar from "./EntrySidebar";

export default async function EntrySidebarPage({
    params,
}: { params: EntryParams }) {
    const entryId = (await params).id;
    const entry = await getEntryById(entryId);

    return <EntrySidebar entry={entry} />;
}
