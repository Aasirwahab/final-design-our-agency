'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { Inconsolata } from 'next/font/google'
import MagneticButton from '@/components/ui/MagneticButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const inter = Inconsolata({ subsets: ['latin'], variable: '--font-inter' })

export default function ContactContent() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        details: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // form logic goes here
        console.log("Form submitted", formState)
        alert("Thank you! This is a demo form.")
    }

    const inputClasses = `w-full bg-transparent border-b border-border/50 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors duration-300 ${inter.variable} font-sans text-lg`

    return (
        <section className="relative w-full pt-32 md:pt-48 pb-24 md:pb-32 bg-bg-primary overflow-hidden min-h-screen">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">

                    {/* LEFT COLUMN: Info */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-start">
                        <RevealOnScroll>
                            <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight mb-8">
                                Let's Build <br />
                                <span className="text-text-secondary">Something</span> <br />
                                <span className="text-accent italic font-light">Extraordinary.</span>
                            </h1>
                            <p className={`text-text-secondary text-lg md:text-xl leading-relaxed mb-16 max-w-md ${inter.variable} font-sans`}>
                                Whether you need a full-scale application ecosystem or a high-converting digital presence, we are ready to ignite your next phase of growth.
                            </p>
                        </RevealOnScroll>

                        <div className="flex flex-col gap-12 mt-auto">
                            <RevealOnScroll delay={0.2} className="flex gap-6 items-start group">
                                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-accent transition-colors duration-500">
                                    <Mail className="w-5 h-5 text-text-primary group-hover:text-accent transition-colors duration-500" />
                                </div>
                                <div>
                                    <h3 className={`text-sm uppercase tracking-widest text-text-secondary mb-2 ${inter.variable} font-sans`}>Direct Inquiry</h3>
                                    <a href="mailto:hello@webvoxel.studio" className="text-2xl font-display hover:text-accent transition-colors duration-300">
                                        hello@webvoxel.studio
                                    </a>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay={0.3} className="flex gap-6 items-start group">
                                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-accent transition-colors duration-500">
                                    <MapPin className="w-5 h-5 text-text-primary group-hover:text-accent transition-colors duration-500" />
                                </div>
                                <div>
                                    <h3 className={`text-sm uppercase tracking-widest text-text-secondary mb-2 ${inter.variable} font-sans`}>Location</h3>
                                    <p className="text-2xl font-display">
                                        Globally Distributed.<br />
                                        <span className="text-text-secondary">Borderlessly Connected.</span>
                                    </p>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Form */}
                    <div className="w-full lg:w-7/12">
                        <RevealOnScroll delay={0.2}>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-12 bg-white shadow-2xl border border-gray-100 p-8 md:p-12 rounded-[2rem]">

                                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name *"
                                            required
                                            value={formState.name}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address *"
                                            required
                                            value={formState.email}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="Company Name"
                                            value={formState.company}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="w-full relative">
                                        <select
                                            name="budget"
                                            value={formState.budget}
                                            onChange={handleChange}
                                            required
                                            aria-label="Estimated Budget"
                                            className={`${inputClasses} appearance-none bg-transparent cursor-pointer ${formState.budget ? 'text-gray-900' : 'text-gray-400'}`}
                                        >
                                            <option value="" disabled className="bg-white text-gray-500">Estimated Budget *</option>
                                            <option value="10k-25k" className="bg-white text-gray-900">$10k - $25k</option>
                                            <option value="25k-50k" className="bg-white text-gray-900">$25k - $50k</option>
                                            <option value="50k-100k" className="bg-white text-gray-900">$50k - $100k</option>
                                            <option value="100k+" className="bg-white text-gray-900">$100k+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <textarea
                                        name="details"
                                        placeholder="Tell us about your project, goals, and vision... *"
                                        required
                                        rows={4}
                                        value={formState.details}
                                        onChange={handleChange}
                                        className={`${inputClasses} resize-none`}
                                    />
                                </div>

                                <div className="pt-8 flex flex-col-reverse md:flex-row md:justify-between items-start md:items-center gap-6 md:gap-4">
                                    <p className={`text-sm text-text-secondary w-full md:max-w-xs ${inter.variable} font-sans`}>
                                        By submitting, you agree to our privacy policy and terms of service.
                                    </p>
                                    <div className="w-full md:w-auto">
                                        <MagneticButton className="w-full md:w-auto flex justify-center">
                                            <span className="flex flex-row items-center gap-2">
                                                Send Inquiry <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </MagneticButton>
                                    </div>
                                </div>

                            </form>
                        </RevealOnScroll>
                    </div>

                </div>
            </div>
        </section>
    )
}
