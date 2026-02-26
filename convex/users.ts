import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get current user by Clerk ID
export const getByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();
    },
});

// List all users (admin only)
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    },
});

// Create/sync user from Clerk webhook
export const syncUser = mutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        name: v.string(),
        imageUrl: v.optional(v.string()),
        role: v.optional(v.union(
            v.literal("admin"),
            v.literal("editor"),
            v.literal("viewer")
        )),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                email: args.email,
                name: args.name,
                imageUrl: args.imageUrl,
                // Only update role on existing sync if passed explicitly, else keep prevailing
                ...(args.role && { role: args.role })
            });
            return existing._id;
        } else {
            // Unconditionally designate the core company email as admin.
            // All other users must rely on `args.role` provided via an Invitation.
            // If they signed up without an invitation (no args.role), they default to "viewer" 
            // but the frontend layout block will prevent them from rendering the Admin Dashboard regardless.
            const finalRole = args.email === "webvoxelstudio.uk@gmail.com"
                ? "admin"
                : (args.role || "viewer");

            return await ctx.db.insert("users", {
                clerkId: args.clerkId,
                email: args.email,
                name: args.name,
                imageUrl: args.imageUrl,
                role: finalRole as "admin" | "editor" | "viewer",
                createdAt: Date.now(),
            });
        }
    },
});

// Admin: Update user role
export const updateRole = mutation({
    args: {
        id: v.id("users"),
        role: v.union(
            v.literal("admin"),
            v.literal("editor"),
            v.literal("viewer")
        ),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { role: args.role });
    },
});

// Admin: Remove user
export const remove = mutation({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
