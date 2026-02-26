"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Save, Building2, BarChart3, Workflow } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
    const companyInfo = useQuery(api.settings.getCompanyInfo);
    const processSteps = useQuery(api.settings.listProcessSteps);
    const features = useQuery(api.settings.listFeatures);

    const updateCompany = useMutation(api.settings.updateCompanyInfo);
    const updateStep = useMutation(api.settings.updateProcessStep);
    const updateFeature = useMutation(api.settings.updateFeature);

    const [activeTab, setActiveTab] = useState<"company" | "process" | "features">("company");
    const [companyForm, setCompanyForm] = useState({
        name: "", tagline: "", email: "", phone: "", linkedin: "",
        locations: "",
        founded: 2024,
        stats: [
            { value: 0, label: "", suffix: "" },
            { value: 0, label: "", suffix: "" },
            { value: 0, label: "", suffix: "" },
            { value: 0, label: "", suffix: "" },
        ],
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (companyInfo) {
            setCompanyForm({
                name: companyInfo.name,
                tagline: companyInfo.tagline,
                email: companyInfo.email,
                phone: companyInfo.phone,
                linkedin: companyInfo.linkedin,
                locations: companyInfo.locations.join(", "),
                founded: companyInfo.founded,
                stats: companyInfo.stats.length >= 4 ? companyInfo.stats : [
                    ...companyInfo.stats,
                    ...Array(4 - companyInfo.stats.length).fill({ value: 0, label: "", suffix: "" }),
                ],
            });
        }
    }, [companyInfo]);

    const handleSaveCompany = async () => {
        try {
            await updateCompany({
                name: companyForm.name,
                tagline: companyForm.tagline,
                email: companyForm.email,
                phone: companyForm.phone,
                linkedin: companyForm.linkedin,
                locations: companyForm.locations.split(",").map((l) => l.trim()).filter(Boolean),
                founded: companyForm.founded,
                stats: companyForm.stats,
            });
            setSaved(true);
            toast.success("Company settings saved");
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            toast.error("Failed to save company settings");
        }
    };

    const tabs = [
        { id: "company" as const, label: "Company Info", icon: Building2 },
        { id: "process" as const, label: "Process Steps", icon: Workflow },
        { id: "features" as const, label: "Features", icon: BarChart3 },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-white/40 mt-1">Manage company information and content</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-[#0a0a0a] rounded-xl border border-white/[0.06] mb-6">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"
                                }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Company Info Tab */}
            {activeTab === "company" && (
                <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="company-name" className="block text-white/50 text-xs font-medium mb-1.5">Company Name</label>
                            <input id="company-name" type="text" value={companyForm.name} onChange={(e) => setCompanyForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" />
                        </div>
                        <div>
                            <label htmlFor="company-founded" className="block text-white/50 text-xs font-medium mb-1.5">Founded Year</label>
                            <input id="company-founded" type="number" value={companyForm.founded} onChange={(e) => setCompanyForm((f) => ({ ...f, founded: parseInt(e.target.value) || 2024 }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="company-tagline" className="block text-white/50 text-xs font-medium mb-1.5">Tagline</label>
                        <textarea id="company-tagline" value={companyForm.tagline} onChange={(e) => setCompanyForm((f) => ({ ...f, tagline: e.target.value }))} rows={2} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20 resize-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="company-email" className="block text-white/50 text-xs font-medium mb-1.5">Email</label>
                            <input id="company-email" type="email" value={companyForm.email} onChange={(e) => setCompanyForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" />
                        </div>
                        <div>
                            <label htmlFor="company-phone" className="block text-white/50 text-xs font-medium mb-1.5">Phone</label>
                            <input id="company-phone" type="text" value={companyForm.phone} onChange={(e) => setCompanyForm((f) => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="company-linkedin" className="block text-white/50 text-xs font-medium mb-1.5">LinkedIn</label>
                            <input id="company-linkedin" type="text" value={companyForm.linkedin} onChange={(e) => setCompanyForm((f) => ({ ...f, linkedin: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" />
                        </div>
                        <div>
                            <label htmlFor="company-locations" className="block text-white/50 text-xs font-medium mb-1.5">Locations (comma separated)</label>
                            <input id="company-locations" type="text" value={companyForm.locations} onChange={(e) => setCompanyForm((f) => ({ ...f, locations: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white/70 text-sm font-semibold mb-3">Stats</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {companyForm.stats.map((stat, i) => (
                                <div key={i} className="flex gap-2">
                                    <input type="number" value={stat.value} onChange={(e) => { const stats = [...companyForm.stats]; stats[i] = { ...stats[i], value: parseInt(e.target.value) || 0 }; setCompanyForm((f) => ({ ...f, stats })); }} className="w-20 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" placeholder="25" />
                                    <input type="text" value={stat.label} onChange={(e) => { const stats = [...companyForm.stats]; stats[i] = { ...stats[i], label: e.target.value }; setCompanyForm((f) => ({ ...f, stats })); }} className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" placeholder="Label" />
                                    <input type="text" value={stat.suffix} onChange={(e) => { const stats = [...companyForm.stats]; stats[i] = { ...stats[i], suffix: e.target.value }; setCompanyForm((f) => ({ ...f, stats })); }} className="w-14 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" placeholder="+" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={handleSaveCompany} className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
                        <Save size={14} />
                        {saved ? "Saved!" : "Save Changes"}
                    </button>
                </div>
            )}

            {/* Process Steps Tab */}
            {activeTab === "process" && (
                <div className="space-y-4">
                    {!processSteps ? (
                        [...Array(4)].map((_, i) => <div key={i} className="h-32 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] animate-pulse" />)
                    ) : (
                        processSteps.map((step) => (
                            <ProcessStepCard key={step._id} step={step} onSave={async (data) => {
                                try {
                                    await updateStep({ id: step._id, ...data });
                                    toast.success("Process step updated");
                                } catch (error) {
                                    toast.error("Failed to update process step");
                                }
                            }} />
                        ))
                    )}
                </div>
            )}

            {/* Features Tab */}
            {activeTab === "features" && (
                <div className="space-y-4">
                    {!features ? (
                        [...Array(4)].map((_, i) => <div key={i} className="h-32 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] animate-pulse" />)
                    ) : (
                        features.map((feature) => (
                            <FeatureCard key={feature._id} feature={feature} onSave={async (data) => {
                                try {
                                    await updateFeature({ id: feature._id, ...data });
                                    toast.success("Feature updated");
                                } catch (error) {
                                    toast.error("Failed to update feature");
                                }
                            }} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

function ProcessStepCard({ step, onSave }: { step: { stepId: string; title: string; description: string }; onSave: (data: { title: string; description: string }) => Promise<void> }) {
    const [title, setTitle] = useState(step.title);
    const [description, setDescription] = useState(step.description);
    const [saving, setSaving] = useState(false);
    const changed = title !== step.title || description !== step.description;

    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-white/20 text-xs font-mono">{step.stepId}</span>
                <input type="text" aria-label="Step title" value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 bg-transparent text-white font-semibold text-sm focus:outline-none border-b border-transparent focus:border-white/20" />
            </div>
            <textarea aria-label="Step description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full bg-transparent text-white/40 text-sm focus:outline-none resize-none" />
            {changed && (
                <button onClick={async () => { setSaving(true); await onSave({ title, description }); setSaving(false); }} className="mt-3 flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-xs font-semibold hover:bg-white/90">
                    <Save size={12} />{saving ? "Saving..." : "Save"}
                </button>
            )}
        </div>
    );
}

function FeatureCard({ feature, onSave }: { feature: { title: string; description: string }; onSave: (data: { title: string; description: string }) => Promise<void> }) {
    const [title, setTitle] = useState(feature.title);
    const [description, setDescription] = useState(feature.description);
    const [saving, setSaving] = useState(false);
    const changed = title !== feature.title || description !== feature.description;

    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5">
            <input type="text" aria-label="Feature title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-transparent text-white font-semibold text-sm focus:outline-none border-b border-transparent focus:border-white/20 mb-2" />
            <textarea aria-label="Feature description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full bg-transparent text-white/40 text-sm focus:outline-none resize-none" />
            {changed && (
                <button onClick={async () => { setSaving(true); await onSave({ title, description }); setSaving(false); }} className="mt-3 flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-xs font-semibold hover:bg-white/90">
                    <Save size={12} />{saving ? "Saving..." : "Save"}
                </button>
            )}
        </div>
    );
}
