'use client'

import { processSteps } from '@/lib/data'
import RevealOnScroll from '../ui/RevealOnScroll'
import { motion } from 'framer-motion'

export default function OurProcess() {
    return (
        <section className="py-24 md:py-32 bg-bg-elevated relative overflow-hidden" id="process">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-accent/3 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                <RevealOnScroll>
                    <div className="max-w-3xl mb-16 md:mb-24">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
                            How we deliver <span className="text-text-muted">results.</span>
                        </h2>
                        <p className="text-xl text-text-secondary leading-relaxed">
                            We don&apos;t just wing it. Our methodology is battle-tested to ensure every project stays on track, on budget, and delivers maximum ROI.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
                    {/* Horizontal connecting line out on desktop */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:block absolute top-[28px] left-[50px] right-20 h-[1px] bg-border z-0 origin-left"
                    />

                    {processSteps.map((step, index) => (
                        <RevealOnScroll key={step.id} delay={index * 0.15} className="relative z-10">
                            <div className="flex flex-col h-full group cursor-default">
                                <div className="w-14 h-14 rounded-full bg-bg-primary text-text-primary border border-border flex items-center justify-center font-display text-xl mb-6 shadow-sm relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-bg-primary group-hover:border-accent">
                                    {step.id}
                                </div>
                                <h3 className="text-2xl font-display text-text-primary mb-4 transition-colors duration-300 group-hover:text-accent">
                                    {step.title}
                                </h3>
                                <p className="text-text-secondary leading-relaxed flex-grow">
                                    {step.description}
                                </p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    )
}
