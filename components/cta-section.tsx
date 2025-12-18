"use client";

import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CTASection() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleCtaClick = () => {
        if (session) {
            router.push("/profile");
        } else {
            router.push("/signup");
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="relative rounded-[32px] overflow-hidden p-[1px] bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-violet-500/30">
                    <div className="bg-slate-950/80 backdrop-blur-xl rounded-[31px] px-8 py-20 text-center relative overflow-hidden">

                        {/* Inner Gradient Mesh */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-transparent to-fuchsia-900/20 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Showcase Your Talent?
                            </h2>
                            <p className="text-lg text-slate-300 mb-10 max-w-2xl">
                                Join thousands of creators building their dream portfolios today
                            </p>

                            <button
                                onClick={handleCtaClick}
                                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full text-white font-bold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Create Your Portfolio
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
