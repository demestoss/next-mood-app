import NewEntryCard from "./_components/NewEntryCard";

export default function JournalListLayout({
	children,
}: React.PropsWithChildren) {
	return (
		<div className="p-10">
			<h2 className="text-3xl mb-8">Journal</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
				<NewEntryCard />
				{children}
			</div>
		</div>
	);
}
