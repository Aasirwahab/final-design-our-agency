import type { Metadata, Viewport } from 'next'
import { inter, instrumentSerif } from '@/lib/fonts'
import ConvexClerkProvider from '@/components/providers/ConvexClerkProvider'
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
        <ConvexClerkProvider>
          {children}
        </ConvexClerkProvider>
      </body>
    </html>
  )
}
