'use client'

import Link from 'next/link'
import Image from 'next/image'
import RevealOnScroll from '../ui/RevealOnScroll'
import { ArrowRight } from 'lucide-react'
import { Inconsolata } from 'next/font/google'
import LondonTime from '../ui/LondonTime'

const inter = Inconsolata({ subsets: ['latin'], variable: '--font-inter' })

export default function Footer() {
    return (
        <footer className="relative bg-bg-dark text-white pt-32 pb-12 overflow-hidden border-t border-white/10">
            {/* Subtle glow effect behind the footer */}
            <div className="absolute top-0 left-[50%] -translate-x-1/2 w-[80%] h-full bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* TOP: Massive CTA */}
                <RevealOnScroll className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
                    <h2 className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[1] max-w-4xl tracking-tight">
                        Let&apos;s build <br />
                        <span className="text-accent italic font-light relative inline-block">
                            the future.
                            <svg width="100%" height="12" viewBox="0 0 300 12" fill="none" className="absolute -bottom-2 left-0 text-accent/30">
                                <path d="M2.5 9.5C50 3.5 150 1.5 297.5 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h2>
                    <Link
                        href="/contact"
                        className="group flex items-center gap-4 text-xl md:text-2xl font-display text-white border-b-2 border-accent pb-2 hover:text-accent transition-colors duration-300"
                    >
                        Start a Project
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                </RevealOnScroll>

                {/* MIDDLE: Efficient Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 pb-24 border-b border-white/10">

                    {/* Brand / Newsletter Column */}
                    <div className="md:col-span-5 flex flex-col justify-between">
                        <div>
                            <Link href="/" className="inline-block mb-6">
                                <Image
                                    src="/webvoxel-logowhite.png"
                                    alt="Webvoxel Logo"
                                    width={200}
                                    height={50}
                                    className="object-contain"
                                    priority
                                />
                            </Link>
                            <p className={`text-white/50 text-lg max-w-sm leading-relaxed ${inter.variable} font-sans`}>
                                An elite digital product agency crafting immersive experiences and high-converting platforms for bold brands worldwide.
                            </p>
                        </div>

                        <div className="mt-12 md:mt-24">
                            <h4 className={`text-sm uppercase tracking-widest text-white/40 mb-4 ${inter.variable} font-sans`}>Direct Inquiry</h4>
                            <a href="mailto:info@webvoxelstudio.uk" className="text-2xl font-display hover:text-accent transition-colors duration-300 block">
                                info@webvoxelstudio.uk
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className={`text-sm uppercase tracking-widest text-white/40 mb-8 ${inter.variable} font-sans`}>Navigate</h4>
                        <nav className="flex flex-col gap-4">
                            {['Studio', 'Works', 'Services', 'Contact'].map(link => (
                                <Link
                                    key={link}
                                    href={`/${link.toLowerCase()}`}
                                    className={`text-white/70 hover:text-accent transition-colors duration-300 text-lg ${inter.variable} font-sans`}
                                >
                                    {link}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Capabilities Column */}
                    <div className="md:col-span-2">
                        <h4 className={`text-sm uppercase tracking-widest text-white/40 mb-8 ${inter.variable} font-sans`}>Expertise</h4>
                        <ul className="flex flex-col gap-4">
                            {['Digital Strategy', 'Brand Identity', 'Web Development', 'UI/UX Design'].map(service => (
                                <li
                                    key={service}
                                    className={`text-white/50 text-lg ${inter.variable} font-sans cursor-default`}
                                >
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials / Location Column */}
                    <div className="md:col-span-2">
                        <h4 className={`text-sm uppercase tracking-widest text-white/40 mb-8 ${inter.variable} font-sans`}>Connect</h4>
                        <nav className="flex flex-col gap-4 mb-12">
                            <a href="https://www.linkedin.com/company/webvoxelstudio/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-white/70 hover:text-accent transition-colors duration-300 text-lg ${inter.variable} font-sans`}>
                                LinkedIn
                                <ArrowRight className="w-3 h-3 -rotate-45" />
                            </a>
                        </nav>
                    </div>

                </div>

                {/* BOTTOM: Fine Print & Details */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-8 gap-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                        <p className={`text-sm text-white/40 ${inter.variable} font-sans`}>
                            © {new Date().getFullYear()} Webvoxel Studio. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/privacy-policy" className={`text-sm text-white/40 hover:text-white transition-colors duration-300 ${inter.variable} font-sans`}>Privacy Policy</Link>
                            <Link href="/terms-of-service" className={`text-sm text-white/40 hover:text-white transition-colors duration-300 ${inter.variable} font-sans`}>Terms of Service</Link>
                        </div>
                    </div>

                    <LondonTime />
                </div>
            </div>
        </footer>
    )
}
