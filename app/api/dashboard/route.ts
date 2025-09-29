import { NextResponse } from "next/server";
import { DashboardService } from "@/lib/institution-portal";

// A mock function to get the current user's instituteId
// In a real app, this would come from an authentication session.
const getInstituteIdFromRequest = async (): Promise<string> => {
    // Replace this with your actual session management logic
    // For now, returning a placeholder. You must have an institute in your DB.
    // e.g., return 'clx...';
    return "6aad35db-5ed1-41d8-8c5f-bc8434ac3d48";
};

export async function GET(request: Request) {
    console.log("Full URL:", request.url)
// console.log("Action param:", action)
    try {
        const instituteId = await getInstituteIdFromRequest();
        if (!instituteId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

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
