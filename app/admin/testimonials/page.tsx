"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Plus, Pencil, Trash2, X, Save, Quote } from "lucide-react";
import { toast } from "sonner";

type TestimonialForm = { author: string; role: string; company: string; quote: string };

export default function TestimonialsPage() {
    const testimonials = useQuery(api.testimonials.list);
    const create = useMutation(api.testimonials.create);
    const update = useMutation(api.testimonials.update);
    const remove = useMutation(api.testimonials.remove);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<Id<"testimonials"> | null>(null);
    const [form, setForm] = useState<TestimonialForm>({ author: "", role: "", company: "", quote: "" });
    const [deleteConfirm, setDeleteConfirm] = useState<Id<"testimonials"> | null>(null);

    const openCreate = () => { setForm({ author: "", role: "", company: "", quote: "" }); setEditingId(null); setShowModal(true); };
    const openEdit = (t: NonNullable<typeof testimonials>[number]) => { setForm({ author: t.author, role: t.role, company: t.company, quote: t.quote }); setEditingId(t._id); setShowModal(true); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await update({ id: editingId, ...form });
                toast.success("Testimonial updated");
            } else {
                await create(form);
                toast.success("Testimonial created");
            }
            setShowModal(false); setEditingId(null);
        } catch (error) {
            toast.error("Failed to save testimonial");
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;
        try {
            await remove({ id: deleteConfirm });
            toast.success("Testimonial removed");
            setDeleteConfirm(null);
        } catch (error) {
            toast.error("Failed to remove testimonial");
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Testimonials</h1>
                    <p className="text-white/40 mt-1">Manage client testimonials</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
                    <Plus size={16} /> Add Testimonial
                </button>
            </div>

            <div className="space-y-4">
                {!testimonials ? (
                    [...Array(3)].map((_, i) => <div key={i} className="h-32 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] animate-pulse" />)
                ) : testimonials.length === 0 ? (
                    <p className="text-white/30 text-center py-12">No testimonials yet.</p>
                ) : (
                    testimonials.map((t) => (
                        <div key={t._id} className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 hover:border-white/[0.1] transition-all">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Quote size={14} className="text-white/20 shrink-0" />
                                        <span className="text-white font-semibold text-sm">{t.author}</span>
                                        <span className="text-white/30 text-xs">·</span>
                                        <span className="text-white/40 text-xs">{t.role}, {t.company}</span>
                                    </div>
                                    <p className="text-white/40 text-sm line-clamp-2">{t.quote}</p>
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <button aria-label="Edit testimonial" onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04]"><Pencil size={14} /></button>
                                    <button aria-label="Delete testimonial" onClick={() => setDeleteConfirm(t._id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 max-w-sm w-full mx-4">
                        <h3 className="text-white font-semibold text-lg">Delete Testimonial?</h3>
                        <p className="text-white/40 text-sm mt-2">This action cannot be undone.</p>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-white/60 text-sm hover:bg-white/[0.04]">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 max-w-lg w-full mx-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white font-semibold text-lg">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h3>
                            <button aria-label="Close modal" onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60"><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div><label htmlFor="t-author" className="block text-white/50 text-xs font-medium mb-1.5">Author</label><input id="t-author" type="text" required value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" /></div>
                                <div><label htmlFor="t-role" className="block text-white/50 text-xs font-medium mb-1.5">Role</label><input id="t-role" type="text" required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" /></div>
                                <div><label htmlFor="t-company" className="block text-white/50 text-xs font-medium mb-1.5">Company</label><input id="t-company" type="text" required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" /></div>
                            </div>
                            <div><label htmlFor="t-quote" className="block text-white/50 text-xs font-medium mb-1.5">Quote</label><textarea id="t-quote" required value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} rows={4} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20 resize-none" /></div>
                            <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-white/60 text-sm hover:bg-white/[0.04]">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 flex items-center justify-center gap-2"><Save size={14} />{editingId ? "Save" : "Create"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
