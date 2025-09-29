import { NextResponse } from "next/server";
import { AnalyticsService } from "@/lib/institution-portal";

const getInstituteIdFromRequest = async (): Promise<string> => "9b2e91b2-7c0e-4ee8-9869-5ab64b2a6cac";

export async function GET() {
    try {
        const instituteId = await getInstituteIdFromRequest();
        if (!instituteId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const analyticsData = await AnalyticsService.getAnalyticsData(instituteId);
        return NextResponse.json(analyticsData);

    } catch (error) {
        console.error("API Analytics Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
