'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface SmoothScrollingProps {
    children: ReactNode
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
    const pathname = usePathname()
    const lenis = useLenis()

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true })
        }
    }, [pathname, lenis])

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    )
}
