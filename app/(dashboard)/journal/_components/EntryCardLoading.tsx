import { Card, CardBody, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/react";

export default function EntryCardLoading() {
	return (
		<Card className="h-[169px]">
			<CardBody className="flex flex-col gap-2 p-2">
				<div className="flex flex-col gap-5 p-2">
					<Skeleton className="rounded-lg w-32">
						<div className="h-4 rounded-lg bg-default-300" />
					</Skeleton>

					<Skeleton className="rounded-lg">
						<div className="h-4 rounded-lg bg-default-300" />
					</Skeleton>
				</div>

				<div className="flex flex-col gap-4 p-2 pt-4 border-t border-default-100">
					<Skeleton className="rounded-lg">
						<div className="h-4 rounded-lg bg-default-300" />
					</Skeleton>
					<Skeleton className="rounded-lg">
						<div className="h-4 rounded-lg bg-default-300" />
					</Skeleton>
				</div>
			</CardBody>
		</Card>
	);
}
