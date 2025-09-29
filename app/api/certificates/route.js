import { NextResponse } from "next/server";
import { CertificateService, BatchUploadService } from "@/lib/institution-portal";
import { getAuthDetailsFromRequest } from "@/lib/auth";

// API handler for single certificate issuance
export async function POST(request) {
    try {
        const authDetails = await getAuthDetailsFromRequest(request);
        if (!authDetails || !authDetails.instituteId || !authDetails.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }



        const { instituteId, userId } = authDetails;
        const certificateData = await request.json();
        console.log({ certificateData })
        const newCertificate = await CertificateService.issueSingleCertificate(instituteId, userId, certificateData);

        return NextResponse.json(newCertificate, { status: 201 });
    } catch (error) {
        console.error("API Single Issue Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}


// API handler for batch uploads (handles multipart/form-data)
export async function PUT(request) {
    try {
        const authDetails = await getAuthDetailsFromRequest(request);
        // if (!authDetails || !authDetails.instituteId || !authDetails.userId) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const { instituteId, userId } = authDetails;

        const formData = await request.formData();
        const files = [];

        for (const [name, file] of formData.entries()) {
            if (file instanceof File) {
                const buffer = Buffer.from(await file.arrayBuffer());
                files.push({ buffer, name: file.name, type: file.type });
            }
        }

        if (files.length === 0) {
            return NextResponse.json({ error: 'No files uploaded.' }, { status: 400 });
        }

        const results = [];
        const result = await BatchUploadService.processBatchUpload(instituteId, userId, files);
        // for (const file of files) {
        //     results.push(result);
        //     console.log({ result })
        // }
        console.log({ result })
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error("API Batch Upload Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

