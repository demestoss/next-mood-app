import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ["query"],
        });
    }
    db = global.prisma;
}

export default db;
