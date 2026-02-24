'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import { inter } from '@/lib/fonts'
import { portfolio } from '@/lib/data'

/* ── Word-by-word reveal ────────────────────────────────── */
function AnimatedHeading() {
    const line1 = "We build websites that"
    const line2Words = [
        { text: "actually ", accent: true },
        { text: "grow ", accent: true },
    ]
    const line3Words = [
        { text: "businesses.", accent: false },
    ]

    const wordVars = {
        hidden: { y: '100%', opacity: 0 },
        show: (i: number) => ({
            y: '0%',
            opacity: 1,
            transition: {
                duration: 0.6,
                delay: 0.1 + i * 0.08,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        }),
    }

    const line1Words = line1.split(' ')

    return (
        <h1 className="font-display text-4xl md:text-5xl lg:text-[4.25rem] leading-[1.05] tracking-tight mb-3 lg:mb-4">
            {/* Line 1 */}
            <span className="block">
                {line1Words.map((word, i) => (
                    <motion.span
                        key={i}
                        className="inline-block mr-[0.28em]"
                        variants={wordVars}
                        initial="hidden"
                        animate="show"
                        custom={i}
                    >
                        {word}
                    </motion.span>
                ))}
            </span>

            {/* Line 2 — accent words */}
            <span className="block mt-2">
                {line2Words.map((w, i) => (
                    <motion.span
                        key={i}
                        className={`inline-block mr-[0.28em] ${w.accent ? 'text-accent' : ''}`}
                        variants={wordVars}
                        initial="hidden"
                        animate="show"
                        custom={line1Words.length + i}
                    >
                        {w.text.trim()}
                    </motion.span>
                ))}
            </span>

            {/* Line 3 */}
            <span className="block mt-2">
                {line3Words.map((w, i) => (
                    <motion.span
                        key={i}
                        className={`inline-block mr-[0.28em] ${w.accent ? 'text-accent' : ''}`}
                        variants={wordVars}
                        initial="hidden"
                        animate="show"
                        custom={line1Words.length + line2Words.length + i}
                    >
                        {w.text.trim()}
                    </motion.span>
                ))}
            </span>
        </h1>
    )
}

/* ── Scrolling Project Montage ──────────────────────────── */
function ProjectMontage() {
    // Duplicate for seamless loop
    const images = portfolio.map(p => ({ src: p.image, title: p.title }))
    const doubled = [...images, ...images]

    return (
        <div className="relative h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">
            {/* Fade edges */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-bg-primary to-transparent z-10 pointer-events-none" />

            {/* Scrolling column */}
            <motion.div
                className="flex flex-col gap-4"
                animate={{ y: [0, -(images.length * (280 + 16))] }}
                transition={{
                    y: {
                        duration: images.length * 4,
                        repeat: Infinity,
                        ease: 'linear',
                    },
                }}
            >
                {doubled.map((img, i) => (
                    <div
                        key={i}
                        className="relative w-full h-[280px] rounded-lg overflow-hidden shrink-0"
                    >
                        <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            priority={i < 4}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-bg-primary/10" />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

/* ── Hero Section ───────────────────────────────────────── */
export default function Hero() {
    const itemVars = {
        hidden: { opacity: 0, y: 30 },
        show: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        }),
    }

    return (
        <section className="relative pt-8 lg:pt-16 pb-12 overflow-hidden">
            {/* Background atmosphere */}
            <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-accent/3 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-accent/2 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">

                {/* Left — Content */}
                <div className="lg:col-span-7 mt-0">
                    <motion.p
                        className={`text-sm tracking-widest uppercase text-text-muted mb-2 ${inter.variable} font-sans`}
                        variants={itemVars}
                        initial="hidden"
                        animate="show"
                        custom={0.1}
                    >
                        Web Development Studio — UK & Sri Lanka
                    </motion.p>

                    <AnimatedHeading />

                    <motion.p
                        className={`text-base text-text-secondary max-w-xl leading-relaxed mb-4 md:mb-5 ${inter.variable} font-sans`}
                        variants={itemVars}
                        initial="hidden"
                        animate="show"
                        custom={1.2}
                    >
                        From high-converting websites and engaging apps to smart automation
                        and data-driven marketing — we turn your vision into measurable growth.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap items-center gap-4 mb-5 lg:mb-6"
                        variants={itemVars}
                        initial="hidden"
                        animate="show"
                        custom={1.4}
                    >
                        <MagneticButton href="/contact" variant="primary">
                            Start a project
                        </MagneticButton>
                        <MagneticButton href="/works" variant="ghost">
                            View our work →
                        </MagneticButton>
                    </motion.div>

                    {/* Trust Signals */}
                    <motion.div
                        className="flex items-center gap-4 pt-4 border-t border-border/60 max-w-md"
                        variants={itemVars}
                        initial="hidden"
                        animate="show"
                        custom={1.6}
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-primary overflow-hidden relative bg-bg-elevated flex items-center justify-center">
                                    <Image src={`/projects/citylife.png`} alt="Client" fill sizes="48px" className="object-cover opacity-80" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm text-text-muted font-medium">
                                Trusted by <span className="text-text-primary">25+</span> industry leaders
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right — Scrolling project montage */}
                <motion.div
                    className="hidden lg:block lg:col-span-5 pl-8"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ProjectMontage />
                </motion.div>

            </div>
        </section>
    )
}
