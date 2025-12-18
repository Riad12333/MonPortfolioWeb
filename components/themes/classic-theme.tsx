'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Download, Mail, Phone, MapPin,
    Linkedin, Github, Twitter, Globe, FileDown,
    QrCode, X
} from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';

interface ThemeProps {
    user: any;
}

export default function ClassicTheme({ user }: ThemeProps) {
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
    const theme = user.themeSettings?.bgcolor || 'bg-slate-50';
    const isDark = !theme.includes('bg-white') && !theme.includes('bg-slate-50');

    const textColor = isDark ? 'text-slate-300' : 'text-slate-700';
    const titleColor = isDark ? 'text-white' : 'text-slate-900';
    const mutedColor = isDark ? 'text-slate-500' : 'text-slate-400';
    const sectionBorder = isDark ? 'border-slate-800' : 'border-slate-200';

    const handleDownloadCV = () => {
        const btn = document.querySelector('[data-cv-button]') as HTMLButtonElement;
        const span = btn?.querySelector('span');
        const originalText = span?.innerText;

        if (btn) btn.disabled = true;
        if (span) span.innerText = "Génération...";

        const downloadUrl = user.cvUrl || `/api/portfolio/download/${user.username}`;

        // This is the most native way to trigger a download and respect server-side filename headers
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `cv.${user.username || 'user'}.pdf`;
        link.target = '_blank'; // Opening in new tab often helps trigger the "Save As" prompt
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset button state after a few seconds
        setTimeout(() => {
            if (btn) btn.disabled = false;
            if (span && originalText) span.innerText = originalText;
        }, 3000);
    };

    return (
        <div className={`min-h-screen ${theme} ${textColor} font-sans selection:bg-blue-500/30`}>
            {/* STICKY HEADER */}
            <header className={`fixed top-0 left-0 w-full z-50 border-b ${sectionBorder} backdrop-blur-md bg-transparent px-4 md:px-8 py-4`}>
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="text-xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tighter">
                        Portfolio
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowQR(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 transition-all group shadow-xl"
                        >
                            <QrCode className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">QR Code</span>
                        </button>

                        <button
                            onClick={handleDownloadCV}
                            data-cv-button
                            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-slate-900 border border-emerald-500 text-white hover:bg-slate-800 disabled:opacity-50 transition-all group shadow-xl"
                        >
                            <FileDown className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">
                                {dict.hero.resume}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* QR MODAL */}
            {showQR && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-sans">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white border-4 border-slate-900 p-8 rounded-sm max-w-sm w-full relative shadow-[20px_20px_0px_0px_rgba(15,23,42,1)]"
                    >
                        <button
                            onClick={() => setShowQR(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-900"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="text-center">
                            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter italic">Personal vCard</h3>
                            <p className="text-slate-500 text-[10px] mb-6 uppercase tracking-[0.4em] font-bold">Digital Contact</p>
                            <div className="bg-white p-4 border-2 border-slate-900 inline-block mb-6 shadow-xl">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`}
                                    alt="QR Code"
                                    className="w-48 h-48 mix-blend-multiply"
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 break-all font-mono italic">{currentUrl}</p>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 shadow-2xl rounded-sm overflow-hidden border border-slate-200 dark:border-slate-800">

                    {/* TOP HEADER */}
                    <div className="bg-slate-900 text-white p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-5xl font-black uppercase tracking-tighter mb-4"
                        >
                            {user.fullName}
                        </motion.h1>
                        <p className="text-blue-400 font-bold tracking-[0.3em] uppercase text-sm mb-8">
                            {user.specialization || "Professional"}
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold opacity-70">
                            {user.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {user.email}</div>}
                            {user.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {user.phone}</div>}
                            {user.country && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {user.country}</div>}
                        </div>
                    </div>

                    <div className="p-12 space-y-16 bg-white dark:bg-slate-900">

                        {/* SUMMARY */}
                        <section>
                            <h2 className="text-xl font-black uppercase tracking-widest mb-6 pb-2 border-b-2 border-slate-900 dark:border-white inline-block">
                                {dict.sections.about}
                            </h2>
                            <p className="text-lg leading-relaxed italic text-slate-500 dark:text-slate-400">
                                "{user.about || "Focused and results-driven professional."}"
                            </p>
                        </section>

                        {/* TWO COLUMNS */}
                        <div className="grid md:grid-cols-3 gap-16">

                            {/* LEFT COLUMN: SKILLS, LANGUAGES, SOCIALS */}
                            <div className="space-y-12">
                                {/* SKILLS */}
                                <section>
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-slate-900 dark:text-white">
                                        {dict.sections.skills}
                                    </h3>
                                    <div className="flex flex-col gap-2">
                                        {user.skills?.map((s: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                <span className="font-medium">{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* LANGUAGES */}
                                {(user.spokenLanguages?.length > 0) && (
                                    <section>
                                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-slate-900 dark:text-white">
                                            {dict.sections.languages}
                                        </h3>
                                        <div className="space-y-2">
                                            {user.spokenLanguages?.map((l: any, i: number) => (
                                                <div key={i}>
                                                    <div className="font-bold">{l.language}</div>
                                                    <div className="text-xs opacity-60 text-blue-500 font-bold uppercase">{l.proficiency}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* RIGHT COLUMN: EXPERIENCE & EDUCATION */}
                            <div className="md:col-span-2 space-y-12">
                                {/* EXPERIENCE */}
                                <section>
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-slate-900 dark:text-white">
                                        {dict.sections.experience}
                                    </h3>
                                    <div className="space-y-10">
                                        {user.experience?.map((exp: any, i: number) => (
                                            <div key={i} className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800">
                                                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-900 dark:bg-white" />
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-black uppercase text-slate-900 dark:text-white leading-none">{exp.role}</h4>
                                                    <span className="text-xs font-bold text-blue-500 whitespace-nowrap">{exp.duration}</span>
                                                </div>
                                                <div className="text-sm font-bold opacity-60 mb-4">{exp.company}</div>
                                                <p className="text-sm leading-relaxed">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* EDUCATION */}
                                <section>
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-slate-900 dark:text-white">
                                        {dict.sections.education}
                                    </h3>
                                    <div className="space-y-8">
                                        {user.education?.map((edu: any, i: number) => (
                                            <div key={i}>
                                                <div className="flex justify-between mb-1">
                                                    <h4 className="font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                                                    <span className="text-xs opacity-60">{edu.year}</span>
                                                </div>
                                                <div className="text-sm opacity-60 italic">{edu.institution}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* PROJECTS - FULL WIDTH GRID */}
                        {(user.projects?.length > 0) && (
                            <section className="pt-8 border-t border-slate-100 dark:border-slate-800">
                                <h3 className="text-sm font-black uppercase tracking-widest mb-10 text-slate-900 dark:text-white">
                                    {dict.sections.projects}
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-8">
                                    {user.projects?.map((p: any, i: number) => (
                                        <div key={i} className="group">
                                            <h4 className="font-black mb-2 flex items-center gap-2">
                                                {p.title}
                                                {p.link && <a href={p.link} className="opacity-0 group-hover:opacity-100 transition-opacity"><Globe className="w-3 h-3" /></a>}
                                            </h4>
                                            <p className="text-sm opacity-60 leading-relaxed">{p.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 p-8 text-center text-[10px] uppercase tracking-[0.4em] opacity-40">
                        {user.fullName} • Generated by MonPortfolioWeb
                    </div>
                </div>

                {/* REMOVED FLOATING BUTTON AS WE ADDED HEADER BUTTON */}
            </div>
        </div>
    );
}
