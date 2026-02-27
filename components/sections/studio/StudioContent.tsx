'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import RevealOnScroll from '../../ui/RevealOnScroll'
import AnimatedCounter from '../../ui/AnimatedCounter'
import MagneticButton from '../../ui/MagneticButton'
import { inter } from '@/lib/fonts'
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function StudioContent() {
    // Scroll progress for the entire page
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 50 })

    // Professional inner parallax for the hero image
    const heroImgParallax = useTransform(smoothProgress, [0, 0.5], ["-5%", "5%"])
    const giantTextY = useTransform(smoothProgress, [0, 1], [0, 600])

    const dbTeamMembers = useQuery(api.teamMembers.list);
    const dbStudioValues = useQuery(api.studioValues.list);
    // Fallbacks while loading
    const teamMembers = dbTeamMembers ?? [];
    const values = dbStudioValues ?? [];

    return (
        <div className="relative w-full bg-bg-primary text-text-primary" ref={containerRef}>

            {/* PROFESSIONAL HERO SECTION */}
            <section className="relative w-full flex flex-col items-center justify-start pt-12 md:pt-16 lg:pt-20 pb-16 overflow-hidden">
                {/* Refined subtle background glows */}
                <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[30%] bg-text-secondary/5 blur-[100px] rounded-full pointer-events-none" />

                {/* Huge background text */}
                <motion.div
                    className="absolute top-1/4 z-0 w-full text-center pointer-events-none select-none"
                    style={{ y: giantTextY }}
                >
                    <h1 className="font-display text-[15vw] leading-none text-border/20 whitespace-nowrap opacity-60">
                        WEBVOXEL
                    </h1>
                </motion.div>

                {/* Hero Content */}
                <div className="max-w-[1400px] w-full px-6 flex flex-col items-center justify-start z-10 text-center relative pointer-events-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-bg-primary/80 backdrop-blur-sm shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <p className={`text-xs tracking-[0.2em] font-medium uppercase text-text-secondary ${inter.variable} font-sans`}>
                                The Studio
                            </p>
                        </div>
                    </motion.div>

                    <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                        <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[1.05] tracking-tight mb-8 text-text-primary">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block"
                            >
                                We Engineer
                            </motion.span>
                            <br />
                            <motion.span
                                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block"
                            >
                                <span className="text-accent italic font-light">Digital&nbsp;</span>Legacies.
                            </motion.span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className={`text-lg md:text-xl lg:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed ${inter.variable} font-sans font-light`}
                        >
                            What began as a vision to blend technology with design is now a premier digital agency based in the UK.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Professional Parallax Image Window */}
            <section className="relative w-full px-4 md:px-6 lg:px-8 pb-24 md:pb-32 z-20">
                <div className="max-w-[1400px] mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full aspect-4/3 md:aspect-21/9 overflow-hidden rounded-3xl md:rounded-4xl group bg-bg-dark shadow-2xl"
                    >
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            style={{ y: heroImgParallax, scale: 1.15 }}
                        >
                            <Image
                                src="/sample_4.webp"
                                alt="Webvoxel Studio Workspace"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1400px) 100vw, 1400px"
                            />
                            {/* Subtle dark overlay for premium feel */}
                            <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SPACER FOR SCROLL */}
            <div className="h-[10vh]" />

            {/* STICKY STORY SECTION */}
            <section className="relative w-full px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left Sticky Header */}
                    <div className="lg:w-[45%] lg:sticky lg:top-40 pt-10">
                        <RevealOnScroll>
                            <h2 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6">
                                Delivering <br />Scalable <br /><span className="text-accent italic">Solutions.</span>
                            </h2>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.1}>
                            <p className={`text-lg text-text-muted max-w-sm ${inter.variable} font-sans`}>
                                We prioritize deep client understanding to deliver solutions that strengthen brand identity and accelerate growth.
                            </p>
                        </RevealOnScroll>
                    </div>

                    {/* Right Scrolling Content */}
                    <div className="lg:w-[55%] flex flex-col gap-12 md:gap-24 pt-10 lg:pt-40">
                        <RevealOnScroll>
                            <p className="font-display text-3xl md:text-5xl text-text-primary leading-[1.2]">
                                With over 10+ successful digital projects, our team has built a strong reputation for delivering scalable solutions that drive engagement and business growth.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll>
                            <div className="w-full aspect-4/3 relative rounded-2xl overflow-hidden shadow-2xl">
                                <Image src="/new team image.png" alt="Story" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                                <div className="absolute inset-0 bg-bg-dark/10 hover:bg-transparent transition-colors duration-700" />
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll>
                            <div className={`space-y-6 text-xl text-text-secondary leading-relaxed ${inter.variable} font-sans`}>
                                <p>
                                    From enterprise-grade platforms to high-converting websites, our results speak for themselves. We deliver a comprehensive suite of digital services tailored for modern businesses seeking innovation and efficiency.
                                </p>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <div className="pt-8 relative inline-block">
                                <MagneticButton href="/services" variant="primary">
                                    Explore Our Services
                                </MagneticButton>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            <div className="h-[20vh]" />

            {/* ENORMOUS BIG STATS SECTION */}
            <section className="py-32 w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] lg:w-[calc(100%-5rem)] bg-bg-dark text-bg-primary rounded-[3rem] md:rounded-[5rem] overflow-hidden relative mx-auto">
                {/* Removed missing noise file */}
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-accent/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
                    <RevealOnScroll>
                        <h2 className="font-display text-4xl md:text-6xl text-white/40 mb-20 text-center">
                            By the numbers
                        </h2>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12 lg:gap-24 justify-center w-full">
                        <RevealOnScroll delay={0.1}>
                            <div className="flex flex-col items-center">
                                <div className="font-display text-7xl md:text-[6rem] lg:text-[10rem] text-bg-primary leading-none mb-4 md:mb-8">
                                    <AnimatedCounter value={2023} suffix="" />
                                </div>
                                <p className={`text-lg md:text-xl text-white/50 text-center uppercase tracking-widest ${inter.variable} font-sans max-w-[150px] md:max-w-none`}>Established</p>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <div className="flex flex-col items-center">
                                <div className="font-display text-7xl md:text-[6rem] lg:text-[10rem] text-accent leading-none mb-4 md:mb-8">
                                    <AnimatedCounter value={10} suffix="+" />
                                </div>
                                <p className={`text-lg md:text-xl text-white/50 text-center uppercase tracking-widest ${inter.variable} font-sans max-w-[150px] md:max-w-none`}>Projects Delivered</p>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.3}>
                            <div className="flex flex-col items-center">
                                <div className="font-display text-7xl md:text-[6rem] lg:text-[10rem] text-bg-primary leading-none mb-4 md:mb-8">
                                    <AnimatedCounter value={5} suffix="" />
                                </div>
                                <p className={`text-lg md:text-xl text-white/50 text-center uppercase tracking-widest ${inter.variable} font-sans max-w-[150px] md:max-w-none`}>Expert Members</p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            <div className="h-[20vh]" />

            {/* EXPANDING VALUES INTERACTIVE SECTION */}
            <section className="py-24 w-full overflow-hidden">
                <RevealOnScroll>
                    <div className="mb-16 md:mb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                        <h2 className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-tight mb-8">
                            What Drives <br />
                            <span className="text-border">Us Forward</span>
                        </h2>
                    </div>
                </RevealOnScroll>

                {/* ── MOBILE LAYOUT: Animated Cards ── */}
                <div className="flex lg:hidden flex-col gap-4 px-5 py-2 max-w-[1400px] mx-auto">
                    {values.map((val, idx) => (
                        <motion.div
                            key={idx}
                            className="relative flex flex-col gap-3 rounded-2xl bg-bg-elevated/40 border border-border overflow-hidden p-6"
                            initial={{ opacity: 0, y: 40, scale: 0.97 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Animated accent left border */}
                            <motion.div
                                className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent origin-top"
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: idx * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                            />

                            {/* Number badge */}
                            <motion.span
                                className={`text-xs font-semibold tracking-[0.2em] uppercase text-accent ${inter.variable} font-sans`}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
                            >
                                0{idx + 1}
                            </motion.span>

                            {/* Title */}
                            <motion.h3
                                className="font-display text-2xl text-text-primary leading-tight"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {val.title}
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                                className={`text-base text-text-secondary leading-relaxed ${inter.variable} font-sans`}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {val.description}
                            </motion.p>

                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-0 bg-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                        </motion.div>
                    ))}
                </div>

                {/* ── DESKTOP LAYOUT: Horizontal list ── */}
                <div className="hidden lg:flex flex-col w-full border-t border-border">
                    {values.map((val, idx) => (
                        <RevealOnScroll key={idx} delay={0.05 * idx}>
                            <div className="group border-b border-border relative transition-colors duration-500">
                                <div className="px-12 py-16 max-w-[1400px] mx-auto flex flex-row items-center justify-between gap-16 relative z-10 w-full">
                                    {/* Left side: Number & Title */}
                                    <div className="flex items-center gap-12 w-1/2">
                                        <span className="font-display text-5xl text-border group-hover:text-border transition-colors duration-500 w-16">
                                            0{idx + 1}
                                        </span>
                                        <h3 className="font-display text-5xl text-text-primary group-hover:translate-x-3 transition-all duration-500 ease-out">
                                            {val.title}
                                        </h3>
                                    </div>
                                    {/* Right side: Description */}
                                    <div className="flex items-center justify-between w-1/2 relative">
                                        <p className={`text-xl text-text-secondary ${inter.variable} font-sans transition-colors duration-500 max-w-lg ml-auto mr-16 group-hover:text-text-primary`}>
                                            {val.description}
                                        </p>
                                    </div>
                                </div>
                                {/* Hover background wipe */}
                                <div className="absolute inset-0 bg-accent/5 scale-x-0 origin-left group-hover:scale-x-105 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </section>

            <div className="h-[10vh]" />

            {/* MASONRY/GRID TEAM SECTION */}
            <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <RevealOnScroll>
                    <div className="text-center mb-20 lg:mb-32">
                        <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-none">
                            The <span className="text-accent italic">Minds</span> Behind <br /> Webvoxel
                        </h2>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {teamMembers.map((member, idx) => {
                        // Offset even items for a staggered masonry look
                        const offsetClass = idx % 2 === 1 ? 'lg:mt-24' : '';

                        return (
                            <RevealOnScroll key={member._id} delay={0.1 * (idx % 2)}>
                                <div className={`flex flex-col ${offsetClass}`}>
                                    <div className="relative aspect-3/4 overflow-hidden rounded-2xl mb-6">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className={`object-cover ${member.position}`}
                                        />
                                    </div>
                                    <h3 className="font-display text-3xl mb-1 text-text-primary">
                                        {member.name}
                                    </h3>
                                    <p className={`text-text-secondary text-xs tracking-widest uppercase font-medium ${inter.variable} font-sans`}>
                                        {member.role}
                                    </p>
                                </div>
                            </RevealOnScroll>
                        )
                    })}
                </div>
            </section>

            <div className="h-[20vh]" />
        </div>
    )
}
