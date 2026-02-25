'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolio } from '@/lib/data'
import RevealOnScroll from '../ui/RevealOnScroll'
import TiltCard from '../ui/TiltCard'

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function FeaturedWork() {
    const featuredProjects = portfolio.slice(0, 4)
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)

    const prev = useCallback(() => {
        setDirection(-1)
        setCurrent((i) => (i - 1 + featuredProjects.length) % featuredProjects.length)
    }, [featuredProjects.length])

    const next = useCallback(() => {
        setDirection(1)
        setCurrent((i) => (i + 1) % featuredProjects.length)
    }, [featuredProjects.length])

    const project = featuredProjects[current]

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '30%' : '-30%',
            opacity: 0,
            scale: 0.92,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? '-30%' : '30%',
            opacity: 0,
            scale: 0.92,
        }),
    }

    return (
        <section className="py-24 md:py-32 bg-bg-primary">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Header */}
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                            Featured<br />work
                        </h2>
                        <Link
                            href="/works"
                            className="group inline-flex items-center gap-2 text-text-primary hover:text-accent font-medium transition-colors"
                        >
                            All projects
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </RevealOnScroll>

                {/* Carousel container */}
                <div className="relative overflow-hidden pt-4 pb-12">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="w-full"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.8}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    next();
                                } else if (swipe > swipeConfidenceThreshold) {
                                    prev();
                                }
                            }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                                {/* Image — animates independently */}
                                <motion.div
                                    className="lg:col-span-7 relative group block"
                                    initial={{ opacity: 0, x: direction > 0 ? 60 : -60, scale: 0.96 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: direction > 0 ? -60 : 60, scale: 0.96 }}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link href={project.url} className="block w-full">
                                        <TiltCard className="relative w-full aspect-[4/3] sm:aspect-16/10 lg:aspect-[4/3] bg-bg-elevated rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                            <Image
                                                src={project.image}
                                                alt={`${project.title} — ${project.category}`}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                priority
                                            />
                                            {/* Gloss overlay */}
                                            <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        </TiltCard>
                                    </Link>
                                </motion.div>

                                {/* Info panel — staggered children animate in */}
                                <div className="lg:col-span-5 flex flex-col justify-center overflow-hidden">
                                    <motion.p
                                        className="text-sm font-semibold tracking-widest uppercase text-accent mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {project.category}
                                    </motion.p>

                                    <motion.h3
                                        className="text-3xl sm:text-4xl md:text-5xl font-display text-text-primary mb-6"
                                        initial={{ opacity: 0, y: 25 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {project.title}
                                    </motion.h3>

                                    <motion.p
                                        className="text-text-secondary text-lg leading-relaxed mb-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        A {project.category.toLowerCase()} project crafted with modern tools and attention to detail.
                                    </motion.p>

                                    <motion.div
                                        className="flex flex-wrap gap-3 mb-10"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-sm px-4 py-1.5 rounded-full border border-border text-text-muted bg-white">
                                                {tag}
                                            </span>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 mb-12"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <Link
                                            href={`/works/${project.slug}`}
                                            className="inline-flex items-center justify-center gap-2 bg-text-primary text-bg-primary hover:bg-accent hover:text-white px-6 py-4 rounded-full transition-all duration-300 font-medium group text-base shadow-sm hover:shadow-md"
                                        >
                                            Read case study
                                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-1">
                                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </Link>

                                        {project.url !== "#" && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 border border-border text-text-primary hover:border-accent hover:text-accent px-6 py-4 rounded-full transition-all duration-300 font-medium group text-base"
                                            >
                                                Visit live site
                                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </a>
                                        )}
                                    </motion.div>

                                    {/* Navigation Controls (Arrows + Dots) */}
                                    <motion.div
                                        className="flex items-center gap-6 border-t border-border pt-8 mt-auto"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.3 }}
                                    >
                                        {/* Arrows */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={prev}
                                                aria-label="Previous project"
                                                className="w-12 h-12 rounded-full border border-border bg-white shadow-sm hover:shadow-md flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-accent/50"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transform group-hover:-translate-x-0.5 transition-transform">
                                                    <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={next}
                                                aria-label="Next project"
                                                className="w-12 h-12 rounded-full border border-border bg-white shadow-sm hover:shadow-md flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-accent/50"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transform group-hover:translate-x-0.5 transition-transform">
                                                    <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="w-px h-8 bg-border" />

                                        {/* Dots */}
                                        <div className="flex items-center gap-3">
                                            {featuredProjects.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setDirection(i > current ? 1 : -1)
                                                        setCurrent(i)
                                                    }}
                                                    aria-label={`Go to project ${i + 1}`}
                                                    className="group/dot p-2 focus:outline-none"
                                                >
                                                    <span className={`block transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-border group-hover/dot:bg-border-light group-hover/dot:scale-125'}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
