import { NextResponse } from "next/server";
import { EmployerDashboardService } from "@/lib/employer-portal";
import { getAuthDetailsFromRequest } from "@/lib/auth";

export async function GET(request) {
    try {
        const authDetails = await getAuthDetailsFromRequest(request);
        if (!authDetails || !authDetails.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const stats = await EmployerDashboardService.getStats(authDetails.userId);
        return NextResponse.json(stats, { status: 200 });

    } catch (error) {
        console.error("API Employer Dashboard Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
