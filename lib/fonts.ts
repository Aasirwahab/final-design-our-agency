import { Inter, Instrument_Serif } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const instrumentSerif = Instrument_Serif({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
})
