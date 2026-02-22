import type { Metadata, Viewport } from 'next'
import { inter, instrumentSerif } from '@/lib/fonts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
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
        <div className="pointer-events-none fixed inset-0 z-100 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
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
