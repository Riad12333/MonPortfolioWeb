
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Force no caching for fresh data on reload
export const dynamic = "force-dynamic";
export const revalidate = 0; // Revalidate on every request

interface Props {
    params: { username: string };
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    await connectDB();
    const user = await User.findOne({ username: params.username }).select("fullName specialization about").lean();

    if (!user) return { title: "Portfolio Not Found" };

    return {
        title: `${user.fullName} - ${user.specialization || "Portfolio"}`,
        description: user.about || `Discover the portfolio of ${user.fullName}.`,
    };
}

// The Portfolio Page Component
export default async function PortfolioPage({ params }: Props) {
    const { username } = params;

    console.log('[Portfolio] ========== START ==========');
    console.log('[Portfolio] Fetching portfolio for username:', username);
    console.log('[Portfolio] MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('[Portfolio] MONGODB_URI starts with:', process.env.MONGODB_URI?.substring(0, 20));

    // Connect to DB
    try {
        await connectDB();
        console.log('[Portfolio] ✅ MongoDB connected successfully');
    } catch (error) {
        console.error('[Portfolio] ❌ MongoDB connection failed:', error);
        throw error;
    }

    // Fetch User with all public fields
    let user;
    try {
        user = await User.findOne({ username }).lean();
        console.log('[Portfolio] User search completed');
        console.log('[Portfolio] User found:', user ? 'YES' : 'NO');
        if (user) {
            console.log('[Portfolio] User details:', {
                fullName: user.fullName,
                specialization: user.specialization,
                email: user.email
            });
        }
    } catch (error) {
        console.error('[Portfolio] ❌ User search failed:', error);
        throw error;
    }

    if (!user) {
        console.log('[Portfolio] User not found, returning 404');
        console.log('[Portfolio] ========== END (404) ==========');
        return notFound();
    }

    console.log('[Portfolio] ========== END (SUCCESS) ==========');

    // -- RENDER THE PORTFOLIO -- 
    // Ideally this would be a reusable component <PortfolioView data={user} />
    // For now, I'll implement a clean design directly here or we can extract it.
    // Assuming 'themeSettings' dictates the look.

    // Convert Mongoose document to plain JSON-serializable object if needed (lean() does most of it)
    // Date objects need to be strings for Client Components if we pass them down.

    // Helper to format dates if needed
    // ...

    return (
        <div className={`min-h-screen ${user.themeSettings?.bgcolor || 'bg-slate-950'} text-slate-200 font-sans selection:bg-emerald-500/30`}>
            {/* HER */}
            <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/10 border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        {user.fullName}
                    </div>
                    {user.cvUrl && (
                        <a href={user.cvUrl} target="_blank" className="px-6 py-2 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-sm font-medium">
                            Resume
                        </a>
                    )}
                </div>
            </header>

            <main className="container mx-auto px-6 pt-32 pb-20 max-w-5xl">

                {/* HERO SECTION */}
                <section className="flex flex-col md:flex-row items-center gap-12 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            {user.specialization || "Creative Professional"}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl">
                            {user.about || "Welcome to my portfolio. I create amazing digital experiences."}
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {user.socials && Object.entries(user.socials).map(([platform, url]) => {
                                if (!url) return null;
                                return (
                                    <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer" className="capitalize text-slate-400 hover:text-emerald-400 transition-colors">
                                        {platform}
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-slate-800 p-2 relative shrink-0">
                        {user.image ? (
                            <img src={user.image} alt={user.fullName} className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-slate-700 font-bold text-6xl">
                                {user.fullName?.[0] || "U"}
                            </div>
                        )}
                    </div>
                </section>

                {/* SKILLS */}
                {user.skills && user.skills.length > 0 && (
                    <section className="mb-24">
                        <h2 className="text-3xl font-bold text-white mb-10 pb-4 border-b border-slate-800">Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {user.skills.map((skill: string, i: number) => (
                                <span key={i} className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* SERVICES */}
                {user.services && user.services.length > 0 && (
                    <section className="mb-24">
                        <h2 className="text-3xl font-bold text-white mb-10 pb-4 border-b border-slate-800">Services</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.services.map((service: any, i: number) => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-900 transition-all group">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{service.title}</h3>
                                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                                    {service.price && <div className="text-emerald-500 font-mono text-sm">{service.price}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* PROJECTS */}
                {user.projects && user.projects.length > 0 && (
                    <section className="mb-24">
                        <h2 className="text-3xl font-bold text-white mb-10 pb-4 border-b border-slate-800">Projects</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {user.projects.map((proj: any, i: number) => (
                                <div key={i} className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{proj.title}</h3>
                                        <p className="text-slate-400 mb-6">{proj.description}</p>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium">
                                                View Project &rarr;
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CONTACT */}
                <section className="text-center py-20 border-t border-slate-900">
                    <h2 className="text-3xl font-bold text-white mb-6">Let's Work Together</h2>
                    <p className="text-slate-400 mb-8">Have a project in mind? Reach out to me.</p>
                    <a href={`mailto:${user.email}`} className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                        Contact Me
                    </a>
                </section>

                {/* BRANDING FOOTER */}
                <footer className="text-center py-8 text-xs text-slate-700">
                    Portfolio generated with <span className="font-bold text-slate-600">MonPortfolioWeb</span>
                </footer>

            </main>
        </div>
    );
}
