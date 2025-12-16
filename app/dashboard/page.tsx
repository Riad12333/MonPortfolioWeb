'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Rocket, CheckCircle, Loader2, Globe, ArrowRight,
    Layout, BarChart3, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
    // State for the new SaaS flow
    const [subdomain, setSubdomain] = useState('');
    const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'published' | 'error'>('idle');
    const [portfolioUrl, setPortfolioUrl] = useState('');

    // On mount, maybe fetch current subdomain if already published
    // ...

    const handlePublish = async () => {
        setPublishStatus('publishing');

        // Simulating the backend call that assigns the subdomain
        setTimeout(() => {
            // In a real app, we check if subdomain is available via API
            // For now, we assume success using the input or default username
            const finalSubdomain = subdomain || "madjid"; // Default for demo

            // FREE VERSION (Path-based)
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            const finalUrl = `${origin}/portfolio/${finalSubdomain}`;

            setPortfolioUrl(finalUrl);
            setPublishStatus('published');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <Navbar />

            <main className="container mx-auto px-4 pt-28 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-slate-400">Manage your portfolio presence.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="text-slate-300 border-slate-700 hover:bg-slate-800">
                            <Settings className="w-4 h-4 mr-2" /> Settings
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
                    {/* LEFT COLUMN: PUBLISH CARD */}
                    <div className="space-y-6">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-emerald-500" />
                                    Your Public Portfolio
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Your portfolio is instantly accessible via your unique link.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="subdomain" className="text-slate-300">Choose your username</Label>
                                    <div className="flex gap-2 items-center">
                                        <div className="text-slate-500 text-sm hidden md:block">
                                            mon-portfolio.vercel.app/portfolio/
                                        </div>
                                        <div className="relative flex-1">
                                            <Input
                                                id="subdomain"
                                                value={subdomain}
                                                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                                placeholder="username"
                                                className="bg-slate-950 border-slate-800 text-white pl-4"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500">Only letters, numbers, and hyphens.</p>
                                </div>

                                {publishStatus === 'idle' && (
                                    <Button onClick={handlePublish} size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
                                        <Rocket className="w-4 h-4 mr-2" /> Publish Now
                                    </Button>
                                )}

                                {publishStatus === 'publishing' && (
                                    <Button disabled size="lg" className="w-full bg-emerald-600/50 text-white cursor-wait">
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publishing...
                                    </Button>
                                )}

                                {publishStatus === 'published' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 flex flex-col items-center text-center"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                                            <CheckCircle className="w-6 h-6 text-emerald-500" />
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-2">You are Live!</h3>
                                        <p className="text-slate-400 text-sm mb-6">Your portfolio is active at:</p>

                                        <div className="bg-black/30 px-4 py-2 rounded-md mb-6 border border-white/10 text-emerald-400 font-mono text-sm break-all">
                                            {portfolioUrl}
                                        </div>

                                        <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                                            <Globe className="w-4 h-4" /> Visit Website
                                            <ArrowRight className="w-4 h-4 opacity-70" />
                                        </a>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: STATS */}
                    <div className="space-y-6">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white text-base">Usage</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-400">Portfolios</span>
                                            <span className="text-white">1 / 1</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-full bg-emerald-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-400">Storage</span>
                                            <span className="text-white">45%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[45%] bg-violet-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white text-base">Analytics</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center py-6 text-slate-500 space-y-2">
                                <BarChart3 className="w-10 h-10 opacity-50" />
                                <p className="text-sm">No data available yet.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
