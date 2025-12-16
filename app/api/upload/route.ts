import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // ignore if exists
        }

        const customName = data.get('customName') as string | null;

        // Generate filename
        let filename;
        if (customName) {
            const sanitizedCustomName = customName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
            // Append timestamp to ensure uniqueness even with custom name, or replace?
            // User wants specific name "cv.username.pdf". Let's try to honor it but maybe add short suffix if needed or keep it clean if user wants clean.
            // Let's just use the timestamp suffix technique to be safe against overwrites/caching issues
            const uniqueSuffix = Date.now();
            // If custom name ends with .pdf, insert suffix before it?
            if (sanitizedCustomName.toLowerCase().endsWith('.pdf')) {
                filename = sanitizedCustomName.replace(/\.pdf$/i, `_${uniqueSuffix}.pdf`);
            } else {
                filename = `${sanitizedCustomName}_${uniqueSuffix}`;
            }
        } else {
            // Sanitize filename to remove special chars
            const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            filename = `${uniqueSuffix}-${sanitizedOriginalName}`;
        }

        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer);

        // Return the public URL
        const url = `/uploads/${filename}`;

        // For specific file types, we might want to return extra info? No need for now.

        return NextResponse.json({ success: true, url });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
    }
}
