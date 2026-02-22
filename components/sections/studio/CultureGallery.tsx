'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import RevealOnScroll from '../../ui/RevealOnScroll'

export default function CultureGallery() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Create a smooth horizontal scroll effect mapped to the vertical scroll
    const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
    const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"])

    const imagesRow1 = [
        "/sample_1.webp",
        "/sample_2.webp",
        "/sample_5.webp",
        "/sample_4.webp",
    ]

    const imagesRow2 = [
        "/projects/citylife.png",
        "/Zamir Founder.webp",
        "/new team image.png",
        "/HASNI.webp",
    ]

    return (
        <section className="py-24 md:py-32 w-full overflow-hidden bg-bg-primary" ref={containerRef}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 text-center">
                <RevealOnScroll>
                    <h2 className="font-display text-5xl md:text-7xl leading-none">
                        Our <span className="text-accent italic">Culture.</span>
                    </h2>
                </RevealOnScroll>
            </div>

            {/* Row 1: Scrolling Left */}
            <div className="relative w-full flex gap-6 md:gap-8 mb-6 md:mb-8 -ml-[10%]">
                <motion.div className="flex gap-6 md:gap-8 min-w-max" style={{ x: x1 }}>
                    {imagesRow1.concat(imagesRow1).map((src, idx) => (
                        <div key={idx} className="relative w-[300px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                            <Image
                                src={src}
                                alt="Webvoxel Culture"
                                fill
                                sizes="(max-width: 768px) 300px, 400px"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Row 2: Scrolling Right */}
            <div className="relative w-full flex gap-6 md:gap-8 -ml-[15%]">
                <motion.div className="flex gap-6 md:gap-8 min-w-max" style={{ x: x2 }}>
                    {imagesRow2.concat(imagesRow2).map((src, idx) => (
                        <div key={idx} className="relative w-[350px] md:w-[450px] aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
                            <Image
                                src={src}
                                alt="Webvoxel Team"
                                fill
                                sizes="(max-width: 768px) 350px, 450px"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
