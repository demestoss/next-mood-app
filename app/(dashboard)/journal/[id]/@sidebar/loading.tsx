import { Skeleton } from "@heroui/react";

export default function EntrySidebarLoading() {
    return (
        <div>
            <div className="px-2 py-3 border-b-1 border-b-default-200">
                <Skeleton className="rounded-lg">
                    <div className="h-4 rounded-lg bg-default-300" />
                </Skeleton>
            </div>
            <div className="px-2 py-3 border-b-1 border-b-default-200">
                <Skeleton className="rounded-lg">
                    <div className="px-6 py-14 rounded-lg bg-default-300" />
                </Skeleton>
            </div>
            <div className="px-2 py-3 border-b-1 border-b-default-200">
                <Skeleton className="rounded-lg">
                    <div className="px-6 py-6 rounded-lg bg-default-300" />
                </Skeleton>
            </div>
            <div className="px-2 py-3 border-b-1 border-b-default-200">
                <Skeleton className="rounded-lg">
                    <div className="px-6 py-6 rounded-lg bg-default-300" />
                </Skeleton>
            </div>
            <div className="px-2 py-3 border-b-1 border-b-default-200">
                <Skeleton className="rounded-lg">
                    <div className="px-6 py-4 rounded-lg bg-default-300" />
                </Skeleton>
            </div>
            <div className="px-2 py-3 border-b-1 border-b-default-200">
                <Skeleton className="rounded-lg">
                    <div className="px-6 py-4 rounded-lg bg-default-300" />
                </Skeleton>
            </div>
        </div>
    );
}
