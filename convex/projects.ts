import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Public: Get all published projects (for the public site)
export const listPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("projects")
            .withIndex("by_order")
            .filter((q) => q.eq(q.field("isPublished"), true))
            .collect();
    },
});

// Admin: Get all projects (including unpublished)
export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("projects").withIndex("by_order").collect();
    },
});

// Public: Get a single project by slug
export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("projects")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});

// Admin: Create a new project
export const create = mutation({
    args: {
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
    },
    handler: async (ctx, args) => {
        // Get current max order
        const projects = await ctx.db.query("projects").collect();
        const maxOrder = projects.reduce((max, p) => Math.max(max, p.order), 0);

        return await ctx.db.insert("projects", {
            ...args,
            order: maxOrder + 1,
        });
    },
});

// Admin: Update an existing project
export const update = mutation({
    args: {
        id: v.id("projects"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        url: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        year: v.optional(v.string()),
        category: v.optional(v.string()),
        size: v.optional(v.union(v.literal("large"), v.literal("small"))),
        image: v.optional(v.string()),
        description: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        // Filter out undefined values
        const cleanUpdates: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                cleanUpdates[key] = value;
            }
        }
        await ctx.db.patch(id, cleanUpdates);
    },
});

// Admin: Delete a project
export const remove = mutation({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// Admin: Reorder projects
export const reorder = mutation({
    args: {
        ids: v.array(v.id("projects")),
    },
    handler: async (ctx, args) => {
        for (let i = 0; i < args.ids.length; i++) {
            await ctx.db.patch(args.ids[i], { order: i + 1 });
        }
    },
});

// Admin: Toggle publish status
export const togglePublish = mutation({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.id);
        if (!project) throw new Error("Project not found");
        await ctx.db.patch(args.id, { isPublished: !project.isPublished });
    },
});
