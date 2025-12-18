'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
    Download, Save, Globe, User, Briefcase, GraduationCap,
    Award, FileText, Share2, Palette, Layout, Languages,
    Github, Linkedin, Twitter, Youtube, Facebook, Instagram, Twitch,
    MessageCircle, Send, Upload, Trash2, Plus, ArrowUp, ArrowDown, GripVertical,
    FileDown
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- ICONS MAPPING FOR SOCIALS (Using Lucide proxies for missing brands) ---
const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    youtube: Youtube,
    reddit: Globe, // Fallback
    facebook: Facebook,
    whatsapp: MessageCircle,
    telegram: Send,
    tiktok: Globe, // Fallback
    instagram: Instagram,
    twitch: Twitch,
    snapchat: Globe // Fallback
};

const tabs = [
    { id: 'lang', label: 'Display Lang', icon: Globe, color: 'text-emerald-500' },
    { id: 'about', label: 'About', icon: FileText, color: 'text-orange-400' },
    { id: 'skills', label: 'Skills', icon: Award, color: 'text-amber-400' },
    { id: 'services', label: 'Services', icon: Briefcase, color: 'text-rose-700' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-violet-700' },
    { id: 'experience', label: 'Experience', icon: FileText, color: 'text-yellow-400' },
    { id: 'projects', label: 'Projects', icon: Layout, color: 'text-pink-500' },
    { id: 'certificates', label: 'Certificates', icon: Award, color: 'text-orange-500' },
    { id: 'languages', label: 'Languages', icon: Globe, color: 'text-sky-400' },
    { id: 'socials', label: 'Socials', icon: Share2, color: 'text-violet-400' },
    { id: 'bgcolor', label: 'Bgcolor', icon: Palette, color: 'text-pink-400' },
    { id: 'theme', label: 'Theme', icon: Layout, color: 'text-lime-500' },
    { id: 'arrangement', label: 'Arrangement', icon: Layout, color: 'text-slate-600' },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('lang');
    const [profile, setProfile] = useState({
        fullName: "Cool Ki",
        username: "kicool843",
        language: "English",
        country: "",
        phone: "",
        specialization: "",
        about: "",
        image: "",
        cvUrl: "",
        skills: ["React", "Next.js", "Tailwind CSS"] as string[],
        services: [] as any[],
        education: [] as any[],
        experience: [] as any[],
        projects: [] as any[],
        certificates: [] as any[],
        spokenLanguages: [] as any[],
        socials: {
            github: "", linkedin: "", twitter: "", youtube: "",
            reddit: "", facebook: "", whatsapp: "", telegram: "",
            tiktok: "", instagram: "", twitch: "", snapchat: ""
        },
        sectionOrder: ['Services', 'Experience', 'Skills', 'Projects', 'Education', 'Certificates', 'Languages'] as string[],
        themeSettings: {
            bgcolor: 'bg-slate-950',
            themeId: 'theme-minimal'
        }
    });

    // Handle Input Change for top section
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.id]: e.target.value });
    };

    // Handle Socials Change
    const handleSocialChange = (key: string, value: string) => {
        setProfile(prev => ({
            ...prev,
            socials: { ...prev.socials, [key as keyof typeof prev.socials]: value }
        }));
    };

    // Handle Skills
    const addSkill = () => {
        setProfile(prev => ({ ...prev, skills: [...prev.skills, ""] }));
    };

    const removeSkill = (index: number) => {
        setProfile(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch Profile on Load
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.email) { // Check if we got valid user data
                        setProfile(prev => ({
                            ...prev,
                            fullName: data.fullName || prev.fullName,
                            username: data.username || prev.username,
                            language: data.language || "English",
                            country: data.country || "",
                            phone: data.phone || "",
                            specialization: data.specialization || "",
                            about: data.about || "",
                            image: data.image || prev.image,
                            cvUrl: data.cvUrl || prev.cvUrl,
                            skills: data.skills.length > 0 ? data.skills : prev.skills,
                            services: data.services || [],
                            education: data.education || [],
                            experience: data.experience || [],
                            projects: data.projects || [],
                            certificates: data.certificates || [],
                            spokenLanguages: data.spokenLanguages || [],
                            socials: { ...prev.socials, ...(data.socials as object) },
                            sectionOrder: data.sectionOrder && data.sectionOrder.length > 0 ? data.sectionOrder : prev.sectionOrder,
                            themeSettings: data.themeSettings || prev.themeSettings
                        }));
                    }
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Save Functionality
    const handleSave = async () => {
        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });

            if (res.ok) {
                alert("Profile saved successfully!");
            } else {
                alert("Failed to save profile. Please try again.");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("An error occurred while saving.");
        }
    };

    // Download CV Functionality (POST Fetch as per Spec)


    // Upload CV Functionality
    // Generic Upload Helper
    // Generic Upload Helper
    const uploadFile = async (file: File, customName?: string) => {
        const formData = new FormData();
        formData.append('file', file);
        if (customName) {
            formData.append('customName', customName);
        }

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                return data.url;
            } else {
                alert("Upload failed: " + (data.message || 'Unknown error'));
                return null;
            }
        } catch (error) {
            console.error("Upload Error:", error);
            alert("An error occurred during upload.");
            return null;
        }
    };

    // Upload CV Functionality
    // Upload CV Functionality
    const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const username = profile.username || "user";
            const customName = `cv.${username.toLowerCase().replace(/[^a-z0-9]/g, '')}.pdf`;

            // Allow PDF
            if (file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf')) {
                setUploading(true);
                try {
                    const url = await uploadFile(file, customName);
                    if (url) {
                        setProfile(prev => ({ ...prev, cvUrl: url }));
                        alert(`CV uploaded successfully as ${customName}! Don't forget to click Save.`);
                    }
                } catch (err) {
                    console.error(err);
                    alert("Upload error.");
                } finally {
                    setUploading(false);
                    e.target.value = ""; // Reset input
                }
            } else {
                alert("Please upload a PDF file.");
                e.target.value = ""; // Reset input
            }
        }
    };

    // ... (image handler stays same or similar)

    // IN RENDER:
    // ...
    <div className="flex flex-col gap-2">
        <div className="relative">
            <label className="cursor-pointer">
                <input
                    type="file"
                    className="hidden"
                    accept=".pdf,application/pdf"
                    onChange={handleCVUpload}
                />
                <div className={`flex items-center gap-2 h-10 px-4 py-2 ${uploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md transition-colors text-sm font-medium`}>
                    <Upload className={`w-4 h-4 ${uploading ? 'animate-spin' : ''}`} /> {uploading ? 'Uploading...' : 'Upload CV (PDF)'}
                </div>
            </label>
        </div>
        {profile.cvUrl && (
            <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                <FileText className="w-4 h-4" /> View Current CV
            </a>
        )}
    </div>

    // Upload Image Functionality
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith("image/")) {
                setUploading(true);
                try {
                    const url = await uploadFile(file);
                    if (url) {
                        setProfile(prev => ({ ...prev, image: url }));
                    }
                } finally {
                    setUploading(false);
                    e.target.value = "";
                }
            } else {
                alert("Please upload an valid image file.");
                e.target.value = "";
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <Navbar />

            <main className="container mx-auto px-4 pt-28 max-w-5xl">
                {/* TOP PROFILE CARD */}
                <Card className="bg-white border-none shadow-xl mb-8 overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-12 items-start">

                            {/* Left: Avatar */}
                            <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                                <div className="relative w-48 h-48 rounded-full border-4 border-emerald-400 p-1">
                                    <div className="w-full h-full rounded-full bg-slate-200 relative overflow-hidden flex items-center justify-center">
                                        {profile.image ? (
                                            <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-20 h-20 text-slate-400" />
                                        )}
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="image-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    <Label htmlFor="image-upload">
                                        <div className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-2 font-medium shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2">
                                            <Upload className="w-4 h-4" /> Upload Image
                                        </div>
                                    </Label>
                                </div>
                            </div>

                            {/* Right: Form */}
                            <div className="flex-1 w-full">
                                <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center md:text-left">{profile.fullName}</h1>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName" className="text-slate-600 font-semibold">Full Name</Label>
                                        <Input id="fullName" value={profile.fullName} onChange={handleProfileChange} className="bg-white border-slate-200 text-slate-900 focus:ring-emerald-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="text-slate-600 font-semibold">Username</Label>
                                        <Input id="username" value={profile.username} onChange={handleProfileChange} className="bg-white border-slate-200 text-slate-900 focus:ring-emerald-500" />
                                        <a
                                            href={`/portfolio/${profile.username.toLowerCase()}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 text-xs hover:underline cursor-pointer inline-flex items-center gap-1"
                                        >
                                            mon-portfolio.vercel.app/portfolio/{profile.username.toLowerCase()}
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country" className="text-slate-600 font-semibold">Country</Label>
                                        <Input id="country" value={profile.country} onChange={handleProfileChange} className="bg-white border-slate-200 text-slate-900 focus:ring-emerald-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-slate-600 font-semibold">Phone</Label>
                                        <Input id="phone" value={profile.phone} onChange={handleProfileChange} className="bg-white border-slate-200 text-slate-900 focus:ring-emerald-500" />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-8">
                                    <Label htmlFor="specialization" className="text-slate-600 font-semibold">Specialization</Label>
                                    <Input id="specialization" placeholder="e.g. Developer, Designer" value={profile.specialization} onChange={handleProfileChange} className="bg-white border-slate-200 text-slate-900 focus:ring-emerald-500" />
                                </div>

                                <div className="flex flex-wrap justify-end gap-3">


                                    <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
                                        <Save className="w-4 h-4" /> Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* BOTTOM SECTION */}
                <div className="bg-white rounded-xl shadow-xl p-6 min-h-[500px]">
                    {/* TABS GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-8">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm font-bold transition-all
                                ${isActive
                                            ? 'bg-emerald-600 text-white shadow-md'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
                            `}
                                >
                                    <tab.icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* CONTENT AREA */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* --- LANGUAGE TAB --- */}
                        {activeTab === 'lang' && (
                            <div className="bg-slate-50 rounded-xl border border-slate-100 p-6 space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-6 h-6 text-blue-500" />
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold text-slate-900">Display Language</h2>
                                        <p className="text-slate-500 text-sm">Choose the language in which your portfolio will be displayed to visitors.</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        { code: 'English', label: 'English', sub: 'Display portfolio in English' },
                                        { code: 'French', label: 'Français', sub: 'Afficher le portfolio en français' },
                                        { code: 'Spanish', label: 'Español', sub: 'Mostrar portafolio en español' },
                                        { code: 'Portuguese', label: 'Português', sub: 'Exibir portfólio em Português' },
                                        { code: 'Italian', label: 'Italiano', sub: 'Visualizza portfolio in Italiano' },
                                        { code: 'German', label: 'Deutsch', sub: 'Portfolio auf Deutsch anzeigen' },
                                        { code: 'Arabic', label: 'Arabic', sub: 'عرض المحفظة باللغة العربية' },
                                        { code: 'Dutch', label: 'Nederlands', sub: 'Portfolio in het Nederlands weergeven' },
                                        { code: 'Turkish', label: 'Türkçe', sub: 'Portföyü Türkçe göster' },
                                        { code: 'Russian', label: 'Русский', sub: 'Показать портфолио на русском' },
                                        { code: 'Japanese', label: '日本語', sub: 'ポートフォリオを日本語で表示' },
                                        { code: 'Chinese', label: '中文', sub: '以中文显示作品集' },
                                        { code: 'Hindi', label: 'हिंदी', sub: 'पोर्टफोलियो हिंदी में दिखाएं' },
                                        { code: 'Korean', label: '한국어', sub: '포트폴리오를 한국어로 표시' },
                                    ].map((lang) => (
                                        <div
                                            key={lang.code}
                                            onClick={() => setProfile({ ...profile, language: lang.code })}
                                            className={`
                                                relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4
                                                ${profile.language === lang.code
                                                    ? 'border-purple-500 bg-white shadow-md'
                                                    : 'border-slate-200 bg-white hover:border-slate-300'}
                                            `}
                                        >
                                            <div className={`
                                                mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                                ${profile.language === lang.code ? 'border-purple-500' : 'border-slate-400'}
                                            `}>
                                                {profile.language === lang.code && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{lang.label}</div>
                                                <div className="text-slate-500 text-xs mt-1">{lang.sub}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end mt-6">
                                    <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]">
                                        <Save className="w-4 h-4 mr-2" /> Save
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* --- ABOUT TAB --- */}
                        {activeTab === 'about' && (
                            <div className="bg-white rounded-xl p-2 space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-500">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900">Summary</h2>
                                </div>
                                <Textarea
                                    placeholder="Tell us about yourself..."
                                    className="w-full min-h-[200px] text-base resize-none bg-slate-50"
                                    value={profile.about}
                                    onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                                />
                                <div className="flex justify-end">
                                    <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600 text-white min-w-[120px]">
                                        <Save className="w-4 h-4 mr-2" /> Save
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* --- SKILLS TAB --- */}
                        {activeTab === 'skills' && (
                            <div className="bg-white rounded-xl p-2 space-y-6">
                                <SectionHeader icon={Award} title="Skills" color="text-amber-500" bg="bg-amber-100" />

                                <div className="space-y-3">
                                    {profile.skills.map((skill, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-1 bg-purple-50 rounded-lg border border-purple-100">
                                            <Input
                                                value={skill}
                                                onChange={(e) => {
                                                    const newSkills = [...profile.skills];
                                                    newSkills[idx] = e.target.value;
                                                    setProfile({ ...profile, skills: newSkills });
                                                }}
                                                className="border-0 bg-transparent focus-visible:ring-0 shadow-none text-slate-700 font-medium"
                                            />
                                            <button onClick={() => removeSkill(idx)} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={addSkill}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-bold h-12 shadow-md shadow-purple-200"
                                >
                                    + Add Skill
                                </Button>

                                <SaveButton onClick={handleSave} />
                            </div>
                        )}

                        {/* --- SERVICES TAB --- */}
                        {activeTab === 'services' && (
                            <div className="bg-white rounded-xl p-2 space-y-6">
                                <SectionHeader icon={Briefcase} title="Services" color="text-emerald-600" bg="bg-emerald-100" />

                                <div className="space-y-4">
                                    {profile.services.map((service, idx) => (
                                        <div key={idx} className="p-4 bg-white rounded-xl border border-emerald-200 shadow-sm space-y-3 relative group">
                                            <button onClick={() => {
                                                const newServices = profile.services.filter((_, i) => i !== idx);
                                                setProfile({ ...profile, services: newServices });
                                            }} className="absolute top-3 right-3 text-emerald-300 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>

                                            <Input
                                                placeholder="Service Title (e.g. Web Development)"
                                                className="bg-white border-emerald-200 focus-visible:ring-emerald-500 font-bold text-slate-800 dark:bg-white dark:text-slate-900"
                                                value={service.title}
                                                onChange={(e) => {
                                                    const newServices = [...profile.services];
                                                    newServices[idx].title = e.target.value;
                                                    setProfile({ ...profile, services: newServices });
                                                }}
                                            />
                                            <Textarea
                                                placeholder="Description..."
                                                className="bg-white border-emerald-200 focus-visible:ring-emerald-500 min-h-[80px] text-slate-900 dark:bg-white dark:text-slate-900"
                                                value={service.description}
                                                onChange={(e) => {
                                                    const newServices = [...profile.services];
                                                    newServices[idx].description = e.target.value;
                                                    setProfile({ ...profile, services: newServices });
                                                }}
                                            />
                                            <Input
                                                placeholder="Price (e.g. Starts at $500)"
                                                className="bg-white border-emerald-200 focus-visible:ring-emerald-500 w-1/2 text-slate-900 dark:bg-white dark:text-slate-900"
                                                value={service.price || ''}
                                                onChange={(e) => {
                                                    const newServices = [...profile.services];
                                                    newServices[idx].price = e.target.value;
                                                    setProfile({ ...profile, services: newServices });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => setProfile({ ...profile, services: [...profile.services, { title: '', description: '', price: '' }] })}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 shadow-md shadow-emerald-200"
                                >
                                    + Add Service
                                </Button>

                                <SaveButton onClick={handleSave} color="emerald" />
                            </div>
                        )}

                        {/* --- EDUCATION TAB --- */}
                        {activeTab === 'education' && (
                            <div className="bg-white rounded-xl p-2 space-y-6">
                                <SectionHeader icon={GraduationCap} title="Education" color="text-violet-600" bg="bg-violet-100" />

                                <div className="space-y-4">
                                    {profile.education.map((edu, idx) => (
                                        <div key={idx} className="p-4 bg-white rounded-xl border border-violet-200 shadow-sm space-y-3 relative">
                                            <button onClick={() => {
                                                const newEdu = profile.education.filter((_, i) => i !== idx);
                                                setProfile({ ...profile, education: newEdu });
                                            }} className="absolute top-3 right-3 text-violet-300 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>

                                            <div className="grid md:grid-cols-2 gap-3">
                                                <Input
                                                    placeholder="Institution Name"
                                                    className="bg-white border-violet-200 font-bold text-slate-900 dark:bg-white dark:text-slate-900"
                                                    value={edu.institution}
                                                    onChange={(e) => {
                                                        const items = [...profile.education];
                                                        items[idx].institution = e.target.value;
                                                        setProfile({ ...profile, education: items });
                                                    }}
                                                />
                                                <Input
                                                    placeholder="Year (e.g. 2018 - 2022)"
                                                    className="bg-white border-violet-200 text-slate-900 dark:bg-white dark:text-slate-900"
                                                    value={edu.year}
                                                    onChange={(e) => {
                                                        const items = [...profile.education];
                                                        items[idx].year = e.target.value;
                                                        setProfile({ ...profile, education: items });
                                                    }}
                                                />
                                            </div>
                                            <Input
                                                placeholder="Degree / Certificate"
                                                className="bg-white border-violet-200 text-slate-900 dark:bg-white dark:text-slate-900"
                                                value={edu.degree}
                                                onChange={(e) => {
                                                    const items = [...profile.education];
                                                    items[idx].degree = e.target.value;
                                                    setProfile({ ...profile, education: items });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => setProfile({ ...profile, education: [...profile.education, { institution: '', degree: '', year: '' }] })}
                                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold h-12 shadow-md shadow-violet-200"
                                >
                                    + Add Education
                                </Button>

                                <SaveButton onClick={handleSave} color="violet" />
                            </div>
                        )}

                        {/* --- EXPERIENCE TAB --- */}
                        {activeTab === 'experience' && (
                            <div className="bg-white rounded-xl p-2 space-y-6">
                                <SectionHeader icon={FileText} title="Experience" color="text-blue-600" bg="bg-blue-100" />

                                <div className="space-y-4">
                                    {profile.experience.map((exp, idx) => (
                                        <div key={idx} className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm space-y-3 relative">
                                            <button onClick={() => {
                                                const items = profile.experience.filter((_, i) => i !== idx);
                                                setProfile({ ...profile, experience: items });
                                            }} className="absolute top-3 right-3 text-blue-300 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>

                                            <div className="grid md:grid-cols-2 gap-3">
                                                <Input
                                                    placeholder="Company Name"
                                                    className="bg-white border-blue-200 font-bold text-slate-900 dark:bg-white dark:text-slate-900"
                                                    value={exp.company}
                                                    onChange={(e) => {
                                                        const items = [...profile.experience];
                                                        items[idx].company = e.target.value;
                                                        setProfile({ ...profile, experience: items });
                                                    }}
                                                />
                                                <Input
                                                    placeholder="Duration (e.g. 2020 - Present)"
                                                    className="bg-white border-blue-200 text-slate-900 dark:bg-white dark:text-slate-900"
                                                    value={exp.duration}
                                                    onChange={(e) => {
                                                        const items = [...profile.experience];
                                                        items[idx].duration = e.target.value;
                                                        setProfile({ ...profile, experience: items });
                                                    }}
                                                />
                                            </div>
                                            <Input
                                                placeholder="Role / Position"
                                                className="bg-white border-blue-200 font-semibold text-slate-700 dark:bg-white dark:text-slate-900"
                                                value={exp.role}
                                                onChange={(e) => {
                                                    const items = [...profile.experience];
                                                    items[idx].role = e.target.value;
                                                    setProfile({ ...profile, experience: items });
                                                }}
                                            />
                                            <Textarea
                                                placeholder="Description of responsibilities..."
                                                className="bg-white border-blue-200 min-h-[80px] text-slate-900 dark:bg-white dark:text-slate-900"
                                                value={exp.description}
                                                onChange={(e) => {
                                                    const items = [...profile.experience];
                                                    items[idx].description = e.target.value;
                                                    setProfile({ ...profile, experience: items });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => setProfile({ ...profile, experience: [...profile.experience, { company: '', role: '', duration: '', description: '' }] })}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-md shadow-blue-200"
                                >
                                    + Add Experience
                                </Button>

                                <SaveButton onClick={handleSave} color="blue" />
                            </div>
                        )}

                        {/* --- PROJECTS TAB --- */}
                        {activeTab === 'projects' && (
                            <div className="bg-white rounded-xl p-2 space-y-6">
                                <SectionHeader icon={Layout} title="Projects" color="text-pink-600" bg="bg-pink-100" />

                                <div className="space-y-4">
                                    {profile.projects.map((proj, idx) => (
                                        <div key={idx} className="p-4 bg-white rounded-xl border border-pink-200 shadow-sm space-y-3 relative">
                                            <button onClick={() => {
                                                const items = profile.projects.filter((_, i) => i !== idx);
                                                setProfile({ ...profile, projects: items });
                                            }} className="absolute top-3 right-3 text-pink-300 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>

                                            <Input
                                                placeholder="Project Title"
                                                className="bg-white border-pink-200 font-bold text-slate-900 dark:bg-white dark:text-slate-900"
                                                value={proj.title}
                                                onChange={(e) => {
                                                    const items = [...profile.projects];
                                                    items[idx].title = e.target.value;
                                                    setProfile({ ...profile, projects: items });
                                                }}
                                            />
                                            <Input
                                                placeholder="Project Link (URL)"
                                                className="bg-white border-pink-200 text-sm text-blue-600 dark:bg-white dark:text-slate-900"
                                                value={proj.link}
                                                onChange={(e) => {
                                                    const items = [...profile.projects];
                                                    items[idx].link = e.target.value;
                                                    setProfile({ ...profile, projects: items });
                                                }}
                                            />
                                            <Textarea
                                                placeholder="Project Description..."
                                                className="bg-white border-pink-200 min-h-[80px] text-slate-900 dark:bg-white dark:text-slate-900"
                                                value={proj.description}
                                                onChange={(e) => {
                                                    const items = [...profile.projects];
                                                    items[idx].description = e.target.value;
                                                    setProfile({ ...profile, projects: items });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => setProfile({ ...profile, projects: [...profile.projects, { title: '', link: '', description: '' }] })}
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold h-12 shadow-md shadow-pink-200"
                                >
                                    + Add Project
                                </Button>

                                <SaveButton onClick={handleSave} color="pink" />
                            </div>
                        )}

                        {/* --- CERTIFICATES TAB --- */}
                        {activeTab === 'certificates' && (
                            <div className="bg-white rounded-xl p-2 space-y-6">
                                <SectionHeader icon={Award} title="Certificates" color="text-orange-600" bg="bg-orange-100" />

                                <div className="space-y-4">
                                    {profile.certificates.map((cert, idx) => (
                                        <div key={idx} className="p-4 bg-white rounded-xl border border-orange-200 shadow-sm space-y-3 relative">
                                            <button onClick={() => {
                                                const items = profile.certificates.filter((_, i) => i !== idx);
                                                setProfile({ ...profile, certificates: items });
                                            }} className="absolute top-3 right-3 text-orange-300 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>

                                            <Input
                                                placeholder="Certificate Name"
                                                className="bg-white border-orange-200 font-bold text-slate-900 dark:bg-white dark:text-slate-900"
                                                value={cert.name}
                                                onChange={(e) => {
                                                    const items = [...profile.certificates];
                                                    items[idx].name = e.target.value;
                                                    setProfile({ ...profile, certificates: items });
                                                }}
                                            />
                                            <div className="grid md:grid-cols-2 gap-3">
                                                <Input
                                                    placeholder="Issuer (e.g. Google, Coursera)"
                                                    className="bg-white border-orange-200 text-slate-900 dark:bg-white dark:text-slate-900"
                                                    value={cert.issuer}
                                                    onChange={(e) => {
                                                        const items = [...profile.certificates];
                                                        items[idx].issuer = e.target.value;
                                                        setProfile({ ...profile, certificates: items });
                                                    }}
                                                />
                                                <Input
                                                    placeholder="Year"
                                                    className="bg-white border-orange-200 text-slate-900 dark:bg-white dark:text-slate-900"
                                                    value={cert.year}
                                                    onChange={(e) => {
                                                        const items = [...profile.certificates];
                                                        items[idx].year = e.target.value;
                                                        setProfile({ ...profile, certificates: items });
                                                    }}
                                                />
                                            </div>
                                            <Input
                                                placeholder="Credential URL (Optional)"
                                                className="bg-white border-orange-200 text-sm text-slate-900 dark:bg-white dark:text-slate-900"
                                                value={cert.link}
                                                onChange={(e) => {
                                                    const items = [...profile.certificates];
                                                    items[idx].link = e.target.value;
                                                    setProfile({ ...profile, certificates: items });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => setProfile({ ...profile, certificates: [...profile.certificates, { name: '', issuer: '', year: '', link: '' }] })}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 shadow-md shadow-orange-200"
                                >
                                    + Add Certificate
                                </Button>

                                <SaveButton onClick={handleSave} color="orange" />
                            </div>
                        )}

                        {/* --- SPOKEN LANGUAGES TAB --- */}
                        {activeTab === 'languages' && (
                            <div className="bg-white rounded-xl p-2 space-y-6">
                                <SectionHeader icon={Languages} title="Spoken Languages" color="text-sky-600" bg="bg-sky-100" />

                                <div className="space-y-4">
                                    {profile.spokenLanguages.map((lang, idx) => (
                                        <div key={idx} className="p-4 bg-sky-50 rounded-xl border border-sky-100 flex items-center gap-4 relative">
                                            <div className="flex-1 space-y-2">
                                                <Input
                                                    placeholder="Language (e.g. English)"
                                                    className="bg-white border-sky-200 font-bold text-slate-900"
                                                    value={lang.language}
                                                    onChange={(e) => {
                                                        const items = [...profile.spokenLanguages];
                                                        items[idx].language = e.target.value;
                                                        setProfile({ ...profile, spokenLanguages: items });
                                                    }}
                                                />
                                                <Input
                                                    placeholder="Proficiency (e.g. Native, Fluent)"
                                                    className="bg-white border-sky-200 text-sm text-slate-900"
                                                    value={lang.proficiency}
                                                    onChange={(e) => {
                                                        const items = [...profile.spokenLanguages];
                                                        items[idx].proficiency = e.target.value;
                                                        setProfile({ ...profile, spokenLanguages: items });
                                                    }}
                                                />
                                            </div>

                                            <button onClick={() => {
                                                const items = profile.spokenLanguages.filter((_, i) => i !== idx);
                                                setProfile({ ...profile, spokenLanguages: items });
                                            }} className="p-2 text-sky-300 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => setProfile({ ...profile, spokenLanguages: [...profile.spokenLanguages, { language: '', proficiency: '' }] })}
                                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold h-12 shadow-md shadow-sky-200"
                                >
                                    + Add Language
                                </Button>

                                <SaveButton onClick={handleSave} color="sky" />
                            </div>
                        )}

                        {/* --- SOCIALS TAB --- */}
                        {activeTab === 'socials' && (
                            <div className="bg-white rounded-xl p-2 space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <LinkIcon className="w-6 h-6 text-emerald-500" />
                                    <h2 className="text-xl font-bold text-slate-900">Social Media Links</h2>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {Object.keys(profile.socials).map((key) => {
                                        const Icon = socialIcons[key as keyof typeof socialIcons] || Globe;
                                        return (
                                            <div key={key} className="space-y-1">
                                                <div className="flex items-center gap-2 text-slate-700 font-semibold capitalize">
                                                    <Icon className="w-4 h-4" /> {key}
                                                </div>
                                                <Input
                                                    placeholder={`Enter URL (${key})`}
                                                    className="bg-slate-50 border-slate-200 focus:ring-emerald-500 text-slate-900"
                                                    value={profile.socials[key as keyof typeof profile.socials]}
                                                    onChange={(e) => handleSocialChange(key, e.target.value)}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex justify-end mt-6">
                                    <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]">
                                        <Save className="w-4 h-4 mr-2" /> Save
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* --- ARRANGEMENT TAB --- */}
                        {activeTab === 'arrangement' && (
                            <div className="bg-white rounded-xl p-6 space-y-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <GripVertical className="w-6 h-6 text-slate-500" />
                                    <h2 className="text-xl font-bold text-slate-900">Section Ordering</h2>
                                    <p className="text-sm text-slate-500 ml-2">(Arrange how sections appear on your public profile)</p>
                                </div>

                                <div className="space-y-3 max-w-2xl mx-auto">
                                    {profile.sectionOrder && profile.sectionOrder.map((section, index) => (
                                        <div key={section} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col items-center justify-center w-8 h-8 rounded bg-slate-200 text-slate-500 font-bold text-xs">
                                                    {index + 1}
                                                </div>
                                                <span className="font-bold text-slate-700 text-lg">{section}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        if (index === 0) return;
                                                        const newOrder = [...profile.sectionOrder];
                                                        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
                                                        setProfile({ ...profile, sectionOrder: newOrder });
                                                    }}
                                                    disabled={index === 0}
                                                    className={`p-2 rounded-lg ${index === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200 hover:text-emerald-500'}`}
                                                >
                                                    <ArrowUp className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (index === profile.sectionOrder.length - 1) return;
                                                        const newOrder = [...profile.sectionOrder];
                                                        [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
                                                        setProfile({ ...profile, sectionOrder: newOrder });
                                                    }}
                                                    disabled={index === profile.sectionOrder.length - 1}
                                                    className={`p-2 rounded-lg ${index === profile.sectionOrder.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200 hover:text-emerald-500'}`}
                                                >
                                                    <ArrowDown className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end mt-8 border-t pt-6 border-slate-100">
                                    <Button onClick={handleSave} className="bg-slate-800 hover:bg-slate-900 text-white min-w-[150px] h-12 text-lg">
                                        <Save className="w-5 h-5 mr-2" /> Save Arrangement
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* --- BGCOLOR TAB --- */}
                        {activeTab === 'bgcolor' && (
                            <div className="bg-white rounded-xl p-6 space-y-6">
                                <SectionHeader icon={Palette} title="Portfolio Background" color="text-pink-500" bg="bg-pink-100" />

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        { name: "Slate Dark", value: "bg-slate-950" },
                                        { name: "Midnight Blue", value: "bg-[#0B1120]" },
                                        { name: "Deep Purple", value: "bg-[#1e1b4b]" },
                                        { name: "Gradient Dark", value: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" },
                                        { name: "Gradient Ocean", value: "bg-gradient-to-br from-slate-900 via-cyan-900 to-emerald-900" },
                                        { name: "Premium Onyx", value: "bg-[#101010]" },
                                        { name: "Royal Indigo", value: "bg-gradient-to-tr from-[#0f172a] via-[#1e1b4b] to-[#312e81]" },
                                        { name: "Neon Matrix", value: "bg-[#020617] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-slate-950 to-slate-950" },
                                        { name: "Cosmic Nebula", value: "bg-[#0c0a09] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-950 to-slate-950" },
                                        { name: "Clean White", value: "bg-white text-slate-900" }
                                    ].map((bgOption) => (
                                        <div
                                            key={bgOption.value}
                                            onClick={() => setProfile({
                                                ...profile,
                                                themeSettings: { ...profile.themeSettings, bgcolor: bgOption.value }
                                            })}
                                            className={`cursor-pointer rounded-xl h-24 p-4 border-2 flex items-center justify-center transition-all ${profile.themeSettings.bgcolor === bgOption.value ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-emerald-300'}`}
                                        >
                                            <div className={`w-full h-full rounded-lg ${bgOption.value.includes('text') ? 'bg-white border' : bgOption.value} shadow-inner flex items-center justify-center`}>
                                                <span className={`font-semibold text-sm ${bgOption.value === 'bg-white text-slate-900' ? 'text-slate-900' : 'text-white'}`}>
                                                    {bgOption.name}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <SaveButton onClick={handleSave} color="pink" />
                            </div>
                        )}

                        {/* --- THEME TAB --- */}
                        {activeTab === 'theme' && (
                            <div className="bg-white rounded-xl p-6 space-y-6">
                                <SectionHeader icon={Layout} title="Portfolio Theme (Layout)" color="text-lime-600" bg="bg-lime-100" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { id: 'theme-minimal', name: "Minimalist", desc: "Clean, focus on typography. Perfect for writers.", accent: 'bg-slate-400' },
                                        { id: 'theme-modern', name: "Modern Cards (Bento)", desc: "Very popular grid-based layout. Dynamic and modern.", accent: 'bg-blue-500' },
                                        { id: 'theme-premium', name: "Premium Portfolio", desc: "Exclusive dark design with animations and glassmorphism.", accent: 'bg-emerald-500' },
                                        { id: 'theme-classic', name: "Classic Resume", desc: "Professional high-end resume style. Perfect for jobs.", accent: 'bg-purple-500' },
                                    ].map((theme) => (
                                        <div
                                            key={theme.id}
                                            onClick={() => setProfile({
                                                ...profile,
                                                themeSettings: { ...profile.themeSettings, themeId: theme.id }
                                            })}
                                            className={`cursor-pointer group relative overflow-hidden rounded-2xl border-2 transition-all p-6 ${profile.themeSettings.themeId === theme.id ? 'border-lime-500 bg-lime-50 ring-4 ring-lime-500/10' : 'border-slate-100 hover:border-lime-300 bg-white shadow-sm'}`}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-10 h-10 rounded-xl ${theme.accent} flex items-center justify-center text-white shadow-lg`}>
                                                    <Layout className="w-6 h-6" />
                                                </div>
                                                {profile.themeSettings.themeId === theme.id && <div className="w-6 h-6 rounded-full bg-lime-500 flex items-center justify-center text-white text-[10px] font-bold">✓</div>}
                                            </div>
                                            <h3 className="font-black text-slate-900 text-lg mb-2">{theme.name}</h3>
                                            <p className="text-slate-500 text-xs leading-relaxed">{theme.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <SaveButton onClick={handleSave} color="emerald" />
                            </div>
                        )}
                    </motion.div>
                </div>

            </main>
        </div>
    );
}

// Reuseable Components for Cleanliness
function SectionHeader({ icon: Icon, title, color, bg }: { icon: any, title: string, color: string, bg: string }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <div className={`w-8 h-8 rounded ${bg} flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
    );
}

function SaveButton({ onClick, color = "emerald" }: { onClick: () => void, color?: string }) {
    // Basic mapping for tailwind colors used above - quick hack, or use full classes
    const bgMap: { [key: string]: string } = {
        emerald: "bg-emerald-600 hover:bg-emerald-700",
        violet: "bg-violet-600 hover:bg-violet-700",
        blue: "bg-blue-600 hover:bg-blue-700",
        pink: "bg-pink-600 hover:bg-pink-700",
        orange: "bg-orange-600 hover:bg-orange-700",
        sky: "bg-sky-600 hover:bg-sky-700",
    }
    const bgClass = bgMap[color] || bgMap["emerald"];

    return (
        <div className="flex justify-end mt-6">
            <Button onClick={onClick} className={`${bgClass} text-white min-w-[120px]`}>
                <Save className="w-4 h-4 mr-2" /> Save
            </Button>
        </div>
    )
}

// Helper icon component
function LinkIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
    )
}
