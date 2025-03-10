import db from "@/db/db";
import { qa } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { unstable_cache } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
	let { question } = await request.json();
	question = question.trim();
	if (!question) {
		return new NextResponse("Cannot be empty", {
			status: 400,
		});
	}

	const user = await getUserByClerkId();
	const entries = await getCachedEntries(user.id);

	const answer = await qa(question, entries);

	return new NextResponse(answer, {
		headers: {
			"Content-Type": "text/plain",
			"Transfer-Encoding": "chunked",
		},
	});
};

async function getEntries(userId: string) {
	const entries = await db.journalEntry.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			content: true,
			createdAt: true,
		},
	});
	return entries ?? [];
}

const getCachedEntries = unstable_cache(getEntries, [], {
	tags: ["journal:entries"],
	revalidate: 3600 * 24 * 7,
});
