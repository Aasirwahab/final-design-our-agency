'use client'

import React from 'react'
import MagneticButton from '../../ui/MagneticButton'
import RevealOnScroll from '../../ui/RevealOnScroll'
import { inter } from '@/lib/fonts'

export default function CareersBanner() {
    return (
        <section className="py-24 px-6 md:px-12 w-full relative overflow-hidden bg-bg-dark text-bg-primary">
            {/* Subtle background glow to keep it attractive but not overly animated */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center justify-center text-center relative z-10">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className={`text-xs tracking-[0.2em] font-medium uppercase text-white/70 ${inter.variable} font-sans`}>
                            Join The Team
                        </span>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl mx-auto">
                        We're always looking for <span className="text-accent italic font-light">visionary talent.</span>
                    </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                    <p className={`text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 ${inter.variable} font-sans font-light`}>
                        Whether you're a strategic thinker, a creative designer, or a brilliant engineer, there's a place for you at Webvoxel. Help us build the next generation of digital experiences.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.3}>
                    <MagneticButton href="mailto:hello@webvoxel.com" variant="primary">
                        View Open Positions
                    </MagneticButton>
                </RevealOnScroll>
            </div>
        </section>
    )
}
