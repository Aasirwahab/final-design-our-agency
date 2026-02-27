import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("teamMembers")
            .withIndex("by_order")
            .collect();
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        role: v.string(),
        image: v.string(),
        position: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        // Enforce permissions if necessary (omitted here for simplicity, matching others)
        return await ctx.db.insert("teamMembers", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("teamMembers"),
        name: v.string(),
        role: v.string(),
        image: v.string(),
        position: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        return await ctx.db.patch(id, data);
    },
});

export const remove = mutation({
    args: { id: v.id("teamMembers") },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
});
