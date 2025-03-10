import db from "@/db/db";
import { getUserByClerkId } from "@/utils/auth";

const getData = async () => {
    const user = await getUserByClerkId();
    const analyses = await db.analysis.findMany({
        where: {
            
        }
    })
}

export default function HistoryPage() {}