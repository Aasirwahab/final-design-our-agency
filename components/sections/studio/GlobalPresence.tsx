'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import RevealOnScroll from '../../ui/RevealOnScroll'
import { inter } from '@/lib/fonts'

const locations = [
    {
        id: 'uk',
        country: 'United Kingdom',
        city: 'London',
        timeZone: 'GMT',
        image: '/projects/citylife.png', // Fallback to an existing image
    },
    {
        id: 'sl',
        country: 'Sri Lanka',
        city: 'Colombo',
        timeZone: 'IST',
        image: '/Zamir Founder.webp', // Fallback, update later if dedicated city images are provided
    }
]

export default function GlobalPresence() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full relative z-10 border-t border-border">
            <RevealOnScroll>
                <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end mb-16">
                    <h2 className="font-display text-5xl md:text-7xl leading-none">
                        Global <br /> <span className="text-accent italic">Presence.</span>
                    </h2>
                    <p className={`text-lg text-text-muted max-w-sm ${inter.variable} font-sans`}>
                        Operating across borders to provide seamless, tailored digital solutions for modern businesses worldwide.
                    </p>
                </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {locations.map((loc, idx) => (
                    <RevealOnScroll key={loc.id} delay={idx * 0.1}>
                        <div className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-bg-dark border border-border">
                            {/* Subtle Background Image */}
                            <Image
                                src={loc.image}
                                alt={`${loc.city}, ${loc.country}`}
                                fill
                                className="object-cover opacity-20 filter grayscale group-hover:opacity-40 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/50 to-transparent" />

                            {/* Content */}
                            <div className="absolute p-8 md:p-10 bottom-0 left-0 w-full flex flex-col justify-end pointer-events-none">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    <span className={`text-sm tracking-widest uppercase font-medium text-accent ${inter.variable} font-sans`}>
                                        {loc.timeZone}
                                    </span>
                                </div>
                                <h3 className="font-display text-4xl md:text-5xl text-bg-primary mb-1">
                                    {loc.city}
                                </h3>
                                <p className={`text-xl text-text-muted ${inter.variable} font-sans`}>
                                    {loc.country}
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </section>
    )
}
