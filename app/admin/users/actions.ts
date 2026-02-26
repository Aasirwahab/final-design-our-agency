"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function inviteUser(email: string, role: string) {
    try {
        const client = await clerkClient();

        // 1. Send the invitation (for new users who don't have a Clerk account yet)
        const invitation = await client.invitations.createInvitation({
            emailAddress: email,
            publicMetadata: {
                role: role,
            },
            ignoreExisting: true,
        });

        // 2. Also try to find & update an EXISTING Clerk user with this email.
        //    This handles the case where the user already signed up with Google
        //    and the invitation metadata won't transfer automatically.
        try {
            const existingUsers = await client.users.getUserList({
                emailAddress: [email],
            });
            if (existingUsers.data.length > 0) {
                await client.users.updateUserMetadata(existingUsers.data[0].id, {
                    publicMetadata: { role },
                });
            }
        } catch {
            // Silently ignore — the user may not exist yet, which is fine.
            // They'll get the role from the invitation when they sign up.
        }

        return { success: true, invitationId: invitation.id };
    } catch (error: any) {
        console.error("Error creating invitation:", error);
        return { success: false, error: error.message || "Failed to invite user" };
    }
}

// Sync a role change back to Clerk's publicMetadata so the layout auth check works
export async function syncRoleToClerk(clerkId: string, role: string) {
    try {
        const client = await clerkClient();
        await client.users.updateUserMetadata(clerkId, {
            publicMetadata: { role },
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error syncing role to Clerk:", error);
        return { success: false, error: error.message };
    }
}
