'use client'

import { useRef, useState, type MouseEvent, type ReactNode } from 'react'

interface TiltCardProps {
    children: ReactNode
    className?: string
    tiltMax?: number        // max tilt in degrees
    scaleOnHover?: number   // scale multiplier on hover
    perspective?: number    // CSS perspective value
}

export default function TiltCard({
    children,
    className = '',
    tiltMax = 8,
    scaleOnHover = 1.02,
    perspective = 1000,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const [style, setStyle] = useState({
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`,
        transition: 'transform 0.6s cubic-bezier(0.03,0.98,0.52,0.99)',
    })

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()

        // Normalised position (-0.5 to 0.5)
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5

        // Invert Y for natural tilt (move mouse up → card tilts toward you)
        const rotateX = -y * tiltMax
        const rotateY = x * tiltMax

        setStyle({
            transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleOnHover},${scaleOnHover},${scaleOnHover})`,
            transition: 'transform 0.1s ease-out',
        })
    }

    const handleMouseLeave = () => {
        setStyle({
            transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`,
            transition: 'transform 0.6s cubic-bezier(0.03,0.98,0.52,0.99)',
        })
    }

    return (
        <div
            ref={cardRef}
            className={className}
            style={{
                ...style,
                willChange: 'transform',
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    )
}
