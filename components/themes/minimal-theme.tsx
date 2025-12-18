'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Github, Linkedin, Twitter, Youtube, Facebook, Instagram,
    Download, ChevronRight, Globe, Mail, FileDown,
    QrCode, X
} from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';

interface ThemeProps {
    user: any;
}

export default function MinimalTheme({ user }: ThemeProps) {
    const [showQR, setShowQR] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        let url = window.location.href;
        if (url.includes('localhost')) {
            url = url.replace(/https?:\/\/localhost:\d+/, 'https://mon-portfolio-web.vercel.app');
        }
        setCurrentUrl(url);
    }, []);

    const dict = getDictionary(user.language || 'English');
    const theme = user.themeSettings?.bgcolor || 'bg-white';
    const isDark = !theme.includes('bg-white');

    const textColor = isDark ? 'text-slate-300' : 'text-slate-600';
    const titleColor = isDark ? 'text-white' : 'text-slate-900';
    const mutedColor = isDark ? 'text-slate-500' : 'text-slate-400';
    const cardBorder = isDark ? 'border-white/10' : 'border-slate-200';

    const handleDownloadCV = () => {
        const btn = document.querySelector('[data-cv-button]') as HTMLButtonElement;
        const span = btn?.querySelector('span');
        const originalText = span?.innerText;

        if (btn) btn.disabled = true;
        if (span) span.innerText = "Génération...";

        const downloadUrl = user.cvUrl || `/api/portfolio/download/${user.username}`;

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `cv.${user.username || 'user'}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            if (btn) btn.disabled = false;
            if (span && originalText) span.innerText = originalText;
        }, 3000);
    };

    return (
        <div className={`min-h-screen ${theme} ${textColor} font-serif selection:bg-black selection:text-white`}>
            {/* STICKY HEADER */}
            <header className={`fixed top-0 left-0 w-full z-50 border-b ${cardBorder} backdrop-blur-md bg-transparent px-6 py-4`}>
                <div className="max-w-3xl mx-auto flex justify-between items-center text-sm font-medium tracking-widest uppercase">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent italic font-black">
                        Portfolio
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowQR(true)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-900 dark:border-white ${titleColor} hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group`}
                        >
                            <QrCode className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">QR Code</span>
                        </button>

                        <button
                            onClick={handleDownloadCV}
                            data-cv-button
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 dark:bg-white dark:border-white text-white dark:text-black disabled:opacity-50 transition-all group`}
                        >
                            <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                                {dict.hero.resume}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* QR MODAL */}
            {showQR && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${isDark ? 'bg-black border-slate-800' : 'bg-white border-slate-200'} border p-8 rounded-sm max-w-sm w-full relative shadow-2xl`}
                    >
                        <button
                            onClick={() => setShowQR(false)}
                            className={`absolute top-4 right-4 p-1 ${isDark ? 'hover:bg-white/10 text-slate-500' : 'hover:bg-slate-50 text-slate-400'} transition-colors`}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="text-center">
                            <h3 className={`text-xl font-medium ${titleColor} mb-1 tracking-tight`}>Portfolio Access</h3>
                            <p className={`${mutedColor} text-[10px] mb-6 uppercase tracking-[0.2em] font-bold`}>Quick Scan</p>
                            <div className="bg-white p-6 rounded-sm inline-block mb-6 border border-slate-100 shadow-inner">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`}
                                    alt="QR Code"
                                    className="w-40 h-40 mix-blend-multiply"
                                />
                            </div>
                            <p className={`text-[10px] ${mutedColor} break-all font-mono opacity-50`}>{currentUrl}</p>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="max-w-3xl mx-auto px-6 py-32 md:py-48">

                {/* HERO */}
                <header className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-8"
                    >
                        <h1 className={`text-5xl md:text-7xl font-medium tracking-tight ${titleColor}`}>
                            {user.fullName}
                        </h1>
                        <p className="text-xl md:text-2xl leading-relaxed max-w-2xl">
                            {user.about || "Creative professional focusing on simple and effective solutions."}
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm font-medium uppercase tracking-widest pt-4">
                            {user.socials && Object.entries(user.socials).map(([p, url]) => (
                                <a key={p} href={url as string} className={`${titleColor} hover:opacity-50 transition-opacity`}>{p}</a>
                            ))}
                        </div>
                    </motion.div>
                </header>

                {/* CONTENT SECTIONS */}
                <div className="space-y-32">

                    {/* PROJECTS */}
                    {(user.projects?.length > 0) && (
                        <section>
                            <h2 className={`text-xs uppercase tracking-[0.3em] ${mutedColor} mb-12`}>{dict.sections.projects}</h2>
                            <div className="space-y-20">
                                {user.projects?.map((p: any, i: number) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-end mb-4">
                                            <h3 className={`text-2xl ${titleColor}`}>{p.title}</h3>
                                            {p.link && <a href={p.link} className="text-xs uppercase tracking-widest hover:underline italic">link</a>}
                                        </div>
                                        <p className="text-lg leading-relaxed">{p.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* EXPERIENCE */}
                    {(user.experience?.length > 0) && (
                        <section>
                            <h2 className={`text-xs uppercase tracking-[0.3em] ${mutedColor} mb-12`}>{dict.sections.experience}</h2>
                            <div className="space-y-12">
                                {user.experience?.map((exp: any, i: number) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className={`text-sm ${mutedColor}`}>{exp.duration}</div>
                                        <div className="md:col-span-3">
                                            <h3 className={`text-xl ${titleColor} mb-1`}>{exp.role}</h3>
                                            <div className="text-sm italic mb-4">{exp.company}</div>
                                            <p className="leading-relaxed">{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SKILLS */}
                    {(user.skills?.length > 0) && (
                        <section>
                            <h2 className={`text-xs uppercase tracking-[0.3em] ${mutedColor} mb-12`}>{dict.sections.skills}</h2>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                {user.skills.map((s: string, i: number) => (
                                    <span key={i} className={`text-xl ${titleColor}`}>{s}</span>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                <footer className="mt-40 pt-10 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40">
                    <div>{user.fullName}</div>
                    <div>© {new Date().getFullYear()}</div>
                </footer>

            </div>
        </div>
    );
}
