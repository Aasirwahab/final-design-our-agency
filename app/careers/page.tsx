'use client'

import React from 'react'
import Link from 'next/link'
import { inter } from '@/lib/fonts'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import MagneticButton from '@/components/ui/MagneticButton'

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-bg-primary pt-24 md:pt-32 pb-24">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">

                {/* Back button */}
                <RevealOnScroll className="mb-12">
                    <Link href="/studio" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm font-medium">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180">
                            <path d="M1 7h12M13 7l-6-6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Studio
                    </Link>
                </RevealOnScroll>

                <div className="max-w-3xl mb-24">
                    <RevealOnScroll>
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-text-primary">
                            Careers at <span className="text-accent italic font-light">Webvoxel</span>
                        </h1>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.1}>
                        <p className={`text-xl md:text-2xl text-text-secondary leading-relaxed ${inter.variable} font-sans font-light`}>
                            We&apos;re building a team of passionate creators, engineers, and strategists. While we grow, we look for individuals who push boundaries and redefine excellence.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Empty State Section */}
                <div className="bg-bg-elevated rounded-3xl p-12 md:p-20 border border-border/50 relative overflow-hidden text-center">
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

                    <RevealOnScroll>
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/5 border border-accent/20 mb-8">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.1}>
                        <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-6">
                            No open positions currently
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2}>
                        <p className={`text-lg text-text-secondary max-w-xl mx-auto mb-10 ${inter.variable} font-sans font-light`}>
                            We aren&apos;t actively hiring for any specific roles right now, but we&apos;re always interested in meeting exceptional talent. Feel free to send your portfolio to our team.
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.3}>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <MagneticButton href="mailto:info@webvoxelstudio.uk" variant="primary">
                                Send your Portfolio
                            </MagneticButton>
                            <Link href="/contact" className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors border-b border-border/50 hover:border-text-primary py-1">
                                Reach out for collaboration →
                            </Link>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Why Webvoxel Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <RevealOnScroll className="p-8 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center mb-6 text-accent">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                        </div>
                        <h3 className="text-xl font-display text-text-primary mb-3">Work that matters</h3>
                        <p className="text-text-secondary">We build products that solve real problems for businesses worldwide, focusing on impact and excellence.</p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.1} className="p-8 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center mb-6 text-accent">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" /></svg>
                        </div>
                        <h3 className="text-xl font-display text-text-primary mb-3">Remote First</h3>
                        <p className="text-text-secondary">Our team works from across the globe, valuing flexibility and outcomes over physical office presence.</p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2} className="p-8 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center mb-6 text-accent">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        </div>
                        <h3 className="text-xl font-display text-text-primary mb-3">Modern Stack</h3>
                        <p className="text-text-secondary">We use the latest technologies like Next.js, Framer Motion, and AI to build future-proof solutions.</p>
                    </RevealOnScroll>
                </div>
            </div>
        </main>
    )
}
