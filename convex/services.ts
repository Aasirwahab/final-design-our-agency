import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Public: List all services
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("services").withIndex("by_order").collect();
    },
});

// Admin: Create a service
export const create = mutation({
    args: {
        serviceId: v.string(),
        title: v.string(),
        description: v.string(),
        image: v.string(),
    },
    handler: async (ctx, args) => {
        const services = await ctx.db.query("services").collect();
        const maxOrder = services.reduce((max, s) => Math.max(max, s.order), 0);
        return await ctx.db.insert("services", { ...args, order: maxOrder + 1 });
    },
});

// Admin: Update a service
export const update = mutation({
    args: {
        id: v.id("services"),
        serviceId: v.optional(v.string()),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
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

// Admin: Delete a service
export const remove = mutation({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// Admin: Reorder services
export const reorder = mutation({
    args: { ids: v.array(v.id("services")) },
    handler: async (ctx, args) => {
        for (let i = 0; i < args.ids.length; i++) {
            await ctx.db.patch(args.ids[i], { order: i + 1 });
        }
    },
});
