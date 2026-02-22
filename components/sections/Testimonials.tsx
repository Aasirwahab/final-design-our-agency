'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/lib/data'
import RevealOnScroll from '../ui/RevealOnScroll'

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

    const goTo = useCallback((index: number) => {
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }, [currentIndex])

    const prev = useCallback(() => {
        setDirection(-1)
        setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
    }, [])

    const next = useCallback(() => {
        setDirection(1)
        setCurrentIndex((i) => (i + 1) % testimonials.length)
    }, [])

    useEffect(() => {
        if (isHovered) return
        const timer = setInterval(next, 6000)
        return () => clearInterval(timer)
    }, [isHovered, next])

    const slideVariants = {
        enter: (dir: number) => ({
            opacity: 0,
            x: dir > 0 ? 60 : -60,
            scale: 0.96,
            filter: 'blur(4px)',
        }),
        center: {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
        },
        exit: (dir: number) => ({
            opacity: 0,
            x: dir > 0 ? -60 : 60,
            scale: 0.96,
            filter: 'blur(4px)',
        }),
    }

    return (
        <section className="py-32 md:py-48 bg-bg-secondary overflow-hidden">
            <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12">
                <RevealOnScroll>
                    <div
                        className="relative flex flex-col items-center text-center"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Quote content */}
                        <div className="min-h-[400px] md:min-h-[300px] w-full flex items-center justify-center mb-12 px-4 md:px-12">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-center justify-center font-display text-2xl md:text-3xl lg:text-4xl leading-snug text-text-primary"
                                >
                                    <span className="relative">
                                        &ldquo;{testimonials[currentIndex].quote}&rdquo;
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Author info */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center"
                            >
                                <div className="flex items-center gap-1 mb-8">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="w-16 h-16 rounded-full bg-bg-elevated mb-4 overflow-hidden relative flex items-center justify-center border border-border">
                                    <span className="text-text-muted font-display text-xl">
                                        {testimonials[currentIndex].author.charAt(0)}
                                    </span>
                                </div>
                                <h4 className="text-text-primary font-medium text-lg mb-1">
                                    {testimonials[currentIndex].author}
                                </h4>
                                <p className="text-text-muted text-sm delay-100">
                                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between w-full max-w-[320px] mt-12 mx-auto">
                            {/* ← Left Arrow */}
                            <button
                                onClick={prev}
                                aria-label="Previous testimonial"
                                className="w-12 h-12 rounded-full border border-border bg-transparent flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-all duration-300 group hover:bg-bg-elevated"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transform group-hover:-translate-x-1 transition-transform">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Dot indicators */}
                            <div className="flex items-center gap-3">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i)}
                                        aria-label={`Go to testimonial ${i + 1}`}
                                        className="group/dot py-2"
                                    >
                                        <span className={`block h-[2px] transition-all duration-300 ${i === currentIndex ? 'w-8 bg-text-primary' : 'w-4 bg-border group-hover/dot:bg-text-muted group-hover/dot:w-6'}`} />
                                    </button>
                                ))}
                            </div>

                            {/* → Right Arrow */}
                            <button
                                onClick={next}
                                aria-label="Next testimonial"
                                className="w-12 h-12 rounded-full border border-border bg-transparent flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-all duration-300 group hover:bg-bg-elevated"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    )
}
