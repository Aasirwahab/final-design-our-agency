import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("studioValues")
            .withIndex("by_order")
            .collect();
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("studioValues", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("studioValues"),
        title: v.string(),
        description: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        return await ctx.db.patch(id, data);
    },
});

export const remove = mutation({
    args: { id: v.id("studioValues") },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
});
