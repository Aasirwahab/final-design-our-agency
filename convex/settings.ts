import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ─── Company Info (singleton) ───

export const getCompanyInfo = query({
    args: {},
    handler: async (ctx) => {
        const info = await ctx.db.query("companyInfo").first();
        return info;
    },
});

export const updateCompanyInfo = mutation({
    args: {
        name: v.optional(v.string()),
        tagline: v.optional(v.string()),
        locations: v.optional(v.array(v.string())),
        email: v.optional(v.string()),
        phone: v.optional(v.string()),
        linkedin: v.optional(v.string()),
        founded: v.optional(v.number()),
        stats: v.optional(
            v.array(
                v.object({
                    value: v.number(),
                    label: v.string(),
                    suffix: v.string(),
                })
            )
        ),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("companyInfo").first();
        const cleanUpdates: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(args)) {
            if (value !== undefined) cleanUpdates[key] = value;
        }

        if (existing) {
            await ctx.db.patch(existing._id, cleanUpdates);
        } else {
            // Create the singleton if it doesn't exist
            await ctx.db.insert("companyInfo", {
                name: args.name ?? "",
                tagline: args.tagline ?? "",
                locations: args.locations ?? [],
                email: args.email ?? "",
                phone: args.phone ?? "",
                linkedin: args.linkedin ?? "",
                founded: args.founded ?? 2024,
                stats: args.stats ?? [],
            });
        }
    },
});

// ─── Process Steps ───

export const listProcessSteps = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("processSteps").withIndex("by_order").collect();
    },
});

export const createProcessStep = mutation({
    args: {
        stepId: v.string(),
        title: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        const all = await ctx.db.query("processSteps").collect();
        const maxOrder = all.reduce((max, s) => Math.max(max, s.order), 0);
        return await ctx.db.insert("processSteps", { ...args, order: maxOrder + 1 });
    },
});

export const updateProcessStep = mutation({
    args: {
        id: v.id("processSteps"),
        stepId: v.optional(v.string()),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const cleanUpdates: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) cleanUpdates[key] = value;
        }
        await ctx.db.patch(id, cleanUpdates);
    },
});

export const removeProcessStep = mutation({
    args: { id: v.id("processSteps") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// ─── Features ───

export const listFeatures = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("features").withIndex("by_order").collect();
    },
});

export const createFeature = mutation({
    args: {
        title: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        const all = await ctx.db.query("features").collect();
        const maxOrder = all.reduce((max, f) => Math.max(max, f.order), 0);
        return await ctx.db.insert("features", { ...args, order: maxOrder + 1 });
    },
});

export const updateFeature = mutation({
    args: {
        id: v.id("features"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const cleanUpdates: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) cleanUpdates[key] = value;
        }
        await ctx.db.patch(id, cleanUpdates);
    },
});

export const removeFeature = mutation({
    args: { id: v.id("features") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
