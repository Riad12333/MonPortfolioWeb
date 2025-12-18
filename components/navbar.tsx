'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { UserMenu } from './layout/user-menu';
import { Logo } from './logo';
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { data: session, status } = useSession();

    const isLoggedIn = status === 'authenticated';
    const userName = session?.user?.name || "User";
    const userImage = session?.user?.image;

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
        setUserMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/50">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
                    <Logo className="w-10 h-10" />
                    <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
                        Mon<span className="text-blue-500">Portfolio</span>Web
                    </span>
                </Link>

                {/* Desktop Links - Always visible unless specified otherwise */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</Link>
                    <Link href="#showcase" className="text-sm text-slate-300 hover:text-white transition-colors">Showcase</Link>
                    <Link href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</Link>
                </div>

                {/* Right Side Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            {/* Profile Pill */}
                            <div
                                className="flex items-center gap-3 cursor-pointer"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            >
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                                    {userImage ? (
                                        <Image
                                            src={userImage}
                                            alt={userName}
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <UserIcon className="w-6 h-6 text-slate-400" />
                                    )}
                                </div>
                                <span className="text-white font-medium max-w-[150px] truncate hidden lg:block">{userName}</span>
                            </div>

                            {/* Menu Trigger */}
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className={`p-2 rounded-lg transition-colors ${userMenuOpen ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            <UserMenu
                                isOpen={userMenuOpen}
                                onClose={() => setUserMenuOpen(false)}
                                onSignOut={handleSignOut}
                                userName={userName}
                            />
                        </div>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <Button variant="ghost" size="sm">Sign In</Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button variant="gradient" size="sm">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle (only show if NOT logged in, or handle differently) */}
                {!isLoggedIn && (
                    <button
                        className="md:hidden text-slate-300 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                )}

                {/* Mobile Logged In View */}
                {isLoggedIn && (
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="p-2 bg-slate-800 rounded-lg text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <UserMenu
                            isOpen={userMenuOpen}
                            onClose={() => setUserMenuOpen(false)}
                            onSignOut={handleSignOut}
                            userName={userName}
                        />
                    </div>
                )}
            </div>

            {/* Mobile Menu (Public) */}
            {mobileMenuOpen && !isLoggedIn && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-20 left-0 right-0 bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-xl"
                >
                    <Link href="#features" className="text-slate-300 hover:text-white py-2">Features</Link>
                    <Link href="#showcase" className="text-slate-300 hover:text-white py-2">Showcase</Link>
                    <Link href="#pricing" className="text-slate-300 hover:text-white py-2">Pricing</Link>
                    <div className="flex flex-col gap-3 mt-4">
                        <Link href="/sign-in" className="w-full">
                            <Button variant="secondary" className="w-full">Sign In</Button>
                        </Link>
                        <Link href="/sign-up" className="w-full">
                            <Button variant="gradient" className="w-full">Get Started</Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
