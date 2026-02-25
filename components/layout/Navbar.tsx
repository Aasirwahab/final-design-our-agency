'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import TransitionLink from '@/components/ui/TransitionLink'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const leftLinks = [
        { name: 'Studio', href: '/studio' },
        { name: 'Works', href: '/works' },
    ]

    const rightLinks = [
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.06)] py-2 text-text-primary'
                    : 'bg-transparent border-b border-transparent py-4 text-text-primary'
                    }`}
            >
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between relative">

                    {/* Left — Nav links */}
                    <nav className="hidden lg:flex items-center gap-8 flex-1">
                        {[...leftLinks, ...rightLinks].map((link) => (
                            <TransitionLink
                                key={link.name}
                                href={link.href}
                                className="text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                            </TransitionLink>
                        ))}
                    </nav>

                    {/* Center — Logo (absolutely centered) */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 z-50">
                        <Image
                            src="/webvoxel-logoblack.png"
                            alt="Webvoxel Logo"
                            width={220}
                            height={55}
                            className="object-contain transition-all duration-500 hover:opacity-80"
                            priority
                        />
                    </Link>

                    {/* Right — Divider + CTA */}
                    <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
                        <TransitionLink
                            href="/contact"
                            className="bg-accent text-white px-6 py-2.5 rounded-full font-medium text-sm tracking-wide hover:bg-accent-hover hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Get Started
                        </TransitionLink>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden z-50 p-2 -mr-2 text-text-primary"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between items-end relative">
                            <span className={`h-[1.5px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 absolute top-2' : 'w-6'}`} />
                            <span className={`h-[1.5px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
                            <span className={`h-[1.5px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 absolute top-2' : 'w-5'}`} />
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile fullscreen menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center px-6"
                    >
                        <nav className="flex flex-col items-center gap-8 text-center">
                            {[...leftLinks, ...rightLinks].map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.08), duration: 0.4 }}
                                >
                                    <TransitionLink
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="font-display text-4xl hover:text-accent transition-colors"
                                    >
                                        {link.name}
                                    </TransitionLink>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="mt-6"
                            >
                                <TransitionLink
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-accent text-white px-8 py-4 rounded-full font-medium text-lg"
                                >
                                    Get Started
                                </TransitionLink>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
