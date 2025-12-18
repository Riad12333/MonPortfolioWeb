'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import {
    Github, Linkedin, Twitter, Youtube, Facebook, Instagram,
    ExternalLink, Mail, Phone, MapPin, Download, ChevronRight,
    Award, Briefcase, GraduationCap, Globe, Layout, FileDown,
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
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};

export default function PremiumTheme({ user }: ThemeProps) {
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
    const cardBorder = isDark ? 'border-white/10' : 'border-slate-200';

    const sectionOrder = user.sectionOrder || ['Services', 'Experience', 'Skills', 'Projects', 'Education', 'Certificates', 'Languages'];

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
        <div className={`min-h-screen ${theme} ${textColor} font-sans selection:bg-emerald-500/30 overflow-x-hidden`}>
            {/* BACKGROUND DECORATIONS */}
            {isDark && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
                    <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full" />
                    <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-blue-500/10 blur-[120px] rounded-full" />
                </div>
            )}

            {/* FIXED NAVBAR */}
            <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/5 border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-tighter"
                    >
                        Portfolio
                    </motion.div>
                    <div className="flex items-center gap-4 text-white">
                        <button
                            onClick={() => setShowQR(true)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all group backdrop-blur-md"
                        >
                            <QrCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-tight hidden md:block">QR Code</span>
                        </button>

                        <button
                            onClick={handleDownloadCV}
                            data-cv-button
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 border border-blue-400 text-white hover:bg-blue-500 disabled:opacity-50 transition-all group backdrop-blur-md shadow-lg shadow-blue-500/40"
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
                        className="bg-slate-900 border border-white/10 p-8 rounded-[32px] max-w-sm w-full relative"
                    >
                        <button
                            onClick={() => setShowQR(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Portfolio QR</h3>
                            <p className="text-slate-400 text-sm mb-6 uppercase tracking-widest font-bold">Scan to browse</p>
                            <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-2xl">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`}
                                    alt="QR Code"
                                    className="w-48 h-48"
                                />
                            </div>
                            <p className="text-sm text-slate-500 break-all">{currentUrl}</p>
                        </div>
                    </motion.div>
                </div>
            )}

            <main className="container mx-auto px-6 pt-40 pb-20 max-w-6xl relative z-10">
                <section className="flex flex-col lg:flex-row items-center gap-16 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold tracking-wide uppercase"
                        >
                            {user.specialization || "Creative Professional"}
                        </motion.span>
                        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black ${titleColor} mb-8 leading-[1.1] tracking-tight`}>
                            {user.fullName}
                        </h1>
                        <p className={`text-lg md:text-xl ${mutedColor} mb-10 max-w-2xl leading-relaxed`}>
                            {user.about || "I transform complex ideas into elegant digital solutions with a focus on user experience and modern technology."}
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
                            <a href="#contact" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95">
                                {dict.hero.cta}
                            </a>

                            <div className="flex gap-4 ml-4">
                                {user.socials && Object.entries(user.socials).map(([platform, url]) => {
                                    if (!url || typeof url !== 'string') return null;
                                    return (
                                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className={`${mutedColor} hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors p-2`}>
                                            <SocialIcon platform={platform} />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="w-64 h-64 md:w-[400px] md:h-[400px] rounded-[40px] overflow-hidden rotate-3 hover:rotate-0 transition-all duration-500 border-2 border-white/10 group">
                            {user.image ? (
                                <img src={user.image} alt={user.fullName} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-8xl font-bold text-slate-700">
                                    {user.fullName?.[0]}
                                </div>
                            )}
                            <div className="absolute inset-0 border-[12px] border-white/5 pointer-events-none rounded-[40px]" />
                        </div>
                    </motion.div>
                </section>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-32"
                >
                    {sectionOrder?.map((sectionName: string) => {
                        switch (sectionName) {
                            case 'Services': return <ServicesSection user={user} dict={dict} isDark={isDark} key="services" />;
                            case 'Experience': return <ExperienceSection user={user} dict={dict} isDark={isDark} key="experience" />;
                            case 'Skills': return <SkillsSection user={user} dict={dict} isDark={isDark} key="skills" />;
                            case 'Projects': return <ProjectsSection user={user} dict={dict} isDark={isDark} key="projects" />;
                            case 'Education': return <EducationSection user={user} dict={dict} isDark={isDark} key="education" />;
                            case 'Certificates': return <CertificatesSection user={user} dict={dict} isDark={isDark} key="certificates" />;
                            case 'Languages': return <SpokenLanguagesSection user={user} dict={dict} isDark={isDark} key="languages" />;
                            default: return null;
                        }
                    })}
                </motion.div>
            </main>
        </div>
    );
}

// --- SUB-COMPONENTS ---
function SectionTitle({ title, isDark }: { title: string, isDark: boolean }) {
    return (
        <div className="flex items-center gap-4 mb-16">
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight`}>{title}</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full" />
        </div>
    );
}

