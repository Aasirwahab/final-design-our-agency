export const metadata = {
    title: 'Studio | Webvoxel',
    description: 'Learn more about Webvoxel Studio and our leading digital solutions.',
}

import StudioContent from '@/components/sections/studio/StudioContent'
import GlobalPresence from '@/components/sections/studio/GlobalPresence'
import LogoBar from '@/components/sections/LogoBar'
import CultureGallery from '@/components/sections/studio/CultureGallery'
import CareersBanner from '@/components/sections/studio/CareersBanner'

export default function StudioPage() {
    return (
        <>
            <StudioContent />
            <GlobalPresence />
            <CultureGallery />
            <LogoBar />
            <CareersBanner />
        </>
    )
}
