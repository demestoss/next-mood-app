import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUserByClerkId = cache(async () => {
	const { userId } = await auth();
	if (!userId) {
		redirect("/sign-in");
	}
	const user = await db.user.findUnique({
		where: {
			clerkId: userId,
		},
	});
	if (!user) {
		redirect("/sign-in");
	}
	return user;
});
