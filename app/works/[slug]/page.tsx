import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { portfolio } from '@/lib/data'
import MagneticButton from '@/components/ui/MagneticButton'

interface PageProps {
    params: Promise<{ slug: string }>
}

export function generateStaticParams() {
    return portfolio.map((p) => ({
        slug: p.slug,
    }))
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params
    const project = portfolio.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-bg-primary pt-32 md:pt-40 pb-24">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">

                {/* Back button */}
                <div className="mb-12">
                    <Link href="/works" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm font-medium">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180">
                            <path d="M1 7h12M13 7l-6-6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to all projects
                    </Link>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold tracking-widest text-accent uppercase mb-4">{project.category}</p>
                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-text-primary">
                            {project.title}
                        </h1>
                        <p className="text-xl text-text-secondary leading-relaxed">
                            A comprehensive deep dive into how we engineered a digital solution designed entirely around the client&apos;s strategic objectives and target audience.
                        </p>
                    </div>
                    {project.url !== "#" && (
                        <div className="shrink-0 flex items-end">
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-bg-primary bg-text-primary hover:bg-accent hover:text-white px-6 py-3.5 rounded-full transition-all duration-300 font-medium">
                                Visit Live Website
                                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-1 border-b border-transparent">
                                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border mb-16">
                    <div>
                        <p className="text-sm text-text-muted uppercase mb-1 font-medium">Client</p>
                        <p className="text-text-primary font-medium">{project.title}</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-muted uppercase mb-1 font-medium">Year</p>
                        <p className="text-text-primary font-medium">{project.year}</p>
                    </div>
                    <div className="col-span-2 md:col-span-2">
                        <p className="text-sm text-text-muted uppercase mb-2 font-medium">Technologies</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-border text-text-secondary">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden relative mb-24 border border-border shadow-md">
                    <Image
                        src={project.image}
                        alt={`Case Study: ${project.title}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* The Story */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
                    <div className="md:col-span-4">
                        <h2 className="font-display text-3xl text-text-primary sticky top-24">
                            The Challenge &<br />Our Approach
                        </h2>
                    </div>
                    <div className="md:col-span-8 flex flex-col gap-10 text-lg text-text-secondary leading-relaxed font-sans">
                        <p>
                            When <strong>{project.title}</strong> approached us, they were facing a significant challenge in their highly competitive market. Their digital presence did not accurately reflect the high quality of their service, leading to friction in user acquisition and brand trust. They needed a holistic redesign and a modernized technology stack to drive measurable growth.
                        </p>
                        <p>
                            We began with a strategic discovery phase. By auditing their existing user flows and holding deep-dive sessions with stakeholders, we identified the core bottlenecks. The primary goal quickly shifted from &quot;just a visual refresh&quot; to architecting a cohesive, high-performance platform capable of scaling with their ambitions.
                        </p>
                        <div className="bg-bg-elevated/50 p-8 rounded-xl border border-border mt-4">
                            <h3 className="font-display text-2xl text-text-primary mb-4">Key Deliverables</h3>
                            <ul className="list-disc pl-5 space-y-2 text-base">
                                <li>End-to-end UI/UX architecture designed for conversion.</li>
                                <li>Migration to a scalable, headless framework for blazing-fast load times.</li>
                                <li>Implementation of a bespoke design system.</li>
                                <li>Strategic copywriting aligned with client goals.</li>
                            </ul>
                        </div>
                        <p>
                            Through iterative design loops and rapid prototyping, we arrived at a solution that seamlessly merged premium aesthetics with backend technical excellence. The resulting platform not only elevates the brand&apos;s authority but actively pushes visitors toward key conversion metrics through strategically placed CTAs and friction-reducing layouts.
                        </p>
                    </div>
                </div>

                {/* Let's Talk CTA */}
                <div className="mt-32 pt-20 border-t border-border flex flex-col items-center text-center">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
                        Ready to build your success story?
                    </h2>
                    <p className="text-xl text-text-secondary max-w-xl mb-10">
                        Stop losing customers to a confusing digital presence. Let&apos;s build a premium website that turns visitors into revenue.
                    </p>
                    <MagneticButton href="/contact" variant="primary">
                        Start your project →
                    </MagneticButton>
                </div>
            </div>
        </main>
    )
}
