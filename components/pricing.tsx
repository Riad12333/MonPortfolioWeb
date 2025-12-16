'use client';

import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "Monthly",
        price: "$1",
        period: "/first month",
        description: "$10/month thereafter",
        features: [
            "Unlimited Portfolio",
            "Hosting Included",
            "Custom Subdomain",
            "Standard Support"
        ],
        highlight: false,
        buttonVariant: "outline" as const
    },
    {
        name: "4-Month Plan",
        price: "$30",
        period: "/4 months",
        description: "Great mid-term value",
        features: [
            "All Monthly Features",
            "Priority Support",
            "Basic Analytics",
            "Verified Badge"
        ],
        highlight: false,
        buttonVariant: "outline" as const
    },
    {
        name: "Annual Plan",
        price: "$60",
        period: "/year",
        description: "Best Quality/Price Ratio",
        features: [
            "2 Months Free",
            "Free Domain Name (.com)",
            "Advanced Analytics",
            "VIP Support 24/7",
            "Remove Branding"
        ],
        highlight: true,
        buttonVariant: "gradient" as const,
        badge: "Recommended"
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-slate-950 relative">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Simple and <span className="text-violet-500">transparent</span> pricing
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Choose the perfect plan for your creative portfolio. No hidden fees.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col p-8 rounded-2xl border ${plan.highlight
                                    ? 'bg-slate-900/80 border-violet-500 shadow-2xl shadow-violet-500/10'
                                    : 'bg-slate-900/40 border-slate-800'
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white text-xs font-bold uppercase tracking-wide">
                                    {plan.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-slate-500">{plan.period}</span>
                                </div>
                                <p className="text-sm text-slate-400">{plan.description}</p>
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                                        <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-violet-400' : 'text-blue-400'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button variant={plan.buttonVariant} className="w-full">
                                Choose this plan
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
