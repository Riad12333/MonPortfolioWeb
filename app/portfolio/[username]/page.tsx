
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PremiumTheme from "@/components/themes/premium-theme";
import BentoTheme from "@/components/themes/bento-theme";
import MinimalTheme from "@/components/themes/minimal-theme";
import ClassicTheme from "@/components/themes/classic-theme";

// Force no caching for fresh data on reload
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
    params: { username: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;
    await connectDB();
    const user = await User.findOne({ username }).select("fullName specialization about").lean();
    if (!user) return { title: "Portfolio Not Found" };

    return {
        title: `${user.fullName} - ${user.specialization || "Portfolio"}`,
        description: user.about || `Discover the portfolio of ${user.fullName}.`,
    };
}

export default async function PortfolioPage({ params }: Props) {
    const { username } = await params;

    try {
        await connectDB();
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw error;
    }

    let user;
    try {
        user = await User.findOne({ username }).lean();
    } catch (error) {
        console.error('User search failed:', error);
        throw error;
    }

    if (!user) return notFound();

    // Serialize MongoDB objects for Client Component
    const serializedUser = JSON.parse(JSON.stringify(user));

    const themeId = user.themeSettings?.themeId || 'theme-minimal';

    switch (themeId) {
        case 'theme-premium':
            return <PremiumTheme user={serializedUser} />;
        case 'theme-modern':
            return <BentoTheme user={serializedUser} />;
        case 'theme-classic':
            return <ClassicTheme user={serializedUser} />;
        case 'theme-minimal':
        default:
            return <MinimalTheme user={serializedUser} />;
    }
}
