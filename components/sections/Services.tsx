'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '@/lib/data'
import RevealOnScroll from '../ui/RevealOnScroll'

export default function Services() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    return (
        <section className="py-24 md:py-32 bg-bg-secondary">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                            Expertise &<br />capabilities
                        </h2>
                        <p className="text-text-secondary max-w-sm text-lg">
                            Comprehensive digital solutions tailored to your unique business challenges.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="border-t border-border">
                    {services.map((service, index) => {
                        const isExpanded = expandedIndex === index

                        return (
                            <RevealOnScroll key={service.id} delay={index * 0.05} y={20}>
                                <div
                                    className="group border-b border-border transition-colors duration-300"
                                    onMouseEnter={() => setExpandedIndex(index)}
                                    onMouseLeave={() => setExpandedIndex(null)}
                                >
                                    {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props, jsx-a11y/aria-proptypes */}
                                    <button
                                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                        className={`w-full relative z-10 text-left py-6 lg:py-10 flex items-center justify-between gap-4 transition-colors duration-500 cursor-pointer ${isExpanded ? 'bg-bg-elevated/30 lg:px-6 lg:-mx-6 rounded-lg' : ''}`}
                                        {...{ 'aria-expanded': isExpanded }}
                                    >
                                        <div className="flex items-center gap-4 lg:gap-16 min-w-0">
                                            <span className="font-display text-lg lg:text-2xl text-text-muted opacity-50 shrink-0">{service.id}</span>
                                            <h3 className={`font-display text-2xl lg:text-4xl transition-colors duration-300 truncate ${isExpanded ? 'text-accent' : 'text-text-primary'}`}>
                                                {service.title}
                                            </h3>
                                        </div>
                                        <div className="shrink-0 p-1 lg:p-2 cursor-pointer">
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 45 : 0 }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                                                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:border-accent group-hover:bg-accent/5 group-hover:text-accent transition-colors"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="1.5" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-8 lg:pb-12 pt-2 pl-0 lg:pl-26 flex flex-col lg:flex-row gap-6 lg:gap-12">
                                                    <div className="flex flex-col gap-4 lg:gap-6">
                                                        <p className="text-base lg:text-xl text-text-secondary leading-relaxed max-w-2xl">
                                                            {service.description}
                                                        </p>
                                                        <Link
                                                            href="/works"
                                                            className="text-sm lg:text-base text-text-primary hover:text-accent font-medium inline-flex items-center gap-2 transition-colors w-fit group"
                                                        >
                                                            <span className="border-b border-border group-hover:border-accent transition-colors pb-1">
                                                                View {service.title.toLowerCase()} work
                                                            </span>
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                                                                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                    <div className="hidden lg:block flex-1 mt-4 lg:mt-0">
                                                        <div className="w-full h-40 rounded-lg overflow-hidden relative">
                                                            <Image
                                                                src={service.image}
                                                                alt={service.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="30vw"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </RevealOnScroll>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
