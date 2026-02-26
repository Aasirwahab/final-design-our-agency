"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    FolderKanban,
    Wrench,
    MessageSquareQuote,
    HelpCircle,
    TrendingUp,
    Eye,
} from "lucide-react";
import Link from "next/link";

function StatCard({
    label,
    value,
    icon: Icon,
    href,
    color,
}: {
    label: string;
    value: number | string;
    icon: React.ElementType;
    href: string;
    color: string;
}) {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 hover:border-white/[0.1] transition-all duration-300"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-white/40 text-sm font-medium">{label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{value}</p>
                </div>
                <div
                    className={`p-3 rounded-xl ${color} bg-opacity-10`}
                    // eslint-disable-next-line
                    style={{ backgroundColor: `${color}15` }}
                >
                    <Icon size={20} style={{ color }} />
                </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-white/30 text-xs group-hover:text-white/50 transition-colors">
                <span>View all</span>
                <TrendingUp size={12} />
            </div>
        </Link>
    );
}

export default function AdminDashboard() {
    const projects = useQuery(api.projects.listAll);
    const services = useQuery(api.services.list);
    const testimonials = useQuery(api.testimonials.list);
    const faqs = useQuery(api.faqs.list);
    const companyInfo = useQuery(api.settings.getCompanyInfo);

    const isLoading = !projects || !services || !testimonials || !faqs;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-white/40 mt-1">
                    Welcome to Webvoxel Studio admin panel
                </p>
            </div>

            {/* Stats Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-[140px] rounded-2xl bg-[#0a0a0a] border border-white/[0.06] animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        label="Projects"
                        value={projects.length}
                        icon={FolderKanban}
                        href="/admin/projects"
                        color="#6366f1"
                    />
                    <StatCard
                        label="Services"
                        value={services.length}
                        icon={Wrench}
                        href="/admin/services"
                        color="#22c55e"
                    />
                    <StatCard
                        label="Testimonials"
                        value={testimonials.length}
                        icon={MessageSquareQuote}
                        href="/admin/testimonials"
                        color="#f59e0b"
                    />
                    <StatCard
                        label="FAQs"
                        value={faqs.length}
                        icon={HelpCircle}
                        href="/admin/faqs"
                        color="#ec4899"
                    />
                </div>
            )}

            {/* Quick Info */}
            {companyInfo && (
                <div className="mt-8 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Eye size={18} className="text-white/40" />
                        Company Overview
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {companyInfo.stats.map((stat, i) => (
                            <div key={i}>
                                <p className="text-2xl font-bold text-white">
                                    {stat.value}
                                    {stat.suffix}
                                </p>
                                <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Projects */}
            {projects && projects.length > 0 && (
                <div className="mt-8 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">
                            Recent Projects
                        </h2>
                        <Link
                            href="/admin/projects"
                            className="text-sm text-white/40 hover:text-white/60 transition-colors"
                        >
                            View all →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {projects.slice(0, 5).map((project) => (
                            <div
                                key={project._id}
                                className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white/90 text-sm font-medium">
                                            {project.title}
                                        </p>
                                        <p className="text-white/30 text-xs">
                                            {project.category} · {project.year}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`text-xs px-2.5 py-1 rounded-full ${project.isPublished
                                        ? "bg-green-500/10 text-green-400"
                                        : "bg-yellow-500/10 text-yellow-400"
                                        }`}
                                >
                                    {project.isPublished ? "Published" : "Draft"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
