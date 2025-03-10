export type EntryParams = Promise<{ id: string }>;

export default function EntryLayout({
    editor,
    sidebar,
}: {
    editor: React.ReactNode;
    sidebar: React.ReactNode;
}) {
    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2">{editor}</div>
            <div className="col-span-1">{sidebar}</div>
        </div>
    );
}
