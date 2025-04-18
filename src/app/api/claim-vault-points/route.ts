// 📁 /app/api/claim-vault-points/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if demoPointsAlreadyClaimed flag exists
        if ((user as any).demoPointsClaimed) {
            return NextResponse.json({ message: "Already claimed" }, { status: 200 });
        }

        // Add 50 Vault Points and set demoPointsClaimed to true
        await prisma.user.update({
            where: { id: user.id },
            data: {
                vaultPoints: { increment: 50 },
                demoPointsClaimed: true,
            },
        });

        return NextResponse.json({ message: "Vault Points added" });
    } catch (err) {
        console.error("Error claiming Vault Points:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
