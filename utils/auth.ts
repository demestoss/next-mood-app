import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

const getDbUser = unstable_cache(
	async (userId: string) => {
		return db.user.findUnique({
			where: {
				clerkId: userId,
			},
		});
	},
	[],
	{
		tags: ["user"],
		revalidate: false,
	},
);

export const getUserByClerkId = cache(async () => {
	const { userId } = await auth();
	if (!userId) {
		redirect("/sign-in");
	}
	const user = await getDbUser(userId);
	if (!user) {
		redirect("/sign-in");
	}
	return user;
});
