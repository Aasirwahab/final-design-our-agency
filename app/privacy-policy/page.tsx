import LegalContentLayout from '@/components/ui/LegalContentLayout'
import { Shield } from 'lucide-react'

export const metadata = {
    title: 'Privacy Policy | Webvoxel Studio',
    description: 'Learn how Webvoxel Studio collects, uses, and protects your personal information.',
}

const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'information-use', title: 'How We Use Your Information' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'your-rights', title: 'Your Privacy Rights' },
    { id: 'security', title: 'Data Security' },
    { id: 'contact', title: 'Contact Us' },
]

export default function PrivacyPolicyPage() {
    return (
        <LegalContentLayout
            title="Privacy Policy"
            icon={<Shield className="w-5 h-5" />}
            lastUpdated="November 24, 2025"
            sections={sections}
        >
            <section id="introduction">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Introduction</h2>
                <p>
                    At Webvoxel Studio, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p>
                    By accessing or using our services, you agree to the terms outlined in this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="information-collection">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Information We Collect</h2>

                <h3 className="text-xl font-semibold text-text-primary mb-4">Personal Information</h3>
                <p className="mb-4">
                    We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 mb-8">
                    <li>Fill out contact forms or request information about our services</li>
                    <li>Subscribe to our newsletter or marketing communications</li>
                    <li>Participate in surveys, contests, or promotions</li>
                    <li>Create an account or register for our services</li>
                    <li>Communicate with us via email, phone, or social media</li>
                </ul>

                <h3 className="text-xl font-semibold text-text-primary mb-4">Automatically Collected Information</h3>
                <p className="mb-4">
                    When you visit our website, we automatically collect certain information about your device and browsing behavior, including:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website and search terms used</li>
                    <li>Cookies and similar tracking technologies</li>
                </ul>
            </section>

            <hr className="border-border/50" />

            <section id="information-use">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">How We Use Your Information</h2>
                <p className="mb-8">
                    We use the information we collect for various purposes, including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/50 border border-border/50 rounded-2xl p-6">
                        <h4 className="font-semibold text-text-primary mb-2">Service Delivery</h4>
                        <p className="text-sm">Providing, maintaining, and improving our services to meet your needs</p>
                    </div>
                    <div className="bg-white/50 border border-border/50 rounded-2xl p-6">
                        <h4 className="font-semibold text-text-primary mb-2">Communication</h4>
                        <p className="text-sm">Responding to inquiries, sending updates, and providing customer support</p>
                    </div>
                    <div className="bg-white/50 border border-border/50 rounded-2xl p-6">
                        <h4 className="font-semibold text-text-primary mb-2">Analytics</h4>
                        <p className="text-sm">Understanding how users interact with our website to enhance user experience</p>
                    </div>
                    <div className="bg-white/50 border border-border/50 rounded-2xl p-6">
                        <h4 className="font-semibold text-text-primary mb-2">Marketing</h4>
                        <p className="text-sm">Sending promotional materials and updates about our services (with your consent)</p>
                    </div>
                </div>
            </section>

            <hr className="border-border/50" />

            <section id="information-sharing">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Information Sharing</h2>
                <p className="mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                    <li><strong className="text-text-primary">Service Providers:</strong> With trusted third-party vendors who assist us in operating our website and providing services</li>
                    <li><strong className="text-text-primary">Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
                    <li><strong className="text-text-primary">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li><strong className="text-text-primary">With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                </ul>
            </section>

            <hr className="border-border/50" />

            <section id="data-retention">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Data Retention</h2>
                <p className="mb-4">
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
                <p>
                    The retention period depends on the type of information and the purpose for which it was collected. For example, we may retain contact information for marketing purposes until you unsubscribe, and transaction records for accounting and legal compliance purposes.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="your-rights">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Your Privacy Rights</h2>
                <p className="mb-6">
                    Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <div className="bg-accent/5 border-l-4 border-accent rounded-r-2xl p-6 mb-8">
                    <ul className="space-y-4 list-none m-0 p-0">
                        <li className="flex items-start gap-3">
                            <span className="text-accent mt-1">●</span>
                            <span><strong className="text-text-primary">Access:</strong> Request access to the personal information we hold about you</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent mt-1">●</span>
                            <span><strong className="text-text-primary">Correction:</strong> Request correction of inaccurate or incomplete information</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent mt-1">●</span>
                            <span><strong className="text-text-primary">Deletion:</strong> Request deletion of your personal information</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent mt-1">●</span>
                            <span><strong className="text-text-primary">Opt-out:</strong> Unsubscribe from marketing communications at any time</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent mt-1">●</span>
                            <span><strong className="text-text-primary">Data Portability:</strong> Request a copy of your data in a structured format</span>
                        </li>
                    </ul>
                </div>
                <p>
                    To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="security">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Data Security</h2>
                <p className="mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 mb-6">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Employee training on data protection practices</li>
                    <li>Secure backup and disaster recovery procedures</li>
                </ul>
                <p>
                    However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
                </p>
            </section>

            <hr className="border-border/50" />

            <section id="contact">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Contact Us</h2>
                <p className="mb-6">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
