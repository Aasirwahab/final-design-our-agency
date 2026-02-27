'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PageTransitionProvider from '@/components/ui/PageTransitionProvider';
import SmoothScrolling from '@/components/ui/SmoothScrolling';

export default function NotFound() {
    return (
        <SmoothScrolling>
            <PageTransitionProvider>
                <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-black/5" />
                <main className="min-h-screen bg-[#0B1120] text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-accent selection:text-white">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] bg-accent/20 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 right-1/4 w-[50vw] h-[50vw] md:w-[25vw] md:h-[25vw] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen"
                    />

                    <div className="container relative z-10 flex flex-col items-center justify-center px-4 w-full h-full min-h-screen py-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex-1 min-h-[30vh] flex items-center justify-center w-full max-w-[100vw]"
                        >
                            {/* Main 404 Text */}
                            <h1
                                className="text-[8rem] sm:text-[14rem] md:text-[20rem] lg:text-[24rem] font-serif leading-none tracking-tighter mix-blend-overlay opacity-80 select-none text-center"
                                style={{ fontFamily: 'var(--font-display, ui-serif, Georgia, serif)' }}
                            >
                                404
                            </h1>

                            {/* Animated Glitch Layer */}
                            <motion.h1
                                className="absolute inset-0 flex items-center justify-center font-serif text-[8rem] sm:text-[14rem] md:text-[20rem] lg:text-[24rem] leading-none tracking-tighter text-transparent bg-clip-text select-none text-center z-10"
                                style={{
                                    fontFamily: 'var(--font-display, ui-serif, Georgia, serif)',
                                    backgroundImage: 'linear-gradient(135deg, var(--color-accent), #3b82f6)'
                                }}
                                animate={{
                                    clipPath: [
                                        "inset(0% 0 0% 0)",
                                        "inset(20% 0 60% 0)",
                                        "inset(80% 0 5% 0)",
                                        "inset(40% 0 40% 0)",
                                        "inset(0% 0 0% 0)"
                                    ],
                                    x: [0, -4, 4, -2, 0],
                                    opacity: [1, 0.9, 1, 0.9, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 5
                                }}
                            >
                                404
                            </motion.h1>

                            {/* Second Subtle Glitch Layer for glitch pop */}
                            <motion.h1
                                className="absolute inset-0 flex items-center justify-center font-serif text-[8rem] sm:text-[14rem] md:text-[20rem] lg:text-[24rem] leading-none tracking-tighter select-none text-center text-accent mix-blend-screen z-0 blur-[4px]"
                                style={{
                                    fontFamily: 'var(--font-display, ui-serif, Georgia, serif)',
                                }}
                                animate={{
                                    x: [0, 6, -6, 3, 0],
                                    opacity: [0, 0.4, 0, 0.2, 0]
                                }}
                                transition={{
                                    duration: 0.15,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 3.5
                                }}
                            >
                                404
                            </motion.h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-6 md:space-y-8 mt-4 sm:mt-8 md:mt-12 max-w-2xl mx-auto text-center relative z-20"
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white/95">
                                Lost in the void
                            </h2>
                            <p className="text-white/60 text-lg sm:text-xl font-light px-4">
                                The page you're searching for has drifted into the digital abyss. Let's guide you back to familiar territory.
                            </p>

                            <div className="pt-4 sm:pt-6">
                                <Link
                                    href="/"
                                    className="group relative inline-flex items-center gap-4 px-8 py-4 sm:px-10 sm:py-5 bg-white text-[#0B1120] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                                >
                                    <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] rounded-full" />
                                    <ArrowLeft className="w-5 h-5 relative z-10 group-hover:-translate-x-1 transition-transform group-hover:text-white" />
                                    <span className="relative z-10 font-medium sm:text-lg group-hover:text-white transition-colors duration-300">Return Home</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </PageTransitionProvider>
        </SmoothScrolling>
    );
}
