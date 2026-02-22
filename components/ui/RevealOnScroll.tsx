'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealOnScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}

export default function RevealOnScroll({
    children,
    className = "",
    delay = 0,
    y = 40
}: RevealOnScrollProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
