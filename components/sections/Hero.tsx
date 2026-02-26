'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import { inter } from '@/lib/fonts'
import { portfolio } from '@/lib/data'
import dynamic from 'next/dynamic'
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

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
    const projects = useQuery(api.projects.listPublished) || []

    // Fallback images while loading or if no projects
    const defaultImages = [
        { src: "/projects/citylife-branding-new-converter.webp", title: "Citylife" },
        { src: "/projects/Pappy's Arugambay.webp", title: "Pappy's Arugambay" },
        { src: "/projects/Kitesurfing Kalpitiya.webp", title: "Kitesurfing Kalpitiya" },
        { src: "/projects/Signature Aroma.webp", title: "Signature Aroma" }
    ]

    const baseImages = projects.length > 0
        ? projects.filter((p: any) => p.image).map((p: any) => ({ src: p.image, title: p.title }))
        : defaultImages

    // Duplicate for seamless loop
    const doubled = [...baseImages, ...baseImages]
    return null; // The globe is preferred now
}

/* ── Interactive Globe Montage ──────────────────────────── */
const World = dynamic(() => import('../ui/globe').then((m) => m.World), {
    ssr: false,
})

const globeConfig = {
    pointSize: 4,
    globeColor: "#FFFFFF",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#059669",
    emissiveIntensity: 0.2, // Increased glow
    shininess: 0.9,
    polygonColor: "rgba(15, 23, 42, 0.7)", // slate-900 with opacity
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 2500, // Longer time for smooth flow
    arcLength: 0.35, // Balanced trail
    rings: 2,
    maxRings: 4,
    initialPosition: { lat: 20, lng: 0 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
};

const colors = ["#059669", "#10B981"]; // Emerald accent colors

const globalCities = [
    { lat: 40.7128, lng: -74.0060 }, // NY
    { lat: 37.7749, lng: -122.4194 }, // SF
    { lat: 35.6762, lng: 139.6503 }, // Tokyo
    { lat: -33.8688, lng: 151.2093 }, // Sydney
    { lat: 25.2048, lng: 55.2708 }, // Dubai
    { lat: 1.3521, lng: 103.8198 }, // Singapore
    { lat: 52.5200, lng: 13.4050 }, // Berlin
    { lat: 48.8566, lng: 2.3522 }, // Paris
    { lat: 43.6510, lng: -79.3470 }, // Toronto
    { lat: -33.9249, lng: 18.4241 }, // Cape Town
    { lat: 19.0760, lng: 72.8777 }, // Mumbai
    { lat: -23.5505, lng: -46.6333 }, // Sao Paulo
    { lat: 39.9042, lng: 116.4074 }, // Beijing
    { lat: 55.7558, lng: 37.6173 }, // Moscow
    { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
    { lat: 6.5244, lng: 3.3792 }, // Lagos
    { lat: 34.0522, lng: -118.2437 }, // LA
    { lat: 41.9028, lng: 12.4964 }, // Rome
    { lat: 28.6139, lng: 77.2090 }, // New Delhi
    { lat: 1.2921, lng: 36.8219 }, // Nairobi
    { lat: -36.8485, lng: 174.7633 }, // Auckland
    { lat: 22.3193, lng: 114.1694 }, // Hong Kong
    { lat: 51.1657, lng: 10.4515 }, // Germany
    { lat: 37.5665, lng: 126.9780 } // Seoul
];

const hubs = [
    { lat: 51.5072, lng: -0.1276 }, // London
];

// Generate 10 infinite smooth arcs flying back and forth with distinctly different altitudes
const sampleArcs = Array.from({ length: 10 }).map((_, i) => {
    const isToHub = Math.random() > 0.5;
    const hub = hubs[Math.floor(Math.random() * hubs.length)];
    const city = globalCities[Math.floor(Math.random() * globalCities.length)];
    return {
        order: i + 1,
        startLat: isToHub ? city.lat : hub.lat,
        startLng: isToHub ? city.lng : hub.lng,
        endLat: isToHub ? hub.lat : city.lat,
        endLng: isToHub ? hub.lng : city.lng,
        arcAlt: 0.15 + (i * 0.045), // 10 explicitly different altitude distances
        color: colors[Math.floor(Math.random() * colors.length)],
    };
});

function HeroGlobe() {
    return (
        <div className="relative w-full h-[500px] lg:h-[600px] rounded-lg flex items-center justify-center -mt-8">
            {/* Ambient Base Glow */}
            <div className="absolute inset-x-0 bottom-[-10%] sm:bottom-[-20%] h-3/4 bg-accent/20 blur-[100px] z-0 pointer-events-none rounded-full" />

            <motion.div
                className="absolute inset-0 w-full h-full opacity-90 z-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <World data={sampleArcs} globeConfig={globeConfig} />
            </motion.div>

            {/* Floating Glassmorphic Badges */}
            <motion.div
                className="absolute top-[15%] left-[5%] z-20 backdrop-blur-md bg-white/60 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-text-primary px-5 py-3 rounded-2xl hidden md:flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: ["-10px", "10px"] }}
                transition={{
                    duration: 0.8,
                    delay: 1,
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }
                }}
            >
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <div className="flex flex-col">
                    <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Locations</span>
                    <span className="text-sm font-semibold tracking-tight">London, UK</span>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-[15%] right-[5%] z-20 backdrop-blur-md bg-white/60 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-text-primary px-5 py-3 rounded-2xl hidden md:flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: ["10px", "-10px"] }}
                transition={{
                    duration: 0.8,
                    delay: 1.3,
                    y: {
                        duration: 3.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.5
                    }
                }}
            >
                <div className="flex flex-col items-end text-right">
                    <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Global Reach</span>
                    <span className="text-sm font-semibold tracking-tight">25+ Projects Delivered</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
                        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 9H21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 15H21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </motion.div>

        </div >
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
                        Web Development Studio — United Kingdom
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
                            {[
                                'https://randomuser.me/api/portraits/men/32.jpg',
                                'https://randomuser.me/api/portraits/women/44.jpg',
                                'https://randomuser.me/api/portraits/men/75.jpg',
                            ].map((src, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-primary overflow-hidden relative bg-bg-elevated flex items-center justify-center">
                                    <Image src={src} alt="Client" fill sizes="48px" className="object-cover" />
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
                    <HeroGlobe />
                </motion.div>

            </div>
        </section>
    )
}
