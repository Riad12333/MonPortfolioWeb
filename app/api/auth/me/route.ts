
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Return session data which we already enriched in lib/auth.ts
    // If strict fields are needed, we can fiter here.
    return NextResponse.json({
        id: (session.user as any).id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        subscriptionStatus: (session.user as any).subscriptionStatus,
        subscriptionPlan: (session.user as any).subscriptionPlan,
    });
}
