'use client'

import { useState, useEffect } from 'react'
import { inter } from '@/lib/fonts'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

export default function LondonTime() {
    const [time, setTime] = useState<string>('')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const updateTime = () => {
            const londonTime = new Date().toLocaleTimeString('en-GB', {
                timeZone: 'Europe/London',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
            setTime(`${londonTime} GMT`)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    if (!mounted) {
        return <div className="h-6 w-32 bg-white/5 animate-pulse rounded" />
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center gap-2 text-white/50 text-sm ${inter.variable} font-sans uppercase tracking-widest`}
        >
            <Clock className="w-4 h-4 text-accent" />
            <span>London</span>
            <span className="w-1 h-1 rounded-full bg-white/30 mx-1" />
            <span className="tabular-nums text-white/80">{time}</span>
        </motion.div>
    )
}
