import type { Metadata, Viewport } from 'next'
import { inter, instrumentSerif } from '@/lib/fonts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import Preloader from '@/components/ui/Preloader'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    template: '%s | Webvoxel Studio',
    default: 'Webvoxel Studio | Premium Digital Agency',
  },
  description: 'Creating exceptional digital experiences that transform businesses and inspire innovation.',
  metadataBase: new URL('https://webvoxelstudio.uk'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} bg-bg-primary text-text-primary antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        {/* Film grain overlay for organic texture */}
        <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] bg-black/5" />
        <Preloader />
        <CustomCursor />
        <Navbar />
        <main className="grow pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
