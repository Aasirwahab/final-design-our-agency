'use client'

import { usePageTransition } from './PageTransitionProvider'

// Map route paths to display headings
const routeHeadings: Record<string, string> = {
    '/': 'Webvoxel Studio',
    '/studio': 'Studio',
    '/works': 'Our Work',
    '/services': 'Services',
    '/contact': 'Contact',
    '/careers': 'Careers',
    '/privacy-policy': 'Privacy Policy',
    '/terms-of-service': 'Terms of Service',
}

interface TransitionLinkProps {
    href: string
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export default function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
    const { startTransition } = usePageTransition()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        // Call any additional onClick handler (e.g., close mobile menu)
        if (onClick) onClick()

        // Get heading for the target route, fallback to capitalized path
        const heading = routeHeadings[href] || href.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

        startTransition(href, heading)
    }

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    )
}
