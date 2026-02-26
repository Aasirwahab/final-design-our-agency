"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    FolderKanban,
    Wrench,
    MessageSquareQuote,
    HelpCircle,
    Settings,
    Users,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Services", href: "/admin/services", icon: Wrench },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { label: "Settings", href: "/admin/settings", icon: Settings },
    { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    return (
        <aside
            className={`${collapsed ? "w-[72px]" : "w-[260px]"
                } h-screen bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col transition-all duration-300 ease-in-out sticky top-0`}
        >
            {/* Logo area */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.06]">
                {!collapsed && (
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">W</span>
                        </div>
                        <span className="text-white/90 font-semibold text-sm tracking-tight">
                            Webvoxel Admin
                        </span>
                    </Link>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-md hover:bg-white/[0.06] text-white/40 hover:text-white/60 transition-colors"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${active
                                    ? "bg-white/[0.08] text-white"
                                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                                }`}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon
                                size={18}
                                className={`shrink-0 ${active
                                        ? "text-white"
                                        : "text-white/30 group-hover:text-white/60"
                                    }`}
                            />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User section */}
            <div className="p-3 border-t border-white/[0.06]">
                <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : "px-3"}`}>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-8 h-8",
                            },
                        }}
                    />
                    {!collapsed && (
                        <span className="text-white/50 text-xs truncate">Account</span>
                    )}
                </div>
            </div>
        </aside>
    );
}
