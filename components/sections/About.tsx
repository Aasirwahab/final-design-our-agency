import Link from 'next/link'
import RevealOnScroll from '../ui/RevealOnScroll'
import { inter } from '@/lib/fonts'

export default function About() {
    return (
        <section className="py-28 md:py-36">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">

                    {/* Content */}
                    <div className="lg:col-span-12 flex flex-col max-w-5xl">
                        <RevealOnScroll>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8">
                                Your digital growth partner
                            </h2>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.1}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <p className={`text-lg text-text-secondary leading-relaxed ${inter.variable} font-sans`}>
                                    We don&apos;t just build websites; we engineer strategic digital experiences designed to scale your business, convert visitors into loyal customers, and establish unshakeable industry authority.
                                </p>
                                <p className={`text-lg text-text-secondary leading-relaxed ${inter.variable} font-sans`}>
                                    Every project is a close strategic partnership. We immerse ourselves in your brand&apos;s unique challenges to deliver bespoke, high-performance solutions with obsessive attention to detail.
                                </p>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <div className="flex items-center gap-6">
                                <Link
                                    href="/studio"
                                    className="inline-flex items-center gap-2 text-text-primary hover:text-accent font-medium group transition-colors"
                                >
                                    More about us
                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                                <span className="w-12 h-px bg-border" />
                            </div>
                        </RevealOnScroll>
                    </div>

                </div>
            </div>
        </section>
    )
}
