'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { inter } from '@/lib/fonts'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import MagneticButton from '@/components/ui/MagneticButton'
import TiltCard from '@/components/ui/TiltCard'

const valueProps = [
    {
        title: "Work that matters",
        description: "We build products that solve real problems for businesses worldwide, focusing on impact and excellence.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
            </svg>
        )
    },
    {
        title: "Remote First",
        description: "Our team works from across the globe, valuing flexibility and outcomes over physical office presence.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
            </svg>
        )
    },
    {
        title: "Modern Stack",
        description: "We use the latest technologies like Next.js, Framer Motion, and AI to build future-proof solutions.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        )
    }
]

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-bg-primary pt-24 md:pt-32 pb-24 overflow-hidden relative">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/3 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">

                {/* Back button */}
                <RevealOnScroll className="mb-12">
                    <Link href="/studio" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm font-medium group">
                        <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center group-hover:bg-bg-elevated transition-colors">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180 transition-transform group-hover:-translate-x-0.5">
                                <path d="M1 7h12M13 7l-6-6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        Back to Studio
                    </Link>
                </RevealOnScroll>

                <div className="max-w-4xl mb-24">
                    <RevealOnScroll>
                        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[1] mb-8 text-text-primary tracking-tight">
                            Work with <span className="text-accent italic font-light relative">
                                Purpose
                                <svg width="100%" height="12" viewBox="0 0 300 12" fill="none" className="absolute -bottom-2 left-0 text-accent/30">
                                    <path d="M2.5 9.5C50 3.5 150 1.5 297.5 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.1}>
                        <p className={`text-xl md:text-2xl text-text-secondary leading-relaxed ${inter.variable} font-sans font-light max-w-2xl`}>
                            Help us bridge the gap between imagination and execution. We&apos;re building a world-class team to design the future of digital interactions.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Empty State Section - Redesigned as a Premium Card */}
                <RevealOnScroll delay={0.2}>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-accent/5 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-bg-elevated/80 backdrop-blur-xl rounded-3xl p-12 md:p-20 border border-white/5 overflow-hidden flex flex-col items-center text-center shadow-2xl">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                                    <circle cx="80" cy="80" r="50" stroke="currentColor" strokeWidth="0.5" />
                                    <circle cx="80" cy="80" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                                </svg>
                            </div>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", damping: 15 }}
                                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 flex items-center justify-center mb-10 shadow-inner"
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>

                            <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-6 tracking-tight">
                                Opportunities are <span className="italic font-light">brewing.</span>
                            </h2>

                            <p className={`text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-12 ${inter.variable} font-sans font-light leading-relaxed`}>
                                While our current roles are filled by amazing humans, we don&apos;t want to miss out on meeting you. If you have a unique perspective on design or engineering, our inbox is open.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
                                <MagneticButton href="mailto:info@webvoxelstudio.uk" variant="primary">
                                    Submit Portfolio
                                </MagneticButton>
                                <Link
                                    href="/contact"
                                    className="text-sm font-medium text-text-primary hover:text-accent transition-all flex items-center gap-2 group/link"
                                >
                                    Reach out for collaboration
                                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover/link:translate-x-1">
                                        <path d="M1 7h12M13 7l-6-6M13 7l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Cultural Values - Redesigned with TiltCards */}
                <div className="mt-40">
                    <RevealOnScroll className="mb-16">
                        <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-4 text-center">Why build with us?</h2>
                        <div className="w-20 h-1 bg-accent mx-auto rounded-full opacity-50" />
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {valueProps.map((prop, index) => (
                            <RevealOnScroll key={index} delay={0.1 * index}>
                                <TiltCard
                                    className="h-full bg-bg-elevated/40 border border-border/40 hover:border-accent/20 p-10 rounded-3xl transition-colors group shadow-lg"
                                    tiltMax={10}
                                    scaleOnHover={1.03}
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-bg-primary border border-border/50 flex items-center justify-center mb-8 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                        {prop.icon}
                                    </div>
                                    <h3 className="text-2xl font-display text-text-primary mb-4">{prop.title}</h3>
                                    <p className="text-text-secondary leading-relaxed font-light">{prop.description}</p>

                                    {/* Hover hint */}
                                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">
                                        Learn More
                                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                            <path d="M1 7h12M13 7l-6-6M13 7l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </TiltCard>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <RevealOnScroll delay={0.4} className="mt-40 text-center">
                    <p className="text-text-muted text-sm uppercase tracking-[0.3em] mb-4">The Future is Here</p>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />
                    <p className={`text-text-secondary max-w-lg mx-auto ${inter.variable} font-sans font-light italic`}>
                        &ldquo;Modern problems require world-class solutions. We&apos;re building the infrastructure for the next generation of digital giants.&rdquo;
                    </p>
                </RevealOnScroll>
            </div>
        </main>
    )
}
