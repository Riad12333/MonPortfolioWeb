'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Globe, CreditCard, MessageSquare, LogOut } from 'lucide-react';
import Link from 'next/link';

interface UserMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onSignOut: () => void;
    userName: string;
}

export function UserMenu({ isOpen, onClose, onSignOut, userName }: UserMenuProps) {
    const menuItems = [
        { icon: User, label: "Update Profile", href: "/profile" },
        { icon: Briefcase, label: "Business Links", href: "/links" },
        { icon: Globe, label: "Custom Domain", href: "/domain" },
        { icon: CreditCard, label: "Subscriptions", href: "/billing" },
        { icon: MessageSquare, label: "Support", href: "/support" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={onClose}
                    />

                    {/* Menu */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 right-4 md:right-20 z-50 w-72 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        <div className="p-2 space-y-1">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors group"
                                >
                                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            ))}

                            <button
                                onClick={onSignOut}
                                className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-white bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 rounded-lg transition-all group"
                            >
                                <LogOut className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
