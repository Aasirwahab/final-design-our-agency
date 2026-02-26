import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import Preloader from '@/components/ui/Preloader'
import PageTransitionProvider from '@/components/ui/PageTransitionProvider'
import SmoothScrolling from '@/components/ui/SmoothScrolling'

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SmoothScrolling>
            {/* Film grain overlay for organic texture */}
            <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] bg-black/5" />
            <Preloader />
            <CustomCursor />
            <PageTransitionProvider>
                <Navbar />
                <main className="grow pt-24">
                    {children}
                </main>
                <Footer />
            </PageTransitionProvider>
        </SmoothScrolling>
    )
}
