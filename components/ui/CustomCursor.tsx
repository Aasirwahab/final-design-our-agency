'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const cursorX = useSpring(0, { stiffness: 500, damping: 40, mass: 0.3 })
    const cursorY = useSpring(0, { stiffness: 500, damping: 40, mass: 0.3 })

    useEffect(() => {
        // Only show custom cursor on devices with a fine pointer (no touch)
        const hasPointer = window.matchMedia('(pointer: fine)').matches
        if (!hasPointer) return

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleEnter = () => setIsHovering(true)
        const handleLeave = () => setIsHovering(false)

        window.addEventListener('mousemove', moveCursor, { passive: true })

        // Detect interactive elements
        const observer = new MutationObserver(() => {
            const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
            interactives.forEach(el => {
                el.addEventListener('mouseenter', handleEnter)
                el.addEventListener('mouseleave', handleLeave)
            })
        })

        observer.observe(document.body, { childList: true, subtree: true })

        // Initial pass
        const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
        interactives.forEach(el => {
            el.addEventListener('mouseenter', handleEnter)
            el.addEventListener('mouseleave', handleLeave)
        })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            observer.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isVisible) return null

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-200 hidden md:block"
            style={{ x: cursorX, y: cursorY }}
        >
            <motion.div
                animate={{
                    width: isHovering ? 48 : 8,
                    height: isHovering ? 48 : 8,
                    opacity: isHovering ? 0.15 : 0.5,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
            />
        </motion.div>
    )
}
