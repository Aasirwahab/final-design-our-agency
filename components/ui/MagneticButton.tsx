'use client'

import { useRef, useState, ReactNode, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface MagneticButtonProps {
    children: ReactNode;
    href?: string;
    className?: string;
    variant?: 'primary' | 'outline' | 'ghost';
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    href,
    className = '',
    variant = 'primary',
    onClick
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 })
    }

    const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full font-medium transition-colors duration-300 pointer-events-none"

    const variants = {
        primary: "bg-accent text-white hover:bg-accent-hover",
        outline: "border border-border-light text-text-primary hover:bg-bg-elevated",
        ghost: "text-text-primary hover:text-accent"
    }

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-block cursor-pointer ${className}`}
            onClick={onClick}
        >
            <div className={`${baseStyles} ${variants[variant]} ${className ? className : ''}`}>
                {children}
            </div>

            <div className="absolute -inset-4 z-[-1]" />
        </motion.div>
    )

    if (href) {
        return <Link href={href}>{content}</Link>
    }

    return content
}