function ServicesSection({ user, dict, isDark }: any) {
    if (!user.services?.length) return null;
    return (
        <section>
            <SectionTitle title={dict.sections.services} isDark={isDark} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {user.services.map((service: any, i: number) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className={`p-8 rounded-[32px] ${isDark ? 'bg-slate-900/50 hover:bg-slate-800/50' : 'bg-slate-50 hover:bg-slate-100'} border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group shadow-lg`}
                    >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                        <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} leading-relaxed mb-6`}>{service.description}</p>
                        {service.price && <div className="text-emerald-500 font-bold text-lg tracking-tight">{service.price}</div>}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function ExperienceSection({ user, dict, isDark }: any) {
    if (!user.experience?.length) return null;
    return (
        <section>
            <SectionTitle title={dict.sections.experience} isDark={isDark} />
            <div className="space-y-8">
                {user.experience.map((exp: any, i: number) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className={`relative pl-8 border-l-2 ${isDark ? 'border-slate-800 hover:border-emerald-500/50' : 'border-slate-200 hover:border-emerald-500/50'} transition-colors py-4 group`}
                    >
                        <div className={`absolute -left-[9px] top-8 w-4 h-4 rounded-full ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'} border-2 group-hover:border-emerald-500 transition-colors`} />
                        <div className="mb-2 text-emerald-500 font-bold tracking-wider text-sm uppercase">{exp.duration}</div>
                        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-1`}>{exp.role}</h3>
                        <div className={`text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-4 capitalize`}>{exp.company}</div>
                        <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-3xl leading-relaxed`}>{exp.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function SkillsSection({ user, dict, isDark }: any) {
    if (!user.skills?.length) return null;
    return (
        <section>
            <SectionTitle title={dict.sections.skills} isDark={isDark} />
            <div className="flex flex-wrap gap-4">
                {user.skills.map((skill: string, i: number) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className={`px-6 py-3 rounded-2xl ${isDark ? 'bg-slate-900/50 hover:bg-emerald-500/10' : 'bg-slate-50 hover:bg-emerald-500/10'} border border-white/5 transition-all text-lg font-medium`}
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function ProjectsSection({ user, dict, isDark }: any) {
    if (!user.projects?.length) return null;
    return (
        <section>
            <SectionTitle title={dict.sections.projects} isDark={isDark} />
            <div className="grid md:grid-cols-2 gap-10">
                {user.projects.map((proj: any, i: number) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className={`group rounded-[40px] overflow-hidden ${isDark ? 'bg-slate-950 border-white/5' : 'bg-white border-slate-200'} border shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                    >
                        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-950 relative overflow-hidden flex items-center justify-center text-4xl font-black text-white/10 italic">
                            {proj.title}
                        </div>
                        <div className="p-10">
                            <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-emerald-400 transition-colors`}>{proj.title}</h3>
                            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg mb-8 leading-relaxed`}>{proj.description}</p>
                            {proj.link && (
                                <a href={proj.link} target="_blank" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:gap-4 transition-all">
                                    {dict.sections.projects === 'Projets' ? 'Voir le projet' : 'View Project'} <ChevronRight className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function EducationSection({ user, dict, isDark }: any) {
    if (!user.education?.length) return null;
    return (
        <section>
            <SectionTitle title={dict.sections.education} isDark={isDark} />
            <div className="grid md:grid-cols-2 gap-6">
                {user.education.map((edu: any, i: number) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className={`p-8 rounded-[32px] ${isDark ? 'bg-slate-900/30' : 'bg-slate-50'} border border-white/5 flex gap-6`}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <div>
                            <div className="text-emerald-500 font-bold mb-1">{edu.year}</div>
                            <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>{edu.degree}</h4>
                            <div className={`${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium`}>{edu.institution}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function CertificatesSection({ user, dict, isDark }: any) {
    if (!user.certificates?.length) return null;
    return (
        <section>
            <SectionTitle title={dict.sections.certificates} isDark={isDark} />
            <div className="grid lg:grid-cols-2 gap-6">
                {user.certificates.map((cert: any, i: number) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className={`p-6 rounded-[24px] ${isDark ? 'bg-slate-900/40 border-white/5' : 'bg-slate-50 border-slate-200'} border flex items-center justify-between group`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cert.name}</h4>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">{cert.issuer} • {cert.year}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function SpokenLanguagesSection({ user, dict, isDark }: any) {
    if (!user.spokenLanguages?.length) return null;
    return (
        <section>
            <SectionTitle title={dict.sections.languages} isDark={isDark} />
            <div className="flex flex-wrap gap-8">
                {user.spokenLanguages.map((lang: any, i: number) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 rounded-full border-2 border-emerald-500/20 flex items-center justify-center font-bold text-emerald-500`}>
                            {lang.language?.[0]}
                        </div>
                        <div>
                            <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang.language}</div>
                            <div className="text-sm text-slate-500">{lang.proficiency}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

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
