import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Public: List all FAQs
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("faqs").withIndex("by_order").collect();
    },
});

// Admin: Create a FAQ
export const create = mutation({
    args: {
        question: v.string(),
        answer: v.string(),
    },
    handler: async (ctx, args) => {
        const all = await ctx.db.query("faqs").collect();
        const maxOrder = all.reduce((max, f) => Math.max(max, f.order), 0);
        return await ctx.db.insert("faqs", { ...args, order: maxOrder + 1 });
    },
});

// Admin: Update a FAQ
export const update = mutation({
    args: {
        id: v.id("faqs"),
        question: v.optional(v.string()),
        answer: v.optional(v.string()),
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

// Admin: Delete a FAQ
export const remove = mutation({
    args: { id: v.id("faqs") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// Admin: Reorder FAQs
export const reorder = mutation({
    args: { ids: v.array(v.id("faqs")) },
    handler: async (ctx, args) => {
        for (let i = 0; i < args.ids.length; i++) {
            await ctx.db.patch(args.ids[i], { order: i + 1 });
        }
    },
});
