'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface TransitionContextType {
    startTransition: (path: string, heading: string) => void
    isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType>({
    startTransition: () => { },
    isTransitioning: false,
})

export const usePageTransition = () => useContext(TransitionContext)

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [heading, setHeading] = useState('')
    const [showOverlay, setShowOverlay] = useState(false)
    const [sourcePathname, setSourcePathname] = useState<string | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const startTransition = useCallback((path: string, newHeading: string) => {
        // Don't transition if already on the same page
        if (path === pathname) return
        // Don't stack transitions
        if (isTransitioning) return

        setHeading(newHeading)
        setIsTransitioning(true)
        setShowOverlay(true)
        setSourcePathname(pathname)

        // Wait for the enter animation + progress line, then navigate
        timeoutRef.current = setTimeout(() => {
            router.push(path)

            // Fallback timeout in case navigation fails or takes extremely long
            fallbackTimeoutRef.current = setTimeout(() => {
                setShowOverlay(false)
                setSourcePathname(null)
                setTimeout(() => setIsTransitioning(false), 1000)
            }, 60000)
        }, 1200)
    }, [pathname, isTransitioning, router])

    useEffect(() => {
        if (isTransitioning && sourcePathname && pathname !== sourcePathname) {
            if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current)

            // Give React a moment to render the new page
            const timer = setTimeout(() => {
                setShowOverlay(false)
                setSourcePathname(null)

                // Reset state after exit animation completes
                setTimeout(() => {
                    setIsTransitioning(false)
                }, 1000)
            }, 300)

            return () => clearTimeout(timer)
        }
    }, [pathname, isTransitioning, sourcePathname])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current)
        }
    }, [])

    // Split heading into characters for stagger animation
    const headingChars = heading.split('')

    return (
        <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
            {children}

            <AnimatePresence mode="wait">
                {showOverlay && (
                    <motion.div
                        key="page-transition"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        className="fixed inset-0 z-99998 flex flex-col items-center justify-center bg-bg-primary"
                    >
                        <div className="overflow-hidden flex flex-col items-center">
                            {/* Heading with letter stagger */}
                            <div className="overflow-hidden">
                                <motion.h2
                                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary tracking-tight flex"
                                    aria-label={heading}
                                >
                                    {headingChars.map((char, i) => (
                                        <motion.span
                                            key={`${char}-${i}`}
                                            initial={{ y: '100%', opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.76, 0, 0.24, 1],
                                                delay: 0.15 + i * 0.03,
                                            }}
                                            className="inline-block"
                                            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.h2>
                            </div>

                            {/* Elegant thin progress line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}
                                className="w-32 h-px bg-text-primary mt-6 origin-left"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </TransitionContext.Provider>
    )
}
