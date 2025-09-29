import { NextResponse } from "next/server";
import { DashboardService } from "@/lib/institution-portal";
import { getAuthDetailsFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const authDetails = await getAuthDetailsFromRequest(request);
        console.log({ authDetails })
        if (!authDetails) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { instituteId } = authDetails;

        const { searchParams } = new URL(request.url);
        const action = searchParams.get('action');
        console.log(action)

        switch (action) {
            case 'stats':
                const stats = await DashboardService.getStats(instituteId);
                return NextResponse.json(stats);
            case 'recent-certificates':
                const certificates = await DashboardService.getRecentCertificates(instituteId);
                return NextResponse.json(certificates);
            case 'verification-logs':
                const logs = await DashboardService.getVerificationLogs(instituteId);
                return NextResponse.json(logs);
            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
