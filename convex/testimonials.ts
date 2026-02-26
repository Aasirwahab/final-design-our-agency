import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Public: List all testimonials
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("testimonials").withIndex("by_order").collect();
    },
});

// Admin: Create a testimonial
export const create = mutation({
    args: {
        author: v.string(),
        role: v.string(),
        company: v.string(),
        quote: v.string(),
    },
    handler: async (ctx, args) => {
        const all = await ctx.db.query("testimonials").collect();
        const maxOrder = all.reduce((max, t) => Math.max(max, t.order), 0);
        return await ctx.db.insert("testimonials", { ...args, order: maxOrder + 1 });
    },
});

// Admin: Update a testimonial
export const update = mutation({
    args: {
        id: v.id("testimonials"),
        author: v.optional(v.string()),
        role: v.optional(v.string()),
        company: v.optional(v.string()),
        quote: v.optional(v.string()),
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

// Admin: Delete a testimonial
export const remove = mutation({
    args: { id: v.id("testimonials") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// Admin: Reorder testimonials
export const reorder = mutation({
    args: { ids: v.array(v.id("testimonials")) },
    handler: async (ctx, args) => {
        for (let i = 0; i < args.ids.length; i++) {
            await ctx.db.patch(args.ids[i], { order: i + 1 });
        }
    },
});
