'use client'

import { processSteps } from '@/lib/data'
import RevealOnScroll from '../ui/RevealOnScroll'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Search, PenTool, Code2, Rocket } from 'lucide-react'

const icons = [Search, PenTool, Code2, Rocket]

export default function OurProcess() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <section className="py-24 md:py-40 bg-bg-primary relative overflow-hidden" id="process" ref={containerRef}>
            {/* Ambient background rays */}
            <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] bg-accent/3 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left: Sticky Header */}
                    <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
                        <RevealOnScroll>
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
                                    Our Methodology
                                </div>
                                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-text-primary leading-[1.1]">
                                    How we deliver <span className="text-text-muted italic">results.</span>
                                </h2>
                                <p className="text-xl text-text-secondary leading-relaxed max-w-md">
                                    A systematic, high-performance approach to turning complex challenges into seamless digital experiences.
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right: Vertical Timeline */}
                    <div className="lg:col-span-7 relative">
                        {/* Vertical Progress Line */}
                        <div className="absolute left-6 md:left-7 lg:left-8 top-8 bottom-8 w-[2px] bg-border/40">
                            <motion.div
                                className="absolute top-0 left-0 w-full bg-accent origin-top h-full"
                                style={{ scaleY }}
                            />
                        </div>

                        <div className="space-y-12 md:space-y-24">
                            {processSteps.map((step, index) => {
                                const Icon = icons[index] || icons[0]
                                return (
                                    <div key={step.id} className="relative pl-12 md:pl-20 group">

                                        {/* Timeline Node (Mobile & Desktop) */}
                                        <div className="absolute left-[-2px] md:left-0 top-0 w-12 md:w-16 h-12 md:h-16 flex items-center justify-center">
                                            <motion.div
                                                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-bg-elevated border border-border flex items-center justify-center relative z-20 group-hover:border-accent group-hover:bg-accent group-hover:text-bg-primary transition-all duration-500 overflow-hidden"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                            >
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <Icon size={16} className="md:size-[20px] mb-0.5 group-hover:scale-110 transition-transform duration-500" />
                                                    <span className="text-[8px] md:text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-3 md:-bottom-4">{step.id}</span>
                                                </div>
                                                {/* Node pulse effect */}
                                                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                                            </motion.div>
                                        </div>

                                        <RevealOnScroll>
                                            <div className="relative p-7 md:p-10 rounded-2xl md:rounded-3xl border border-border/50 bg-bg-elevated/20 hover:bg-bg-elevated/40 backdrop-blur-sm transition-all duration-500 group-hover:border-accent/30 group-hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-accent/5">
                                                <div className="absolute top-6 right-8 text-4xl md:text-6xl font-display text-text-muted/5 group-hover:text-accent/10 transition-colors duration-500 pointer-events-none block">
                                                    {step.id}
                                                </div>

                                                <h3 className="text-xl md:text-3xl font-display text-text-primary mb-4 md:mb-6 group-hover:text-accent transition-colors duration-300">
                                                    {step.title}
                                                </h3>

                                                <p className="text-base md:text-xl text-text-secondary leading-relaxed font-light">
                                                    {step.description}
                                                </p>

                                                {/* Bottom Decoration */}
                                                <div className="mt-6 md:mt-8 h-[1px] w-12 bg-border group-hover:w-full group-hover:bg-accent/40 transition-all duration-700" />
                                            </div>
                                        </RevealOnScroll>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
