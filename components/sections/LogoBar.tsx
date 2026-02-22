import { techLogos } from '@/lib/data'

export default function LogoBar() {
    return (
        <section className="py-12 border-y border-border overflow-hidden bg-bg-secondary flex flex-col items-center">
            <p className="text-xs font-medium tracking-widest text-text-muted uppercase mb-8">
                Technologies we work with
            </p>

            <div className="relative w-full flex overflow-hidden group">
                <div className="flex animate-[marquee_30s_linear_infinite] group-hover:animate-[marquee_60s_linear_infinite] whitespace-nowrap">
                    {techLogos.concat(techLogos).map(({ name, Icon }, index) => (
                        <div
                            key={index}
                            className="px-12 md:px-16 flex items-center gap-3 text-xl md:text-2xl font-display text-text-secondary opacity-60 hover:opacity-100 hover:text-text-primary transition-all duration-300 cursor-default"
                        >
                            <Icon className="w-6 h-6 md:w-8 md:h-8" />
                            {name}
                        </div>
                    ))}
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-32 bg-linear-to-r from-bg-secondary to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-32 bg-linear-to-l from-bg-secondary to-transparent z-10" />
            </div>
        </section>
    )
}
