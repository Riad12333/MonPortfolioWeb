'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import {
    Github, Linkedin, Twitter, Youtube, Facebook, Instagram,
    ExternalLink, Mail, Phone, MapPin, Download, ChevronRight,
    Award, Briefcase, GraduationCap, Globe, Layout,
    Star, Zap, Shield, Cpu, Code, FileDown,
    QrCode, X
} from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';

interface ThemeProps {
    user: any;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const itemVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

function SocialIcon({ platform }: { platform: string }) {
    const p = platform.toLowerCase();
    if (p === 'github') return <Github className="w-6 h-6" />;
    if (p === 'linkedin') return <Linkedin className="w-6 h-6" />;
    if (p === 'twitter') return <Twitter className="w-6 h-6" />;
    if (p === 'youtube') return <Youtube className="w-6 h-6" />;
    if (p === 'facebook') return <Facebook className="w-6 h-6" />;
    if (p === 'instagram') return <Instagram className="w-6 h-6" />;
    return <Globe className="w-6 h-6" />;
}

export default function BentoTheme({ user }: ThemeProps) {
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
    const theme = user.themeSettings?.bgcolor || 'bg-slate-950';
    const isDark = !theme.includes('bg-white');

    const textColor = isDark ? 'text-slate-200' : 'text-slate-800';
    const titleColor = isDark ? 'text-white' : 'text-slate-900';
    const mutedColor = isDark ? 'text-slate-400' : 'text-slate-500';
    const cardBg = isDark ? 'bg-white/5' : 'bg-slate-100/50';
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
        <div className={`min-h-screen ${theme} ${textColor} font-sans selection:bg-blue-500/30`}>
            {/* STICKY HEADER */}
            <header className={`fixed top-0 left-0 w-full z-50 border-b ${cardBorder} backdrop-blur-md bg-transparent px-4 md:px-8 py-4`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tighter">
                        Portfolio
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowQR(true)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} border hover:bg-opacity-80 transition-all group backdrop-blur-md`}
                        >
                            <QrCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-tight hidden md:block">QR Code</span>
                        </button>

                        <button
                            onClick={handleDownloadCV}
                            data-cv-button
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 border border-blue-400 text-white hover:bg-blue-50 disabled:opacity-50 transition-all group shadow-lg shadow-blue-500/30"
                        >
                            <FileDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-tight hidden md:block">
                                {dict.hero.resume}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* QR MODAL */}
            {showQR && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} border p-8 rounded-[32px] max-w-sm w-full relative`}
                    >
                        <button
                            onClick={() => setShowQR(false)}
                            className={`absolute top-4 right-4 p-2 ${isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-50 text-slate-500'} rounded-full transition-colors`}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="text-center">
                            <h3 className={`text-2xl font-bold ${titleColor} mb-2`}>Portfolio QR</h3>
                            <p className={`${mutedColor} text-sm mb-6 uppercase tracking-widest font-bold`}>Scan to browse</p>
                            <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-2xl">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`}
                                    alt="QR Code"
                                    className="w-48 h-48"
                                />
                            </div>
                            <p className={`text-xs ${mutedColor} break-all`}>{currentUrl}</p>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="pt-24 md:pt-32 p-4 md:p-8">
                {/* GRID LAYOUT */}
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* TOP HEADER SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* PROFILE CARD */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className={`lg:col-span-8 p-10 rounded-[40px] ${cardBg} backdrop-blur-3xl border ${cardBorder} flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group`}
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32" />
                            <div className="w-48 h-48 rounded-[32px] overflow-hidden shrink-0 border-4 border-white/5 shadow-2xl relative z-10">
                                {user.image ? (
                                    <img src={user.image} alt={user.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-6xl font-black text-white">
                                        {user.fullName?.[0]}
                                    </div>
                                )}
                            </div>
                            <div className="relative z-10 text-center md:text-left">
                                <h1 className={`text-4xl md:text-6xl font-black ${titleColor} mb-4 tracking-tighter`}>{user.fullName}</h1>
                                <p className={`text-xl font-medium text-blue-400 mb-6`}>{user.specialization || "Creative Developer"}</p>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <a href="#contact" className={`px-6 py-3 rounded-2xl font-bold border ${cardBorder} hover:bg-white/5 transition-all flex items-center`}>
                                        {dict.hero.cta}
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* SOCIALS BOX */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className={`lg:col-span-4 p-8 rounded-[40px] ${cardBg} backdrop-blur-3xl border ${cardBorder} flex flex-col justify-between`}
                        >
                            <h3 className={`text-xl font-bold ${titleColor} mb-8`}>Connect</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {user.socials && Object.entries(user.socials).map(([platform, url]) => {
                                    if (!url || typeof url !== 'string') return null;
                                    return (
                                        <a key={platform} href={url} target="_blank" className={`aspect-square rounded-2xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-slate-50'} flex items-center justify-center border ${cardBorder} transition-all hover:scale-110`}>
                                            <SocialIcon platform={platform} />
                                        </a>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* MAIN CONTENT GRID */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-12 gap-6"
                    >
                        {/* ABOUT CONTENT */}
                        <motion.div variants={itemVariants} className={`md:col-span-12 lg:col-span-4 p-8 rounded-[40px] ${cardBg} border ${cardBorder}`}>
                            <h3 className={`text-xl font-bold ${titleColor} mb-6 flex items-center gap-2`}>
                                <Star className="w-5 h-5 text-yellow-500" /> {dict.sections.about}
                            </h3>
                            <p className={`${mutedColor} leading-relaxed`}>
                                {user.about || "I am a passionate creative professional dedicated to building exceptional digital experiences."}
                            </p>
                        </motion.div>

                        {/* SKILLS BOX (Horizontal scroll or flex) */}
                        <motion.div variants={itemVariants} className={`md:col-span-12 lg:col-span-8 p-8 rounded-[40px] ${cardBg} border ${cardBorder}`}>
                            <h3 className={`text-xl font-bold ${titleColor} mb-8 flex items-center gap-2`}>
                                <Code className="w-5 h-5 text-emerald-500" /> {dict.sections.skills}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {user.skills?.map((skill: string, i: number) => (
                                    <span key={i} className={`px-5 py-2.5 rounded-xl ${isDark ? 'bg-white/5 text-slate-300' : 'bg-white text-slate-700'} border ${cardBorder} font-medium`}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* SERVICES */}
                        <motion.div variants={itemVariants} className={`md:col-span-12 p-8 rounded-[40px] ${cardBg} border ${cardBorder}`}>
                            <h3 className={`text-xl font-bold ${titleColor} mb-10 flex items-center gap-2`}>
                                <Zap className="w-5 h-5 text-orange-500" /> {dict.sections.services}
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {user.services?.map((s: any, i: number) => (
                                    <div key={i} className={`p-6 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-white'} border ${cardBorder} hover:border-blue-500/50 transition-colors`}>
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <h4 className={`font-bold ${titleColor} mb-2`}>{s.title}</h4>
                                        <div className="text-sm text-blue-400 font-bold mb-2">{s.price}</div>
                                        <p className={`text-xs ${mutedColor}`}>{s.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* EXPERIENCE BOX */}
                        {(user.experience?.length > 0) && (
                            <motion.div variants={itemVariants} className={`md:col-span-12 lg:col-span-7 p-8 rounded-[40px] ${cardBg} border ${cardBorder}`}>
                                <h3 className={`text-xl font-bold ${titleColor} mb-8 flex items-center gap-2`}>
                                    <Briefcase className="w-5 h-5 text-amber-500" /> {dict.sections.experience}
                                </h3>
                                <div className="space-y-6">
                                    {user.experience?.map((exp: any, i: number) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                            <div>
                                                <h4 className={`font-bold ${titleColor}`}>{exp.role}</h4>
                                                <div className="text-sm text-blue-400 mb-2">{exp.company} • {exp.duration}</div>
                                                <p className={`text-sm ${mutedColor}`}>{exp.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* EDUCATION BOX */}
                        {(user.education?.length > 0) && (
                            <motion.div variants={itemVariants} className={`md:col-span-12 lg:col-span-5 p-8 rounded-[40px] ${cardBg} border ${cardBorder}`}>
                                <h3 className={`text-xl font-bold ${titleColor} mb-8 flex items-center gap-2`}>
                                    <GraduationCap className="w-5 h-5 text-cyan-500" /> {dict.sections.education}
                                </h3>
                                <div className="space-y-6">
                                    {user.education?.map((edu: any, i: number) => (
                                        <div key={i}>
                                            <h4 className={`font-bold ${titleColor}`}>{edu.degree}</h4>
                                            <div className="text-sm text-cyan-400">{edu.institution}</div>
                                            <div className="text-xs opacity-50">{edu.year}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* CERTIFICATES BOX */}
                        {(user.certificates?.length > 0) && (
                            <motion.div variants={itemVariants} className={`md:col-span-12 p-8 rounded-[40px] ${cardBg} border ${cardBorder}`}>
                                <h3 className={`text-xl font-bold ${titleColor} mb-8 flex items-center gap-2`}>
                                    <Award className="w-5 h-5 text-purple-500" /> {dict.sections.certificates}
                                </h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {user.certificates?.map((cert: any, i: number) => (
                                        <div key={i} className={`p-6 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-white'} border ${cardBorder} hover:border-purple-500/50 transition-colors`}>
                                            <h4 className={`font-bold ${titleColor} mb-2`}>{cert.name}</h4>
                                            <div className="text-sm text-purple-400 mb-2">{cert.issuer}</div>
                                            <p className={`text-xs ${mutedColor}`}>{cert.year}</p>
                                            {cert.link && (
                                                <a href={cert.link} target="_blank" className="flex items-center gap-2 text-sm font-bold text-purple-400 mt-4">
                                                    VIEW CREDENTIAL <ChevronRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* PROJECTS */}
                        {(user.projects?.length > 0) && (
                            <motion.div variants={itemVariants} className={`md:col-span-12 p-8 rounded-[40px] ${cardBg} border ${cardBorder}`}>
                                <h3 className={`text-xl font-bold ${titleColor} mb-10 flex items-center gap-2`}>
                                    <Layout className="w-5 h-5 text-purple-500" /> {dict.sections.projects}
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-8">
                                    {user.projects?.map((p: any, i: number) => (
                                        <div key={i} className="group cursor-pointer">
                                            <div className={`aspect-video rounded-[32px] overflow-hidden mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border ${cardBorder}`}>
                                                <span className="text-4xl font-black opacity-10 uppercase italic">{p.title}</span>
                                            </div>
                                            <h4 className={`text-2xl font-bold ${titleColor} mb-2 group-hover:text-blue-400 transition-colors`}>{p.title}</h4>
                                            <p className={`${mutedColor} mb-4`}>{p.description}</p>
                                            {p.link && (
                                                <a href={p.link} target="_blank" className="flex items-center gap-2 text-sm font-bold text-blue-400">
                                                    VIEW PROJECT <ChevronRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                    </motion.div>

                    {/* FOOTER */}
                    <footer className="text-center py-12 opacity-50 text-sm">
                        © {new Date().getFullYear()} {user.fullName}. {dict.footer} MonPortfolioWeb
                    </footer>

                </div>
            </div>
        </div>
    );
}
