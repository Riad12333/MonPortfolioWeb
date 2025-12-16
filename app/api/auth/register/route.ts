
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password || !name) {
            console.error('[API Register] Missing fields:', { email, nameExists: !!name, passwordExists: !!password });
            return NextResponse.json({ error: 'Tous les champs sont requis (Nom, Email, Mot de passe)' }, { status: 400 });
        }

        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('[API Register] User already exists:', email);
            return NextResponse.json({ error: 'Cet email est déjà utilisé.' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Calculate trial end date (7 days from now)
        const trialDefaults = {
            trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            subscriptionStatus: 'trial',
            subscriptionPlan: null,
            themeSettings: { bgcolor: 'bg-slate-950', themeId: 'theme-minimal' }
        };

        const newUser = await User.create({
            name,
            email,
            passwordHash: hashedPassword,
            authProvider: 'email',
            ...trialDefaults
        });

        // We don't verify email in this simplified flow, but in prod you should.

        return NextResponse.json({ message: 'User created successfully', userId: newUser._id }, { status: 201 });

    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
