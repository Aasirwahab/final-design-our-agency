'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, MotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import { Inconsolata } from 'next/font/google'
import MagneticButton from '@/components/ui/MagneticButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const inter = Inconsolata({ subsets: ['latin'], variable: '--font-inter' })

const TimelineStep = ({ step, idx, totalSteps, progress, inter }: { step: any, idx: number, totalSteps: number, progress: MotionValue<number>, inter: any }) => {
    // When the progress passes this step's threshold, it activates
    const stepThreshold = (idx + 0.5) / totalSteps;
    const colorVal = useTransform(progress, [stepThreshold - 0.1, stepThreshold], ['rgba(255, 255, 255, 0.1)', '#CCA052']);
    const textVal = useTransform(progress, [stepThreshold - 0.1, stepThreshold], ['#888888', '#CCA052']);

    return (
        <motion.div
            className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-24 last:mb-0 group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
        >

            {/* Step Number (Interactive Node) */}
            <motion.div
                className="absolute left-8 md:left-[50%] top-0 md:top-[50%] -translate-x-[50%] md:-translate-y-[50%] w-16 h-16 rounded-full bg-bg-primary border-2 flex items-center justify-center z-10"
                style={{ borderColor: colorVal }}
            >
                <span className={`text-xl font-medium transition-colors duration-500 ${inter.variable} font-sans`}>
                    <motion.span style={{ color: textVal }}>
                        {step.number}
                    </motion.span>
                </span>
                {/* Inner Glow on Hover (Backup interaction) */}
                <div className="absolute inset-0 bg-accent/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 pointer-events-none" />
            </motion.div>

            {/* Content Alignments */}
            <div className={`w-full md:w-[45%] pl-24 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto md:text-left'} pt-2 md:pt-0`}>
                <h3 className="font-display text-white text-3xl md:text-4xl mb-4 group-hover:text-accent transition-colors duration-500">
                    {step.title}
                </h3>
                <p className={`text-white/70 text-lg leading-relaxed ${inter.variable} font-sans group-hover:text-white transition-colors duration-500`}>
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
};

export default function ServicesContent() {
    // Scroll progress for the entire page
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 50 })
    const giantTextY = useTransform(smoothProgress, [0, 1], [0, 800])

    // Specific scroll progress for the interactive vertical timeline
    const timelineRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    })
    const smoothTimelineProgress = useSpring(timelineProgress, { damping: 20, stiffness: 50 })

    const services = [
        {
            id: '01',
            title: 'Web Development',
            slug: 'web-development',
            outcome: 'Turn visitors into customers with fast, secure, high-performance websites built for growth.',
            features: [
                'Custom-built for your business goals',
                'Mobile-first & conversion-optimized',
                'SEO-ready from day one',
                'Optimized for speed, stability & scale'
            ],
            image: '/services/web-development.png',
        },
        {
            id: '02',
            title: 'App Development',
            slug: 'app-development',
            outcome: 'Deliver seamless mobile and web apps that engage users and scale with your product vision.',
            features: [
                'iOS, Android & cross-platform solutions',
                'Scalable cloud-backed architecture',
                'Secure integrations & APIs',
                'App store–ready deployment'
            ],
            image: '/services/app-development.png',
        },
        {
            id: '03',
            title: 'UI/UX Design',
            slug: 'ui-ux-design',
            outcome: 'Create intuitive user experiences that reduce friction and increase engagement.',
            features: [
                'User research backed decisions',
                'Clear user flows & wireframes',
                'Interactive prototypes before development',
                'Usability-tested for real users'
            ],
            image: '/services/uiux-design.png',
        },
        {
            id: '04',
            title: 'Digital Marketing',
            slug: 'digital-marketing',
            outcome: 'Attract the right audience and convert them using data-driven marketing strategies.',
            features: [
                'Search visibility & paid growth strategies',
                'Content that builds trust & authority',
                'Social media growth frameworks',
                'Performance tracking & analytics'
            ],
            image: '/services/digital-marketing.png',
        },
        {
            id: '05',
            title: 'AI Automation',
            slug: 'ai-automation',
            outcome: 'Save time, reduce costs, and eliminate manual processes using AI-powered automation.',
            features: [
                'Workflow & process automation',
                'AI integrations & intelligent chatbots',
                'Data insights for better decisions',
                'Scalable automation systems'
            ],
            image: '/services/ai-automation.png',
        },
        {
            id: '06',
            title: 'Branding',
            slug: 'branding',
            outcome: 'Stand out in your market with a clear, consistent, and professional brand identity.',
            features: [
                'Brand strategy & positioning',
                'Visual identity & logo systems',
                'Brand guidelines for consistency',
                'Marketing-ready assets'
            ],
            image: '/services/brand-identity.png',
        },
    ]

    const processSteps = [
        { number: '01', title: 'Discovery', description: 'We dive deep into your business goals, target audience, and project requirements to ensure absolute alignment.' },
        { number: '02', title: 'Planning', description: 'Our strategists create a detailed roadmap, timeline, and technical architecture tailored for your success.' },
        { number: '03', title: 'Design', description: 'We craft stunning, intuitive user interfaces and experiences that captivate your audience and drive action.' },
        { number: '04', title: 'Development', description: 'Our engineers build your solution using state-of-the-art technologies, ensuring security and incredible speed.' },
        { number: '05', title: 'Testing', description: 'Rigorous QA cycles guarantee performance, reliability, and security across all devices and edge cases.' },
        { number: '06', title: 'Launch', description: 'We deploy your master-crafted project flawlessly and provide ongoing, white-glove support and proactive maintenance.' },
    ]

    return (
        <div className="relative w-full bg-bg-primary text-text-primary overflow-hidden" ref={containerRef}>

            {/* HERO SECTION */}
            <section className="relative w-full flex flex-col items-center justify-start pt-24 md:pt-28 lg:pt-32 pb-20 md:pb-32">
                {/* Refined subtle background glows */}
                <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-text-secondary/5 blur-[100px] rounded-full pointer-events-none" />

                {/* Huge background text */}
                <motion.div
                    className="absolute top-[10%] z-0 w-full text-center pointer-events-none select-none"
                    style={{ y: giantTextY }}
                >
                    <h1 className="font-display text-[12vw] leading-none text-border/20 whitespace-nowrap opacity-60">
                        OUR CAPABILITIES
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
                                Services & Solutions
                            </p>
                        </div>
                    </motion.div>

                    <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                        <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[1.05] tracking-tight mb-8 text-text-primary">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block"
                            >
                                Outcome-Driven
                            </motion.span>
                            <br />
                            <motion.span
                                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block"
                            >
                                <span className="text-accent italic font-light">Digital&nbsp;</span>Solutions.
                            </motion.span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className={`text-lg md:text-xl lg:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed ${inter.variable} font-sans font-light`}
                        >
                            We don't just build products — we engineer digital ecosystems that deliver measurable results, transform your business, and drive exponential growth.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* SERVICES SHOWCASE (Interactive List) */}
            <section className="relative w-full py-24 md:py-32 border-t border-border">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />

                <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
                        <RevealOnScroll className="max-w-2xl">
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">Capabilities</h2>
                            <p className={`text-text-secondary text-lg ${inter.variable} font-sans`}>
                                We combine technical excellence with strategic design to build products that dominate markets.
                            </p>
                        </RevealOnScroll>
                    </div>

                    <div className="flex flex-col w-full border-t border-border">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                className="group border-b border-border relative transition-colors duration-500 hover:bg-accent/5"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* ── DESKTOP LAYOUT ── */}
                                <div className="hidden lg:flex px-12 py-16 flex-row items-center justify-between gap-16 relative z-10 w-full overflow-hidden">
                                    {/* Number and Title */}
                                    <div className="flex items-start gap-12 w-[40%] shrink-0">
                                        <span className={`text-text-secondary ${inter.variable} font-sans group-hover:text-accent transition-colors duration-500`}>
                                            {service.id}
                                        </span>
                                        <h3 className="font-display text-5xl group-hover:translate-x-4 transition-transform duration-500 ease-out">
                                            {service.title}
                                        </h3>
                                    </div>
                                    {/* Description */}
                                    <div className="flex items-center justify-between w-[55%] gap-8">
                                        <p className={`text-lg text-text-secondary ${inter.variable} font-sans group-hover:text-text-primary transition-colors duration-500 max-w-xs`}>
                                            {service.outcome}
                                        </p>
                                        {/* Hover Image Reveal */}
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[220px] h-[150px] rounded-xl overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-none shadow-2xl">
                                            <Image src={service.image} alt={service.title} fill className="object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* ── MOBILE LAYOUT ── */}
                                <div className="flex lg:hidden flex-col px-5 py-7 gap-5 relative z-10 w-full">

                                    {/* Number + Title Row */}
                                    <motion.div
                                        className="flex items-center gap-5"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <span className={`text-sm font-medium text-text-muted ${inter.variable} font-sans shrink-0 opacity-60`}>
                                            {service.id}
                                        </span>
                                        <h3 className="font-display text-[1.75rem] leading-tight text-text-primary">
                                            {service.title}
                                        </h3>
                                    </motion.div>

                                    {/* Image */}
                                    <motion.div
                                        className="w-full rounded-2xl overflow-hidden relative shadow-xl"
                                        style={{ aspectRatio: '16/9' }}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <Image src={service.image} alt={service.title} fill className="object-cover" />
                                        {/* Subtle gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/40 to-transparent pointer-events-none" />
                                    </motion.div>

                                    {/* Description */}
                                    <motion.p
                                        className={`text-base text-text-secondary leading-relaxed ${inter.variable} font-sans`}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        {service.outcome}
                                    </motion.p>
                                </div>

                                {/* Hover background wipe (desktop) */}
                                <div className="absolute inset-0 bg-accent/5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS TIMELINE (Vertical Sticky) */}
            <section className="relative w-full py-24 md:py-32 bg-bg-dark border-t border-border">
                <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                        <RevealOnScroll className="max-w-2xl">
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-white">Methodology</h2>
                            <p className={`text-white/70 text-lg ${inter.variable} font-sans`}>
                                A surgical, proven workflow that ensures absolute quality, radical efficiency, and exceptional results.
                            </p>
                        </RevealOnScroll>
                    </div>

                    <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
                        {/* Vertical Line */}
                        <div className="absolute left-8 md:left-[50%] top-0 bottom-0 w-[1px] bg-border -translate-x-[50%]" />

                        {/* Animated Progress Line */}
                        <motion.div
                            className="absolute left-8 md:left-[50%] top-0 bottom-0 w-[1px] bg-accent -translate-x-[50%] origin-top"
                            style={{ scaleY: smoothTimelineProgress }}
                        />

                        {processSteps.map((step, idx) => (
                            <TimelineStep
                                key={idx}
                                step={step}
                                idx={idx}
                                totalSteps={processSteps.length}
                                progress={smoothTimelineProgress}
                                inter={inter}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SELECTED WORKS */}
            <section className="relative w-full py-24 md:py-32 overflow-hidden">
                <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8 mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
                    <RevealOnScroll>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">Selected Proofs</h2>
                        <p className={`text-text-secondary text-lg max-w-xl ${inter.variable} font-sans`}>
                            Discover how our specialized capabilities have fundamentally elevated businesses and brands worldwide.
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2}>
                        <Link href="/works">
                            <MagneticButton>
                                View All Works
                            </MagneticButton>
                        </Link>
                    </RevealOnScroll>
                </div>

                {/* Aesthetic Editorial Masonry Layout */}
                <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8">
                    {/* Hero Project (Full Width) */}
                    <RevealOnScroll>
                        <div className="group cursor-pointer relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl mb-8 md:mb-12 lg:mb-16">
                            <Image src="/surfying-aru.webp" alt="Pappy's Arugambay" fill className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {/* Project Details */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="w-2 h-2 rounded-full bg-accent" />
                                        <p className={`text-accent font-medium uppercase tracking-widest text-sm ${inter.variable} font-sans`}>Tourism Website</p>
                                    </div>
                                    <h3 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-2 group-hover:text-accent transition-colors duration-500">Pappy's Arugambay</h3>
                                </div>
                                <div className="hidden md:flex w-16 h-16 rounded-full bg-accent text-bg-primary items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -rotate-45 group-hover:rotate-0">
                                    <ArrowRight className="w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Secondary Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                        {[
                            { title: 'Signature Aroma', cat: 'E-commerce Store', img: '/eccomerce.webp' },
                            { title: 'WavePOS Cloud', cat: 'SaaS Platform', img: '/wave_pos.webp', offset: true },
                            { title: 'Craft Clothing', cat: 'E-commerce Platform', img: '/jersey.webp' },
                        ].map((work, idx) => (
                            <RevealOnScroll key={idx} delay={idx * 0.1}>
                                <div className={`group cursor-pointer flex flex-col ${work.offset ? 'md:mt-24' : ''}`}>
                                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-xl">
                                        <Image src={work.img} alt={work.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 mix-blend-multiply transition-opacity duration-500 pointer-events-none" />
                                    </div>
                                    <p className={`text-accent font-medium mb-2 uppercase tracking-widest text-xs ${inter.variable} font-sans`}>{work.cat}</p>
                                    <h3 className="font-display text-3xl md:text-4xl text-text-primary group-hover:text-accent transition-colors duration-300 flex items-center gap-4">
                                        {work.title}
                                        <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </h3>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQS SECTION */}
            <section className="relative w-full py-24 md:py-32 bg-bg-dark border-y border-border">
                <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 lg:gap-24">

                    <div className="w-full lg:w-1/3">
                        <RevealOnScroll>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-white">Insights & Clarity</h2>
                            <p className={`text-white/70 text-lg ${inter.variable} font-sans`}>
                                We believe in total transparency. Here are answers to questions our partners frequently ask before embarking on a transformative journey with us.
                            </p>
                        </RevealOnScroll>
                    </div>

                    <div className="w-full lg:w-2/3 border-t border-border flex flex-col">
                        {[
                            { q: 'How long does a typical project take to deploy?', a: 'Timelines scale with ambition. High-impact marketing pages typically launch in 4-8 weeks, while enterprise-grade applications or highly complex ecosystems require 3-6 months. Execution speed is balanced against our unwavering standard for absolute perfection.' },
                            { q: 'What is your technology philosophy?', a: 'We utilize bleeding-edge, high-performance stacks like Next.js, React, Node.js, and specialized animation libraries (Framer Motion, GSAP, Three.js) to craft immersive, scalable, and secure experiences that dominate your industry.' },
                            { q: 'How does your pricing structure work?', a: 'We structure engagements based on the transformative value we deliver. Following our initial Discovery session, we architect a tailored proposal with crystal-clear pricing—either on a project-milestone basis or as a dedicated retainer partnership.' },
                            { q: 'Do you offer post-launch support & evolution?', a: 'Absolutely. A launch is not the finish line; it’s the beginning of lifecycle growth. We offer extensive maintenance, proactive optimization, and feature-expansion retainers to guarantee your digital presence constantly evolves ahead of the curve.' }
                        ].map((faq, idx) => {
                            const [isOpen, setIsOpen] = useState(false)
                            return (
                                <div key={idx} className="border-b border-border">
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full py-8 flex items-center justify-between text-left group"
                                    >
                                        <h3 className="font-display text-white text-2xl md:text-3xl max-w-xl group-hover:text-accent transition-colors duration-300">
                                            {faq.q}
                                        </h3>
                                        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:block-accent group-hover:border-accent transition-all duration-300 text-white group-hover:text-accent relative overflow-hidden">
                                            <Plus className={`w-5 h-5 absolute transition-transform duration-500 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                                            <Minus className={`w-5 h-5 absolute transition-transform duration-500 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p className={`pb-8 text-white/70 text-lg leading-relaxed max-w-3xl ${inter.variable} font-sans`}>
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </section >

            {/* CALL TO ACTION */}
            < section className="relative w-full py-32 md:py-48 bg-accent text-bg-primary overflow-hidden" >
                <div className="absolute top-0 right-0 w-full h-[1px] bg-bg-primary/20" />

                {/* Background decorative typography */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10">
                    <h2 className="font-display text-[20vw] leading-none whitespace-nowrap">START NOW</h2>
                </div>

                <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
                    <RevealOnScroll>
                        <h2 className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-none mb-8 tracking-tight">
                            Ready to Build <br />
                            <span className="italic font-light">Your Legacy?</span>
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2}>
                        <p className={`text-xl md:text-2xl text-bg-primary/80 max-w-2xl mx-auto mb-12 ${inter.variable} font-sans`}>
                            Let's architect an elite digital experience that places your brand at the absolute pinnacle of your industry.
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.4}>
                        <Link href="/contact">
                            <button className="group relative inline-flex items-center justify-center px-12 py-6 rounded-full bg-bg-primary text-text-primary overflow-hidden transition-transform duration-500 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-black/20">
                                <div className="absolute inset-0 bg-text-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <span className={`relative z-10 flex items-center gap-3 text-lg font-medium group-hover:text-bg-primary transition-colors duration-500 ${inter.variable} font-sans`}>
                                    Initialize Project
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </Link>
                    </RevealOnScroll>
                </div>
            </section >
        </div >

    )
}
