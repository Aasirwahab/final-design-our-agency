'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '@/lib/data'
import RevealOnScroll from '../ui/RevealOnScroll'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0) // First one open by default

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-24 md:py-32 bg-bg-primary relative overflow-hidden" id="faq">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Sticky Header Column */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-32">
                            <RevealOnScroll>
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
                                    Got questions?<br />
                                    <span className="text-text-muted">We have answers.</span>
                                </h2>
                                <p className="text-xl text-text-secondary leading-relaxed mb-8">
                                    Before we jump on a strategy call, here are some of the most common questions our clients ask.
                                </p>
                            </RevealOnScroll>
                        </div>
                    </div>

                    {/* Accordion Column */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        {faqs.map((faq, index) => (
                            <RevealOnScroll key={index} delay={index * 0.1}>
                                <div
                                    className={`border ${openIndex === index ? 'border-accent/40 bg-accent/5' : 'border-border bg-bg-elevated/30 hover:bg-bg-elevated/80'} rounded-2xl overflow-hidden transition-colors duration-300`}
                                >
                                    {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props, jsx-a11y/aria-proptypes */}
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                                        {...{ 'aria-expanded': openIndex === index }}
                                    >
                                        <h3 className="text-lg md:text-xl font-medium text-text-primary pr-8 font-display">
                                            {faq.question}
                                        </h3>
                                        <div className="shrink-0 relative w-6 h-6 flex items-center justify-center text-accent">
                                            <div className="absolute w-full h-[2px] bg-current rounded-full" />
                                            <motion.div
                                                initial={false}
                                                animate={{ rotate: openIndex === index ? 0 : 90 }}
                                                className="absolute w-full h-[2px] bg-current rounded-full"
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            />
                                        </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 md:p-8 pt-0 text-text-secondary leading-relaxed md:text-lg border-t border-border/50">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
