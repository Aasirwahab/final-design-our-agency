"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Plus, Pencil, Trash2, X, Save, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

type FaqForm = { question: string; answer: string };

export default function FaqsPage() {
    const faqs = useQuery(api.faqs.list);
    const create = useMutation(api.faqs.create);
    const update = useMutation(api.faqs.update);
    const remove = useMutation(api.faqs.remove);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<Id<"faqs"> | null>(null);
    const [form, setForm] = useState<FaqForm>({ question: "", answer: "" });
    const [deleteConfirm, setDeleteConfirm] = useState<Id<"faqs"> | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const openCreate = () => { setForm({ question: "", answer: "" }); setEditingId(null); setShowModal(true); };
    const openEdit = (f: NonNullable<typeof faqs>[number]) => { setForm({ question: f.question, answer: f.answer }); setEditingId(f._id); setShowModal(true); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await update({ id: editingId, ...form });
                toast.success("FAQ updated");
            } else {
                await create(form);
                toast.success("FAQ created");
            }
            setShowModal(false); setEditingId(null);
        } catch (error) {
            toast.error("Failed to save FAQ");
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;
        try {
            await remove({ id: deleteConfirm });
            toast.success("FAQ deleted");
            setDeleteConfirm(null);
        } catch (error) {
            toast.error("Failed to delete FAQ");
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">FAQs</h1>
                    <p className="text-white/40 mt-1">Manage frequently asked questions</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
                    <Plus size={16} /> Add FAQ
                </button>
            </div>

            <div className="space-y-3">
                {!faqs ? (
                    [...Array(4)].map((_, i) => <div key={i} className="h-16 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] animate-pulse" />)
                ) : faqs.length === 0 ? (
                    <p className="text-white/30 text-center py-12">No FAQs yet.</p>
                ) : (
                    faqs.map((faq) => (
                        <div key={faq._id} className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden hover:border-white/[0.1] transition-all">
                            <div className="flex items-center justify-between p-5 cursor-pointer" onClick={() => setExpandedId(expandedId === faq._id ? null : faq._id)}>
                                <p className="text-white/90 text-sm font-medium flex-1">{faq.question}</p>
                                <div className="flex items-center gap-1 shrink-0 ml-4">
                                    <button aria-label="Edit FAQ" onClick={(e) => { e.stopPropagation(); openEdit(faq); }} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04]"><Pencil size={14} /></button>
                                    <button aria-label="Delete FAQ" onClick={(e) => { e.stopPropagation(); setDeleteConfirm(faq._id); }} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button>
                                    {expandedId === faq._id ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
                                </div>
                            </div>
                            {expandedId === faq._id && (
                                <div className="px-5 pb-5 pt-0 border-t border-white/[0.04]">
                                    <p className="text-white/40 text-sm pt-4">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 max-w-sm w-full mx-4">
                        <h3 className="text-white font-semibold text-lg">Delete FAQ?</h3>
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
                            <h3 className="text-white font-semibold text-lg">{editingId ? "Edit FAQ" : "Add FAQ"}</h3>
                            <button aria-label="Close modal" onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60"><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label htmlFor="faq-question" className="block text-white/50 text-xs font-medium mb-1.5">Question</label><input id="faq-question" type="text" required value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" /></div>
                            <div><label htmlFor="faq-answer" className="block text-white/50 text-xs font-medium mb-1.5">Answer</label><textarea id="faq-answer" required value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} rows={4} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20 resize-none" /></div>
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
