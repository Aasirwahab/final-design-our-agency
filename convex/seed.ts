import { mutation } from "./_generated/server";

// Seed the database with initial data from existing lib/data.ts
// Run this once after setting up Convex
export const seedAll = mutation({
    args: {},
    handler: async (ctx) => {
        // Check if already seeded
        const existingProjects = await ctx.db.query("projects").first();
        if (existingProjects) {
            console.log("Database already seeded. Skipping.");
            return "already_seeded";
        }

        // ─── Projects ───
        const projects = [
            {
                title: "Citylife",
                slug: "citylife",
                url: "https://citylife.lk/",
                tags: ["React", "Branding", "Design"],
                year: "2026",
                category: "Web & Branding",
                size: "large" as const,
                image: "/projects/citylife-branding-new-converter.webp",
                isPublished: true,
                order: 1,
            },
            {
                title: "Pappy's Arugambay",
                slug: "pappys-arugambay",
                url: "https://pappysarugambay.com/",
                tags: ["React", "Tailwind", "Booking System"],
                year: "2025",
                category: "Tourism",
                size: "small" as const,
                image: "/projects/Pappy's Arugambay.webp",
                isPublished: true,
                order: 2,
            },
            {
                title: "Kitesurfing Kalpitiya",
                slug: "kitesurfing-kalpitiya",
                url: "https://www.kitesurfingkalpitiya.com/",
                tags: ["Next.js", "Real-time", "Interactive"],
                year: "2025",
                category: "Tourism",
                size: "large" as const,
                image: "/projects/Kitesurfing Kalpitiya.webp",
                isPublished: true,
                order: 3,
            },
            {
                title: "Signature Aroma",
                slug: "signature-aroma",
                url: "https://www.signaturearoma.co.uk/",
                tags: ["Shopify", "Custom Theme"],
                year: "2025",
                category: "E-commerce",
                size: "small" as const,
                image: "/projects/Signature Aroma.webp",
                isPublished: true,
                order: 4,
            },
            {
                title: "Craft Clothing",
                slug: "craft-clothing",
                url: "#",
                tags: ["React", "Custom Design"],
                year: "2025",
                category: "E-commerce",
                size: "small" as const,
                image: "/projects/Craft Clothing.webp",
                isPublished: true,
                order: 5,
            },
            {
                title: "WavePOS Cloud",
                slug: "wavepos-cloud",
                url: "https://wavepos.lk/",
                tags: ["SaaS Platform"],
                year: "2025",
                category: "SaaS",
                size: "small" as const,
                image: "/projects/WavePOS Cloud.webp",
                isPublished: true,
                order: 6,
            },
        ];

        for (const project of projects) {
            await ctx.db.insert("projects", project);
        }

        // ─── Services ───
        const services = [
            { serviceId: "01", title: "Web Development", description: "Turn visitors into customers with fast, secure, high-performance websites built for growth.", image: "/services/web-development.png", order: 1 },
            { serviceId: "02", title: "App Development", description: "Deliver seamless mobile and web apps that engage users and scale with your product vision.", image: "/services/app-development.png", order: 2 },
            { serviceId: "03", title: "UI/UX Design", description: "Create intuitive user experiences that reduce friction and increase engagement.", image: "/services/uiux-design.png", order: 3 },
            { serviceId: "04", title: "Digital Marketing", description: "Attract the right audience and convert them using data-driven marketing strategies.", image: "/services/digital-marketing.png", order: 4 },
            { serviceId: "05", title: "AI Automation", description: "Save time, reduce costs, and eliminate manual processes using AI-powered automation.", image: "/services/ai-automation.png", order: 5 },
            { serviceId: "06", title: "Brand Identity", description: "Stand out in your market with a clear, consistent, and professional brand identity.", image: "/services/brand-identity.png", order: 6 },
        ];

        for (const service of services) {
            await ctx.db.insert("services", service);
        }

        // ─── Testimonials ───
        const testimonials = [
            { author: "Murshid", role: "Founder", company: "CityLife", quote: "Excellent experience with CityLife website! The UI/UX design looks awesome clean, modern, and very user-friendly. The entire website is well structured and feels like a fully complete, professional company platform. All functional services are properly implemented and work smoothly. A special mention to the team: great teamwork, clear communication, and perfect execution from start to finish. Highly satisfied with the overall quality and performance. Strongly recommended!", order: 1 },
            { author: "Sanju", role: "Owner", company: "Kitesurfing Kalpitiya", quote: "Our online presence was completely transformed by Webvoxel Studio! Our brand-new Next.js website for Kitesurfing Kalpitiya looks amazing, loads quickly, and presents everything our school has to offer in a clear, contemporary manner. Bookings and engagement have significantly increased, which thrilled Sanju and the team. They are responsive, professional, and genuinely enthusiastic about their work. Strongly suggested!", order: 2 },
            { author: "Shach bin Ahamed", role: "Executive", company: "Signature Aroma", quote: "Webvoxel Studio assisted us in growing Signature Aroma, our online business. Their Next.js solution greatly increased our revenues and made our website faster and more secure. They created a stunning, high-converting internet store after quickly understanding our objectives. Reliable, gifted, and results-oriented. We are ecstatic!", order: 3 },
            { author: "Hasni", role: "Director", company: "Craft Clothing", quote: "Excellent Webvoxel Studio experience! For Craft Clothing, they created a sophisticated Next.js e-commerce site that works seamlessly on all devices and tastefully showcases our jerseys. Customer interest has already surged due to their modern user interface, excellent code, and attention to detail. Excellent help and communication during the project.", order: 4 },
        ];

        for (const testimonial of testimonials) {
            await ctx.db.insert("testimonials", testimonial);
        }

        // ─── FAQs ───
        const faqs = [
            { question: "How long does a typical project take?", answer: "A standard corporate website or e-commerce platform takes between 6 to 10 weeks from discovery to launch. Complex web applications may take 3 to 4 months. We establish clear timelines during the strategy phase before we begin.", order: 1 },
            { question: "How do you price your web and app projects?", answer: "Every project is unique. We don't offer generic packages. We price based on the specific scope, complexity, and the business value we are delivering. After our initial consultation, we provide a detailed, custom proposal.", order: 2 },
            { question: "Do you use templates or custom designs?", answer: "100% custom. We never use pre-made, off-the-shelf templates. Every pixel is designed specifically for your brand's unique positioning and needs, ensuring you stand out in a saturated market.", order: 3 },
            { question: "What happens after the website goes live?", answer: "We offer comprehensive post-launch support and maintenance retainers. This includes critical security updates, uptime monitoring, content optimization, and strategic consulting to ensure your platform grows with your business.", order: 4 },
        ];

        for (const faq of faqs) {
            await ctx.db.insert("faqs", faq);
        }

        // ─── Process Steps ───
        const processSteps = [
            { stepId: "01", title: "Discovery & Strategy", description: "We dive deep into your business goals, target audience, and market landscape. We don't just take orders; we build a strategic roadmap designed for measurable growth and ROI.", order: 1 },
            { stepId: "02", title: "UX/UI Design", description: "Our design team crafts bespoke, high-fidelity interfaces. We prioritize user experience, ensuring every interaction is frictionless, intuitive, and visually aligned with a premium brand standard.", order: 2 },
            { stepId: "03", title: "Engineering & Dev", description: "We translate the design into a blazing-fast, scalable digital product. Using modern headless architectures and best-in-class frameworks, we build for performance, security, and longevity.", order: 3 },
            { stepId: "04", title: "Launch & Scale", description: "Deployment isn't the end. We rigorously test across all devices, optimize for technical SEO, ensure a flawless launch, and provide ongoing support to help your platform adapt and scale.", order: 4 },
        ];

        for (const step of processSteps) {
            await ctx.db.insert("processSteps", step);
        }

        // ─── Features ───
        const features = [
            { title: "Lightning Fast Delivery", description: "We deliver high-quality projects on time, every time. Our agile methodology ensures rapid development without compromising quality.", order: 1 },
            { title: "Expert Team", description: "Work with experienced developers, designers, and strategists who are passionate about creating exceptional digital experiences.", order: 2 },
            { title: "Proven Track Record", description: "25+ successful projects delivered across various industries. Our portfolio speaks for our expertise and commitment to excellence.", order: 3 },
            { title: "Scalable Solutions", description: "We build solutions that grow with your business. From startups to enterprises, our technology adapts to your needs.", order: 4 },
        ];

        for (const feature of features) {
            await ctx.db.insert("features", feature);
        }

        // ─── Company Info ───
        await ctx.db.insert("companyInfo", {
            name: "Webvoxel Studio",
            tagline: "Creating exceptional digital experiences that transform businesses and inspire innovation.",
            locations: ["UK (Head Office)", "Sri Lanka (Technology Center)"],
            email: "info@webvoxelstudio.uk",
            phone: "+44 7443 159478",
            linkedin: "https://www.linkedin.com/company/webvoxelstudio/",
            founded: 2024,
            stats: [
                { value: 25, label: "Projects", suffix: "+" },
                { value: 98, label: "Client Satisfaction", suffix: "%" },
                { value: 25, label: "Happy Clients", suffix: "+" },
                { value: 2, label: "Years Experience", suffix: "+" },
            ],
        });

        console.log("✅ Database seeded successfully!");
        return "seeded";
    },
});
