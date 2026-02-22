'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import RevealOnScroll from './RevealOnScroll'
import { Inconsolata } from 'next/font/google'

const inter = Inconsolata({ subsets: ['latin'], variable: '--font-inter' })

interface LegalSection {
    id: string
    title: string
}

interface LegalContentLayoutProps {
    title: string
    icon: React.ReactNode
    lastUpdated: string
    sections: LegalSection[]
    children: React.ReactNode
}

export default function LegalContentLayout({ title, icon, lastUpdated, sections, children }: LegalContentLayoutProps) {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            // Adjust offset for fixed header
            const offset = 120
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="w-full pt-24 md:pt-28 lg:pt-32 pb-24 bg-bg-light min-h-screen selection:bg-accent/20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <RevealOnScroll className="mb-16 md:mb-24">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="text-accent">{icon}</div>
                        <span className={`text-xs uppercase tracking-widest text-text-secondary ${inter.variable} font-sans`}>Legal</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-display text-text-primary mb-8 tracking-tight">
                        {title}
                    </h1>
                    <div className={`flex items-center gap-2 text-sm text-text-secondary ${inter.variable} font-sans`}>
                        <Clock className="w-4 h-4" />
                        <span>Last Updated: {lastUpdated}</span>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
                    {/* Sticky Table of Contents Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-32">
                            <h3 className={`text-sm font-semibold text-text-primary mb-6 uppercase tracking-widest ${inter.variable} font-sans`}>
                                Table of Contents
                            </h3>
                            <nav className="flex flex-col gap-3 border-l border-border/50 pl-4">
                                {sections.map((section, index) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`text-left text-sm text-text-secondary hover:text-accent transition-colors duration-300 py-1 ${inter.variable} font-sans`}
                                    >
                                        <span className="text-text-primary/40 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                                        {section.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 lg:col-start-4">
                        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-text-primary prose-p:text-text-secondary prose-p:leading-relaxed prose-a:text-accent hover:prose-a:text-accent-hover prose-li:text-text-secondary space-y-16">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
