import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/Sidebar";
import { Toaster } from "sonner";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
    title: "Admin Dashboard",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 1. Fetch user identity on the server exactly once per layout mount
    const user = await currentUser();

    // 2. If not signed in yet, allow through (middleware will redirect to sign-in page)
    if (user) {
        const email = user.primaryEmailAddress?.emailAddress;
        const role = user.publicMetadata?.role;

        // 3. Identify authorized conditions
        const isRootAdmin = email === "webvoxelstudio.uk@gmail.com";
        const isInvitedUser = !!role; // Has a role assigned via CMS Invites
        const isAuthorized = isRootAdmin || isInvitedUser;

        // 4. Complete Halt Screen for Unauthorized (but Authenticated) users
        if (!isAuthorized) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#060606] text-white p-6">
                    <div className="max-w-md w-full text-center space-y-6">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldAlert size={32} className="text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold font-display">Access Denied</h1>
                        <p className="text-white/40 text-sm">
                            You do not have permission to view the admin panel. Please sign in with an authorized account or request an invitation from the administrator.
                        </p>
                        <p className="text-white/20 text-xs">
                            Signed in as: {email}
                        </p>
                        <div className="pt-8">
                            <SignOutButton>
                                <button className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors">
                                    Sign out and return home
                                </button>
                            </SignOutButton>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="flex min-h-screen bg-[#060606] text-white">
            <Toaster theme="dark" position="top-right" richColors />
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
