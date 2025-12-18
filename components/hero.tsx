'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Globe } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Hero() {
    const { data: session } = useSession();
    const router = useRouter();
    const [currentImg, setCurrentImg] = useState(0);
    const heroImages = ['/hero-1.png', '/hero-2.png', '/hero-3.png'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % heroImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleStartBuilding = () => {
        if (session) {
            router.push('/profile');
        } else {
            router.push('/signup');
        }
    };

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50 block" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none -z-10 opacity-30" />

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        New version v2.0 available
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        Your portfolio, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-600">
                            elevated.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                        No code, no hassle. Create a modern and clean portfolio in minutes.
                        Showcase your journey like never before.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="gradient"
                            size="lg"
                            className="rounded-full"
                            onClick={handleStartBuilding}
                        >
                            Start Building
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full"
                            onClick={() => window.open('/portfolio/riad12', '_blank')}
                        >
                            View Demo
                        </Button>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        7-day free trial · No credit card required
                    </p>
                </motion.div>

                {/* Visual / Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-30" />

                    {/* Window Frame */}
                    <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                        {/* Window Header */}
                        <div className="h-10 bg-slate-900/50 border-b border-slate-800 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                            </div>
                            <div className="ml-4 px-3 py-1 bg-slate-800/50 rounded-md text-xs text-slate-500 font-mono flex items-center gap-2">
                                <ExternalLink className="w-3 h-3" />
                                madjid.monportfolioweb.com
                            </div>
                        </div>

                        {/* Mockup Content (The Portfolio Slideshow) */}
                        <div className="flex-1 overflow-hidden relative bg-slate-900 flex items-start justify-center">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImg}
                                    src={heroImages[currentImg]}
                                    alt="Portfolio Theme"
                                    initial={{ opacity: 0, y: 20, scale: 1.05 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="w-full h-full object-cover object-top"
                                />
                            </AnimatePresence>

                            {/* Overlay markers */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {heroImages.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImg ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
