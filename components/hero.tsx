'use client';

import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Globe } from 'lucide-react'; 3

export default function Hero() {
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
                        <Button variant="gradient" size="lg" className="rounded-full">
                            Start Building
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full">
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

                        {/* Mockup Content (The Portfolio) */}
                        <div className="flex-1 p-8 overflow-hidden relative">
                            {/* Background Glow inside mockup */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                            <div className="grid md:grid-cols-[1.2fr_1.8fr] gap-8 h-full">
                                {/* Left Column: Profile */}
                                <div className="flex flex-col gap-6">
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 p-[2px]">
                                        <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-3xl font-bold text-slate-200">
                                            MO
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">OULDGOUGAM Madjid</h3>
                                        <p className="text-blue-400 font-medium mb-4">Full Stack Developer | Blockchain | IoT</p>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                            Student at USTHB. Passionate about web development, distributed systems, and innovative technologies.
                                        </p>

                                        <div className="flex gap-3">
                                            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50 transition-colors cursor-pointer">
                                                <Github className="w-5 h-5" />
                                            </div>
                                            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50 transition-colors cursor-pointer">
                                                <Linkedin className="w-5 h-5" />
                                            </div>
                                            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50 transition-colors cursor-pointer">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Stats/Projects */}
                                <div className="flex flex-col gap-4">
                                    {/* Stat Cards */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                            <Code2 className="w-5 h-5 text-blue-400 mb-2" />
                                            <div className="text-2xl font-bold text-white">42+</div>
                                            <div className="text-xs text-slate-500">Deployed Projects</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                            <Database className="w-5 h-5 text-violet-400 mb-2" />
                                            <div className="text-2xl font-bold text-white">100%</div>
                                            <div className="text-xs text-slate-500">Server Uptime</div>
                                        </div>
                                    </div>

                                    {/* Project Card */}
                                    <div className="flex-1 rounded-xl bg-slate-900/50 border border-slate-800 p-5 mt-2 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-50">
                                            <Globe className="w-12 h-12 text-slate-800" />
                                        </div>
                                        <h4 className="text-white font-semibold mb-2">Latest Project</h4>
                                        <p className="text-xs text-slate-400 mb-4">SaaS platform for portfolio generation.</p>
                                        <div className="flex gap-2 mb-4">
                                            <span className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Next.js</span>
                                            <span className="text-[10px] px-2 py-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">Tailwind</span>
                                        </div>
                                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-violet-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
