'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import RevealOnScroll from '../../ui/RevealOnScroll'
import { inter } from '@/lib/fonts'

const locations = [
    {
        id: 'uk',
        country: 'United Kingdom',
        city: 'London',
        timezone: 'Europe/London',
        tzLabel: 'GMT',
        coords: '51.5074° N, 0.1278° W',
        image: '/uk-headoffice.webp',
    }
]

function LiveClock({ timezone }: { timezone: string }) {
    const [time, setTime] = useState('')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const update = () => {
            setTime(
                new Date().toLocaleTimeString('en-GB', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })
            )
        }
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [timezone])

    if (!mounted) return <span className="inline-block w-20 h-4 bg-white/10 rounded animate-pulse" />

    return <span className="tabular-nums text-bg-primary/90 font-medium">{time}</span>
}

function LocationCard({ loc, index }: { loc: typeof locations[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }, [])

    return (
        <RevealOnScroll delay={index * 0.15}>
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative w-full rounded-2xl overflow-hidden bg-bg-dark border border-border/30 cursor-pointer aspect-4/3 md:aspect-3/4 lg:aspect-4/3"
            >
                {/* Background Image */}
                <Image
                    src={loc.image}
                    alt={`${loc.city}, ${loc.country}`}
                    fill
                    className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:grayscale-50"
                />

                {/* New gradient overlay for v4 */}
                <div className="absolute inset-0 bg-linear-to-t from-bg-dark/40 to-transparent pointer-events-none" />

                {/* Cursor-following spotlight — inline style required for runtime mouse coordinates */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    // eslint-disable-next-line
                    style={{
                        background: isHovering
                            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(5, 150, 105, 0.15), transparent 40%)`
                            : 'none',
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 lg:p-8" />

                {/* Coordinates — top right */}
                <div className={`absolute top-6 right-6 md:top-8 md:right-8 ${inter.variable} font-sans`}>
                    <span className="text-[10px] md:text-xs text-bg-primary/30 font-mono tracking-wider group-hover:text-bg-primary/50 transition-colors duration-500">
                        {loc.coords}
                    </span>
                </div>

                {/* Content — bottom */}
                <div className="absolute p-6 md:p-8 lg:p-10 bottom-0 left-0 w-full flex flex-col justify-end pointer-events-none">
                    {/* Live clock + timezone */}
                    <div className={`flex items-center gap-2.5 mb-3 ${inter.variable} font-sans`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-xs tracking-widest uppercase font-medium text-accent">
                            {loc.tzLabel}
                        </span>
                        <span className="w-px h-3 bg-bg-primary/20 mx-1" />
                        <LiveClock timezone={loc.timezone} />
                    </div>

                    {/* City name */}
                    <h3 className="font-display text-4xl md:text-5xl text-bg-primary mb-1 group-hover:translate-x-2 transition-transform duration-500">
                        {loc.city}
                    </h3>

                    {/* Country */}
                    <p className={`text-lg text-bg-primary/50 ${inter.variable} font-sans group-hover:text-bg-primary/70 transition-colors duration-500`}>
                        {loc.country}
                    </p>
                </div>
            </motion.div>
        </RevealOnScroll>
    )
}

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                {locations.map((loc, idx) => (
                    <LocationCard key={loc.id} loc={loc} index={idx} />
                ))}
            </div>
        </section>
    )
}
