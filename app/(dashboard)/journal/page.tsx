import EntriesList from "./_components/EntriesList";
import EntryCardLoading from "./_components/EntryCardLoading";
import NewEntryCard from "./_components/NewJournalEntryCard";
import { Suspense } from "react";

export default function JournalPage() {
	return (
		<div className="p-10">
			<h2 className="text-3xl mb-8">Journal</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
				<NewEntryCard />
				<Suspense
					fallback={
						<>
							<EntryCardLoading />
							<EntryCardLoading />
							<EntryCardLoading />
						</>
					}
				>
					<EntriesList />
				</Suspense>
			</div>
		</div>
	);
}
