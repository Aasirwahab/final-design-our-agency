import ContactContent from '@/components/sections/contact/ContactContent'

export const metadata = {
    title: 'Contact',
    description: 'Start a conversation with Webvoxel Studio.',
}

export default function ContactPage() {
    return (
        <main className="bg-bg-primary text-text-primary min-h-screen">
            <ContactContent />
        </main>
    )
}
