"use client";

import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useState, useEffect } from "react";
import { Shield, ShieldCheck, Eye, Trash2, UserPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { inviteUser, syncRoleToClerk } from "./actions";

const roleConfig = {
    admin: { label: "Admin", color: "text-purple-400", bg: "bg-purple-500/10", icon: ShieldCheck },
    editor: { label: "Editor", color: "text-blue-400", bg: "bg-blue-500/10", icon: Shield },
    viewer: { label: "Viewer", color: "text-gray-400", bg: "bg-gray-500/10", icon: Eye },
};

export default function UsersPage() {
    const { user: clerkUser } = useUser();
    const users = useQuery(api.users.list);
    const currentUser = useQuery(
        api.users.getByClerkId,
        clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
    );
    const syncUser = useMutation(api.users.syncUser);
    const updateRole = useMutation(api.users.updateRole);
    const removeUser = useMutation(api.users.remove);

    const [deleteConfirm, setDeleteConfirm] = useState<Id<"users"> | null>(null);

    // Invite Modal States
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("viewer");
    const [inviteLoading, setInviteLoading] = useState(false);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setInviteLoading(true);

        const result = await inviteUser(inviteEmail, inviteRole);

        if (result.success) {
            toast.success("Invitation sent successfully!");
            setInviteEmail("");
            setInviteRole("viewer");
            setShowInviteModal(false);
        } else {
            toast.error(result.error || "Failed to send invitation.");
        }
        setInviteLoading(false);
    };

    const handleUpdateRole = async (id: Id<"users">, newRole: "admin" | "editor" | "viewer", clerkId: string) => {
        try {
            await updateRole({ id, role: newRole });
            // Sync the role to Clerk so the layout auth check recognizes them
            await syncRoleToClerk(clerkId, newRole);
            toast.success("User role updated");
        } catch (error) {
            toast.error("Failed to update user role");
        }
    }

    const handleRemoveUser = async () => {
        if (!deleteConfirm) return;
        try {
            await removeUser({ id: deleteConfirm });
            toast.success("User removed from workspace");
            setDeleteConfirm(null);
        } catch (error) {
            toast.error("Failed to remove user");
        }
    }

    // Auto-sync current user on first visit
    useEffect(() => {
        if (clerkUser && !currentUser) {
            syncUser({
                clerkId: clerkUser.id,
                email: clerkUser.primaryEmailAddress?.emailAddress || "",
                name: clerkUser.fullName || clerkUser.firstName || "User",
                imageUrl: clerkUser.imageUrl,
                role: clerkUser.publicMetadata?.role as "admin" | "editor" | "viewer" | undefined,
            });
        }
    }, [clerkUser, currentUser, syncUser]);

    const isAdmin = currentUser?.role === "admin";

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Users</h1>
                    <p className="text-white/40 mt-1">Manage team access and roles</p>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] text-white hover:bg-white/[0.04] transition-colors text-sm font-medium"
                    >
                        <UserPlus size={16} />
                        <span>Invite User</span>
                    </button>
                )}
            </div>

            {!isAdmin && (
                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4 mb-6">
                    <p className="text-yellow-400 text-sm">
                        Only admins can manage user roles. Contact an admin to change permissions.
                    </p>
                </div>
            )}

            <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
                {!users ? (
                    <div className="p-12 text-center text-white/30">Loading...</div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center text-white/30">No users found.</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">User</th>
                                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Role</th>
                                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Joined</th>
                                {isAdmin && <th className="text-right px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => {
                                const role = roleConfig[u.role];
                                const RoleIcon = role.icon;
                                const isCurrentUser = u.clerkId === clerkUser?.id;
                                return (
                                    <tr key={u._id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {u.imageUrl ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={u.imageUrl} alt="" className="w-8 h-8 rounded-full" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center text-white/50 text-xs font-bold">
                                                        {u.name[0]?.toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-white/90 text-sm font-medium">
                                                        {u.name} {isCurrentUser && <span className="text-white/30">(you)</span>}
                                                    </p>
                                                    <p className="text-white/30 text-xs">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {isAdmin && !isCurrentUser ? (
                                                <select
                                                    value={u.role}
                                                    aria-label="Change user role"
                                                    onChange={(e) => handleUpdateRole(u._id, e.target.value as "admin" | "editor" | "viewer", u.clerkId)}
                                                    className={`text-xs px-3 py-1.5 rounded-lg ${role.bg} ${role.color} border-0 focus:outline-none cursor-pointer bg-transparent`}
                                                >
                                                    <option value="admin" className="bg-[#0a0a0a] text-white">Admin</option>
                                                    <option value="editor" className="bg-[#0a0a0a] text-white">Editor</option>
                                                    <option value="viewer" className="bg-[#0a0a0a] text-white">Viewer</option>
                                                </select>
                                            ) : (
                                                <span className={`text-xs px-2.5 py-1 rounded-full ${role.bg} ${role.color} flex items-center gap-1 w-fit`}>
                                                    <RoleIcon size={12} /> {role.label}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-white/40 text-sm">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-4 text-right">
                                                {!isCurrentUser && (
                                                    <button aria-label="Remove user" onClick={() => setDeleteConfirm(u._id)} className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                        <h3 className="text-white font-semibold text-lg">Remove User?</h3>
                        <p className="text-white/40 text-sm mt-2">This will remove the user&apos;s access to the admin panel.</p>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-white/60 text-sm hover:bg-white/[0.04]">Cancel</button>
                            <button onClick={handleRemoveUser} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50">Remove</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invite User Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                        <h3 className="text-white font-semibold text-lg mb-1">Invite New Team Member</h3>
                        <p className="text-white/40 text-sm mb-6">Send an email invitation allowing a user to join this CMS workspace.</p>

                        <form onSubmit={handleInvite} className="space-y-4">
                            <div>
                                <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="colleague@company.com"
                                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">Initial Role</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {Object.entries(roleConfig).map(([key, config]) => {
                                        const Icon = config.icon;
                                        const isSelected = inviteRole === key;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setInviteRole(key)}
                                                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${isSelected ? 'bg-white/[0.08] border-white/[0.2] shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white' : 'bg-white/[0.02] border-white/[0.06] text-white/40 hover:bg-white/[0.04] hover:text-white/60'}`}
                                            >
                                                <Icon size={18} className={isSelected ? config.color : ''} />
                                                <span className="text-xs font-medium">{config.label}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8 pt-4 border-t border-white/[0.06]">
                                <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-white/60 text-sm font-medium hover:bg-white/[0.04] transition-colors">Cancel</button>
                                <button disabled={inviteLoading || !inviteEmail} type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {inviteLoading ? <Loader2 size={16} className="animate-spin" /> : "Send Invitation"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
