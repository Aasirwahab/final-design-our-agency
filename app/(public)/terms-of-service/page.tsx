import LegalContentLayout from '@/components/ui/LegalContentLayout'
import { FileText } from 'lucide-react'

export const metadata = {
    title: 'Terms of Service | Webvoxel Studio',
    description: 'Read the Terms of Service for Webvoxel Studio.',
}

const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'services', title: 'Our Services' },
    { id: 'user-responsibilities', title: 'User Responsibilities' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'payment', title: 'Payment Terms' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'changes', title: 'Changes to Terms' },
    { id: 'contact', title: 'Contact Us' },
]

export default function TermsOfServicePage() {
    return (
        <LegalContentLayout
            title="Terms of Service"
            icon={<FileText className="w-5 h-5" />}
            lastUpdated="November 24, 2025"
            sections={sections}
        >
            <section id="acceptance">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Acceptance of Terms</h2>
                <p>
                    By accessing and using the website and services of Webvoxel Studio ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or services.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="services">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Our Services</h2>
                <p className="mb-4">
                    Webvoxel Studio provides digital product design, web development, and related agency services. The specific deliverables, timelines, and scope of work for any project will be agreed upon in a separate Statement of Work (SOW) or project contract.
                </p>
                <p>
                    We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="user-responsibilities">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">User Responsibilities</h2>
                <p className="mb-4">
                    When using our website or engaging our services, you agree to:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2">
                    <li>Provide accurate, current, and complete information as requested.</li>
                    <li>Ensure you have the rights to any assets (images, text, data) you provide to us for use in your project.</li>
                    <li>Not use our services for any illegal, unauthorized, or unethical purposes.</li>
                    <li>Not attempt to disrupt or compromise the integrity or security of our website and systems.</li>
                </ul>
            </section>

            <hr className="border-border/50" />

            <section id="intellectual-property">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Intellectual Property</h2>
                <p className="mb-4">
                    Upon full payment for our completed services, the intellectual property rights to the final deliverables will be transferred to you as specified in our project contract.
                </p>
                <p>
                    Webvoxel Studio retains the right to display the completed project in our portfolio, case studies, and marketing materials unless a specific intellectual property or non-disclosure agreement indicates otherwise. Pre-existing tools, libraries, and frameworks used to create the deliverables remain the property of their respective owners.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="payment">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Payment Terms</h2>
                <p className="mb-4">
                    Payment schedules and amounts will be detailed in your project proposal or contract. Typically, we require an upfront deposit before commencing work, with subsequent milestones or a final invoice upon completion.
                </p>
                <p>
                    Failure to make timely payments may result in the suspension of services or delay in project delivery until the outstanding balance is resolved.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="limitation-liability">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by applicable law, Webvoxel Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of your connection with or use of our website or services.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="changes">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Changes to Terms</h2>
                <p>
                    We reserve the right to update or modify these Terms of Service at any time. Any changes will be effective immediately upon posting to this page. Your continued use of the website or services following the posting of revised terms means that you accept and agree to the changes.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="contact">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Contact Us</h2>
                <p className="mb-6">
                    If you have any questions or concerns about these Terms of Service, please reach out to us:
                </p>
                <div className="bg-white/50 border border-border/50 rounded-2xl p-8">
                    <h4 className="text-xl font-display font-bold text-text-primary mb-4">Webvoxel Studio</h4>
                    <div className="space-y-3">
                        <p><strong className="text-text-primary mr-2">Email:</strong> <a href="mailto:info@webvoxelstudio.uk" className="text-accent hover:underline transition-all">info@webvoxelstudio.uk</a></p>
                        <p><strong className="text-text-primary mr-2">Phone:</strong> <a href="tel:+447443159478" className="text-accent hover:underline transition-all">+44 7443 159478</a></p>
                        <p><strong className="text-text-primary mr-2">Address:</strong> 98 Roman Lane, Southwater RH13 9AG, UK</p>
                    </div>
                </div>
            </section>
        </LegalContentLayout>
    )
}
