import { NextResponse } from "next/server";
import { VerificationService } from "@/lib/employer-portal";
import { getAuthDetailsFromRequest } from "@/lib/auth";

export async function GET(request) {
    try {
        const authDetails = await getAuthDetailsFromRequest(request);
        if (!authDetails || !authDetails.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const history = await VerificationService.getVerificationHistory(authDetails.userId);
        return NextResponse.json(history, { status: 200 });

    } catch (error) {
        console.error("API Verification History Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
