
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if (!email) {
            // For dev/trial without auth working perfectly yet, we might want to allow it, 
            // BUT for security we should gate it. 
            // Reverting to strict auth check since user wants "Fix"
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const body = await req.json();

        await connectDB();

        // Upsert user: find by email and update, or create if new
        const user = await User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    email: email, // ensure email is set on create
                    fullName: body.fullName,
                    username: body.username,
                    language: body.language,
                    country: body.country,
                    phone: body.phone,
                    specialization: body.specialization,
                    about: body.about,
                    skills: body.skills,
                    services: body.services,
                    education: body.education,
                    experience: body.experience,
                    projects: body.projects,
                    certificates: body.certificates,
                    spokenLanguages: body.spokenLanguages,
                    socials: body.socials,
                    image: body.image || session?.user?.image,
                    cvUrl: body.cvUrl,
                    sectionOrder: body.sectionOrder,
                    themeSettings: body.themeSettings,
                    updatedAt: new Date(),
                },
                $setOnInsert: {
                    status: 'trial',
                    createdAt: new Date()
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, user });

    } catch (error: any) {
        console.error("Profile Save Error (Mongo):", error);
        return NextResponse.json({ error: error.message || 'Failed to save profile' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        await connectDB();
        const user = await User.findOne({ email: email });

        return NextResponse.json(user || {});
    } catch (error) {
        console.error("Profile Load Error:", error);
        return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 });
    }
}
