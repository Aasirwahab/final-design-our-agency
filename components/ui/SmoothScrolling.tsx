'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

interface SmoothScrollingProps {
    children: ReactNode
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    )
}
