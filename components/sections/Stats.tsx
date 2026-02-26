'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import AnimatedCounter from '../ui/AnimatedCounter'
import RevealOnScroll from '../ui/RevealOnScroll'

export default function Stats() {
    const companyInfo = useQuery(api.settings.getCompanyInfo)

    if (companyInfo === undefined) {
        return <section className="py-24 border-y border-border bg-bg-primary min-h-[300px]"></section>
    }

    if (!companyInfo || !companyInfo.stats || companyInfo.stats.length === 0) {
        return null
    }

    return (
        <section className="py-24 border-y border-border bg-bg-primary">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
                    {companyInfo.stats.map((stat, index) => (
                        <RevealOnScroll key={stat.label} delay={index * 0.1} className="flex flex-col items-center text-center">
                            <div className="font-display text-6xl md:text-7xl lg:text-8xl text-text-primary mb-4 flex items-end justify-center">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-sm tracking-widest uppercase text-text-muted font-medium">
                                {stat.label}
                            </p>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    )
}
