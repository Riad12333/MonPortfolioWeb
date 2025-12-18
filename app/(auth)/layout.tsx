'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 relative flex flex-col items-center justify-center p-4">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-900/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Navigation Home */}
            <div className="absolute top-8 left-8 z-20">
                <Link href="/">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>

            {/* Logo */}
            <div className="mb-8 relative z-20">
                <Link href="/" className="flex items-center gap-3">
                    <Logo className="w-12 h-12" />
                </Link>
            </div>

            {/* Content Container (Card styling removed to allow page-specific customization) */}
            <div className="w-full max-w-md relative z-10">
                {children}
            </div>

            {/* Footer */}
            <p className="mt-8 text-slate-500 text-sm relative z-20">
                © 2025 MonPortfolioWeb.
            </p>
        </div>
    );
}
