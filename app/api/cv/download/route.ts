import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { generateCV } from '@/lib/cv-generator'

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if (!email) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        await connectDB()

        // Fetch full profile
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Generate PDF stream/buffer
        // Note: generateCV (from react-pdf) returns a Node Stream. 
        // We need to convert it to a Buffer or pass it as a Web Stream to NextResponse.
        // React-pdf renderToStream returns a NodeJS.ReadableStream.
        // We can convert to buffer for simplicity.
        const pdfStream = await generateCV(user);

        const chunks = [];
        for await (const chunk of pdfStream) {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
        }
        const pdfBuffer = Buffer.concat(chunks);

        const filename = `${user.fullName.replace(/\s+/g, '-').toLowerCase()}-cv.pdf`;

        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                // 'Content-Length': pdfBuffer.length.toString() // Optional but good practice
            }
        })
    } catch (error) {
        console.error("CV Generation Error:", error);
        return NextResponse.json({ error: 'CV Generation failed' }, { status: 500 })
    }
}
