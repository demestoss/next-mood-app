import db from "@/db/db";
import { qa } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    let { question } = await request.json()
    question = question.trim()
    if (!question) {
        return new NextResponse("Cannot be empty", {
            status: 400,
        })
    }
    
    const user = await getUserByClerkId();
	const entries = await db.journalEntry.findMany({
		where: {
			userId: user.id,
		},
		select: {
			id: true,
			content: true,
			createdAt: true,
		},
	});

	const answer = await qa(question, entries);

    return new NextResponse(answer, {
        headers: {
            "Content-Type": "text/plain",
            "Transfer-Encoding": "chunked",
        },
    })
  }