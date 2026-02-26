'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { motion } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import MagneticButton from '../ui/MagneticButton'

export default function WhyUs() {
    const features = useQuery(api.settings.listFeatures) || []

    return (
        <section className="py-24 md:py-32 bg-bg-primary overflow-hidden border-y border-border">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-0 lg:mb-0">
                    <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
                        <RevealOnScroll>
                            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 md:mb-8">
                                What sets<br />us apart
                            </h2>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.1}>
                            <p className="text-xl text-text-secondary leading-relaxed max-w-md">
                                We combine technical excellence with creative innovation to deliver solutions that drive real business results.
                            </p>
                        </RevealOnScroll>
                    </div>

                    {/* ── DESKTOP: Feature List ── */}
                    <div className="hidden lg:block lg:col-span-7">
                        <div className="flex flex-col gap-12 sm:gap-16">
                            {features.map((feature: any, index: number) => (
                                <RevealOnScroll key={feature._id} delay={0.1 + (index * 0.1)}>
                                    <div className="flex flex-col sm:flex-row gap-6 relative group">
                                        <div className="shrink-0 mt-2">
                                            <div className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center text-text-muted group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5 transition-all duration-500">
                                                <span className="font-display text-xl">0{index + 1}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-display text-text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                            <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── MOBILE: Animated Feature Cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 lg:hidden">
                    {features.map((feature: any, index: number) => (
                        <motion.div
                            key={feature._id}
                            className="relative flex flex-col gap-4 rounded-2xl border border-border bg-bg-elevated/30 p-5 overflow-hidden"
                            initial={{ opacity: 0, y: 50, scale: 0.96 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Animated accent left border */}
                            <motion.div
                                className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent origin-top rounded-full"
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.1 + 0.25, ease: [0.16, 1, 0.3, 1] }}
                            />

                            {/* Shimmer gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {/* Glowing Number Badge */}
                            <motion.div
                                className="w-11 h-11 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center shrink-0"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="font-display text-base text-accent">
                                    0{index + 1}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                                className="font-display text-xl text-text-primary leading-tight"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {feature.title}
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                                className="text-sm text-text-secondary leading-relaxed"
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {feature.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>

                {/* Sub-section CTA */}
                <RevealOnScroll delay={0.2} className="mt-16 md:mt-20 pt-12 border-t border-border/50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 bg-bg-elevated/30 rounded-2xl p-8 md:p-12 border border-border/50 shadow-sm relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

                        <div className="relative z-10 text-center sm:text-left">
                            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-text-primary mb-3">Ready to transform your digital presence?</h3>
                            <p className="text-text-secondary text-lg">Get a free consultation and project estimate.</p>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <MagneticButton href="/contact" variant="primary">
                                Let&apos;s talk →
                            </MagneticButton>
                        </div>
                    </div>
                </RevealOnScroll>

            </div>
        </section>
    )
}
