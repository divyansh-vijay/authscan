import { NextResponse } from "next/server";
import { VerificationService } from "@/lib/employer-portal";
import { getAuthDetailsFromRequest } from "@/lib/auth";

export async function POST(request) {
    try {
        const authDetails = await getAuthDetailsFromRequest(request);
        if (!authDetails || !authDetails.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const certificateId = formData.get('certificateId');
        const file = formData.get('file');

        const verifierData = {
            userId: authDetails.userId,
            verifierName: `${authDetails.user.firstName} ${authDetails.user.lastName}`,
            verifierEmail: authDetails.user.email,
            verifierType: 'EMPLOYER', // Assuming the user is an employer
        };

        let result;

        if (certificateId) {
            result = await VerificationService.verifyByCertificateId(certificateId, verifierData);
        } else if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            result = await VerificationService.verifyByDocument(buffer, verifierData);
        } else {
            return NextResponse.json({ error: "Certificate ID or file is required." }, { status: 400 });
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error("API Verification Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
