import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Projects / Portfolio
    projects: defineTable({
        title: v.string(),
        slug: v.string(),
        url: v.string(),
        tags: v.array(v.string()),
        year: v.string(),
        category: v.string(),
        size: v.union(v.literal("large"), v.literal("small")),
        image: v.string(),
        description: v.optional(v.string()),
        isPublished: v.boolean(),
        order: v.number(),
    }).index("by_slug", ["slug"])
        .index("by_order", ["order"])
        .index("by_published", ["isPublished"]),

    // Services
    services: defineTable({
        serviceId: v.string(), // "01", "02", etc.
        title: v.string(),
        description: v.string(),
        image: v.string(),
        order: v.number(),
    }).index("by_order", ["order"]),

    // Testimonials
    testimonials: defineTable({
        author: v.string(),
        role: v.string(),
        company: v.string(),
        quote: v.string(),
        order: v.number(),
    }).index("by_order", ["order"]),

    // FAQs
    faqs: defineTable({
        question: v.string(),
        answer: v.string(),
        order: v.number(),
    }).index("by_order", ["order"]),

    // Process Steps
    processSteps: defineTable({
        stepId: v.string(), // "01", "02", etc.
        title: v.string(),
        description: v.string(),
        order: v.number(),
    }).index("by_order", ["order"]),

    // Features / "What sets us apart"
    features: defineTable({
        title: v.string(),
        description: v.string(),
        order: v.number(),
    }).index("by_order", ["order"]),

    // Studio: Team Members
    teamMembers: defineTable({
        name: v.string(),
        role: v.string(),
        image: v.string(),
        position: v.string(), // CSS positioning, e.g., 'object-top'
        order: v.number(),
    }).index("by_order", ["order"]),

    // Studio: "What Drives Us Forward"
    studioValues: defineTable({
        title: v.string(),
        description: v.string(),
        order: v.number(),
    }).index("by_order", ["order"]),

    // Company Info (singleton pattern - one document)
    companyInfo: defineTable({
        name: v.string(),
        tagline: v.string(),
        locations: v.array(v.string()),
        email: v.string(),
        phone: v.string(),
        linkedin: v.string(),
        founded: v.number(),
        stats: v.array(
            v.object({
                value: v.number(),
                label: v.string(),
                suffix: v.string(),
            })
        ),
    }),

    // Users (synced from Clerk)
    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        name: v.string(),
        imageUrl: v.optional(v.string()),
        role: v.union(
            v.literal("admin"),
            v.literal("editor"),
            v.literal("viewer")
        ),
        createdAt: v.number(),
    }).index("by_clerkId", ["clerkId"])
        .index("by_email", ["email"]),
});
