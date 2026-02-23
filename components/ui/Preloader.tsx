'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden'

        // Simulate loading time (you can adjust this to wait for actual load if needed)
        const timer = setTimeout(() => {
            setIsLoading(false)
            document.body.style.overflow = 'unset'
            window.scrollTo(0, 0)
        }, 2000)

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    // Slide up animation for the entire overlay when exiting
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-bg-primary"
                >
                    <div className="overflow-hidden flex flex-col items-center">
                        {/* Logo appearing from bottom */}
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        >
                            <Image
                                src="/webvoxel-logoblack.png"
                                alt="Webvoxel Studio"
                                width={200}
                                height={50}
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Elegant thin progress line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-32 h-[1px] bg-text-primary mt-6 origin-left"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
