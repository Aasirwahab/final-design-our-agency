'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolio } from '@/lib/data'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import TiltCard from '@/components/ui/TiltCard'

const categories = ['All', 'Web & Branding', 'Tourism', 'E-commerce', 'SaaS']

export default function WorksPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredProjects = selectedCategory === 'All'
        ? portfolio
        : portfolio.filter(project => project.category === selectedCategory)

    return (
        <div className="pt-24 md:pt-28 lg:pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
            <RevealOnScroll className="mb-16">
                <h1 className="font-display text-5xl md:text-7xl mb-4">Our work</h1>
                <p className="text-text-secondary text-lg max-w-xl mb-12">
                    A selection of projects we&apos;re proud of — from brand-new platforms to complete redesigns.
                </p>

                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                ? 'bg-text-primary text-bg-primary shadow-lg'
                                : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-border/30 border border-border/50'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </RevealOnScroll>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 100, damping: 20 }}
                        >
                            <Link href={`/works/${project.slug}`} className="block group h-full">
                                <TiltCard className="relative w-full aspect-4/3 bg-bg-elevated rounded-xl overflow-hidden mb-5 shadow-md hover:shadow-2xl transition-shadow duration-500">
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} — ${project.category}`}
                                        fill
                                        priority={index < 4}
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
                                    />
                                    {/* Gloss shine on hover */}
                                    <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </TiltCard>

                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-display text-text-primary mb-2 group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h2>
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            {project.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border border-border/60 text-text-secondary bg-bg-elevated/60 whitespace-nowrap"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="text-xs text-text-muted tracking-wider uppercase bg-accent/10 text-accent px-3 py-1 rounded-full">{project.category}</span>
                                        <span className="text-sm text-text-muted border border-border px-3 py-1 rounded-full">
                                            {project.year}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full text-center py-24 text-text-secondary"
                >
                    No projects found for this category.
                </motion.div>
            )}
        </div>
    )
}
