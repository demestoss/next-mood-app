import db from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function createNewUser() {
    const user = await currentUser();
    if (!user) {
        return;
    }
    const match = await db.user.findUnique({
        where: {
            clerkId: user.id,
        },
    });

    if (!match) {
        await db.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
            },
        });
    }
    redirect("/journal");
}

export default async function NewUserPage() {
    await createNewUser();
    return null;
}
