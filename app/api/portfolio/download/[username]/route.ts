import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { generateCV } from '@/lib/cv-generator'

export const dynamic = 'force-dynamic'

export async function GET(
    req: NextRequest,
    { params }: { params: { username: string } }
) {
    try {
        const { username } = await params;
        await connectDB()

        const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const pdfStream = await generateCV(user);

        // Convert stream to Buffer
        const chunks = [];
        for await (const chunk of pdfStream) {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
        }
        const pdfBuffer = Buffer.concat(chunks);

        // Exact filename requested by user
        const filename = `cv.${username.toLowerCase()}.pdf`;

        // Return direct response with strong download headers
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': pdfBuffer.length.toString(),
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error) {
        console.error("CV Generation Error:", error);
        return NextResponse.json({ error: 'CV Generation failed' }, { status: 500 });
    }
}
