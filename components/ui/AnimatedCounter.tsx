'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useSpring, useTransform, motion } from 'framer-motion'

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    className?: string;
}

export default function AnimatedCounter({ value, suffix = '', className = '' }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const [hasStarted, setHasStarted] = useState(false)
    const inView = useInView(ref, { once: true, margin: "-50px" })

    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 20,
        mass: 1,
    })

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

    useEffect(() => {
        if (inView && !hasStarted) {
            setHasStarted(true)
            springValue.set(value)
        }
    }, [inView, value, springValue, hasStarted])

    return (
        <span ref={ref} className={className}>
            <motion.span>{displayValue}</motion.span>{suffix}
        </span>
    )
}
