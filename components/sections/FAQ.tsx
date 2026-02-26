'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import RevealOnScroll from '../ui/RevealOnScroll'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const faqs = useQuery(api.faqs.list) || []

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-24 md:py-40 bg-bg-secondary relative overflow-hidden" id="faq">
            {/* Subtle background vibe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/2 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[900px] mx-auto px-6 md:px-12 relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-16 md:mb-24 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/10 text-accent text-xs font-semibold tracking-wider uppercase">
                            Common Questions
                        </div>
                        <h2 className="font-display text-5xl md:text-6xl text-text-primary leading-tight">
                            Got questions?<br />
                            <span className="text-text-muted italic">We have answers.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                            Everything you need to know about our process, pricing, and how we work.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <RevealOnScroll key={index} delay={index * 0.05}>
                                <div
                                    className={`group transition-all duration-500 rounded-2xl ${isOpen
                                        ? 'bg-bg-elevated/40 border border-accent/20'
                                        : 'bg-transparent border border-border/40 hover:border-accent/30'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                                        {...{ 'aria-expanded': isOpen }}
                                    >
                                        <h3 className={`text-lg md:text-xl font-display transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-text-primary group-hover:text-accent/80'
                                            }`}>
                                            {faq.question}
                                        </h3>
                                        <div className={`shrink-0 ml-4 transition-transform duration-500 ${isOpen ? 'rotate-180 text-accent' : 'text-text-muted'}`}>
                                            <ChevronDown size={24} strokeWidth={1.5} />
                                        </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 md:px-8 pb-8 text-text-secondary/90 leading-relaxed md:text-lg font-light border-t border-border/20 pt-6">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </RevealOnScroll>
                        )
                    })}
                </div>

                <RevealOnScroll delay={0.4}>
                    <div className="mt-16 text-center">
                        <p className="text-text-muted text-sm">
                            Still have questions? <a href="/contact" className="text-accent border-b border-accent/20 hover:border-accent transition-colors font-medium">Contact us and we&apos;ll get back to you.</a>
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    )
}
