import RevealOnScroll from '../ui/RevealOnScroll'
import MagneticButton from '../ui/MagneticButton'
import { features } from '@/lib/data'

export default function WhyUs() {
    return (
        <section className="py-24 md:py-32 bg-bg-primary overflow-hidden border-y border-border">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

                    {/* Left Column - Heading */}
                    <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
                        <RevealOnScroll>
                            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8">
                                What sets<br />us apart
                            </h2>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.1}>
                            <p className="text-xl text-text-secondary leading-relaxed max-w-md">
                                We combine technical excellence with creative innovation to deliver solutions that drive real business results.
                            </p>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column - Features List */}
                    <div className="lg:col-span-7">
                        <div className="flex flex-col gap-12 sm:gap-16">
                            {features.map((feature, index) => (
                                <RevealOnScroll key={feature.title} delay={0.1 + (index * 0.1)}>
                                    <div className="flex flex-col sm:flex-row gap-6 relative group">
                                        <div className="shrink-0 mt-2">
                                            <div className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center text-text-muted group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5 transition-all duration-500">
                                                <span className="font-display text-xl">0{index + 1}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-display text-text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                            <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Sub-section CTA */}
                <RevealOnScroll delay={0.2} className="mt-20 pt-12 border-t border-border/50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 bg-bg-elevated/30 rounded-2xl p-8 md:p-12 border border-border/50 shadow-sm relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

                        <div className="relative z-10 text-center sm:text-left">
                            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-text-primary mb-3">Ready to transform your digital presence?</h3>
                            <p className="text-text-secondary text-lg">Get a free consultation and project estimate.</p>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <MagneticButton href="/contact" variant="primary">
                                Let&apos;s talk →
                            </MagneticButton>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    )
}
