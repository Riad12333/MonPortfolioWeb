'use client';

import { motion } from 'framer-motion';
import { MousePointer2, Layout, QrCode, Smartphone, Zap, Share2 } from 'lucide-react';

const features = [
    {
        icon: <Layout className="w-6 h-6" />,
        title: "No-Code Design",
        description: "Create exceptional portfolios without writing a single line of code. Intuitive drag & drop interface."
    },
    {
        icon: <MousePointer2 className="w-6 h-6" />,
        title: "Custom Subdomain",
        description: "Get a professional URL like madjid.monportfolioweb.com for your portfolio."
    },
    {
        icon: <QrCode className="w-6 h-6" />,
        title: "Instant QR Code",
        description: "Generate a QR code for your portfolio to share at events or on your CV."
    },
    {
        icon: <Smartphone className="w-6 h-6" />,
        title: "100% Responsive",
        description: "Your site adapts perfectly to all screens: mobile, tablet, and desktop."
    },
    {
        icon: <Share2 className="w-6 h-6" />,
        title: "Easy Sharing",
        description: "Native integration with social networks for maximum visibility."
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Maximum Performance",
        description: "Hosted on Vercel Edge Network for instant loading speeds worldwide."
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Why choose <span className="text-blue-500">MonPortfolioWeb</span>?
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Everything you need to showcase your best work and land the opportunities of your dreams.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
