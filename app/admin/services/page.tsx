"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Plus, Pencil, Trash2, X, Save, Upload } from "lucide-react";
import { toast } from "sonner";

type ServiceForm = {
    serviceId: string;
    title: string;
    description: string;
    image: string;
};

export default function ServicesPage() {
    const services = useQuery(api.services.list);
    const createService = useMutation(api.services.create);
    const updateService = useMutation(api.services.update);
    const deleteService = useMutation(api.services.remove);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<Id<"services"> | null>(null);
    const [form, setForm] = useState<ServiceForm>({ serviceId: "", title: "", description: "", image: "" });
    const [deleteConfirm, setDeleteConfirm] = useState<Id<"services"> | null>(null);
    const [uploading, setUploading] = useState(false);

    const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
    const getImageUrl = useMutation(api.upload.getImageUrl);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const postUrl = await generateUploadUrl();
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();
            const publicUrl = await getImageUrl({ storageId });

            if (publicUrl) {
                setForm((f) => ({ ...f, image: publicUrl }));
                toast.success("Image uploaded successfully");
            }
        } catch (error) {
            toast.error("Failed to upload image");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const openCreate = () => {
        const nextId = services ? String(services.length + 1).padStart(2, "0") : "01";
        setForm({ serviceId: nextId, title: "", description: "", image: "" });
        setEditingId(null);
        setShowModal(true);
    };

    const openEdit = (item: NonNullable<typeof services>[number]) => {
        setForm({ serviceId: item.serviceId, title: item.title, description: item.description, image: item.image });
        setEditingId(item._id);
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateService({ id: editingId, ...form });
                toast.success("Service updated");
            } else {
                await createService(form);
                toast.success("Service created");
            }
            setShowModal(false);
            setEditingId(null);
        } catch (error) {
            toast.error("Failed to save service");
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;
        try {
            await deleteService({ id: deleteConfirm });
            toast.success("Service deleted");
            setDeleteConfirm(null);
        } catch (error) {
            toast.error("Failed to delete service");
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Services</h1>
                    <p className="text-white/40 mt-1">Manage your service offerings</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
                    <Plus size={16} /> Add Service
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!services ? (
                    [...Array(4)].map((_, i) => <div key={i} className="h-40 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] animate-pulse" />)
                ) : services.length === 0 ? (
                    <p className="text-white/30 col-span-2 text-center py-12">No services yet.</p>
                ) : (
                    services.map((item) => (
                        <div key={item._id} className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 hover:border-white/[0.1] transition-all">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-white/20 text-xs font-mono">{item.serviceId}</span>
                                    <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                                </div>
                                <div className="flex gap-1">
                                    <button aria-label="Edit service" onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04]"><Pencil size={14} /></button>
                                    <button aria-label="Delete service" onClick={() => setDeleteConfirm(item._id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <p className="text-white/40 text-sm mt-2 line-clamp-2">{item.description}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 max-w-sm w-full mx-4">
                        <h3 className="text-white font-semibold text-lg">Delete Service?</h3>
                        <p className="text-white/40 text-sm mt-2">This action cannot be undone.</p>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-white/60 text-sm hover:bg-white/[0.04]">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 max-w-lg w-full mx-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white font-semibold text-lg">{editingId ? "Edit Service" : "Add Service"}</h3>
                            <button aria-label="Close modal" onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60"><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-white/50 text-xs font-medium mb-1.5">ID</label>
                                    <input type="text" required value={form.serviceId} onChange={(e) => setForm(f => ({ ...f, serviceId: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" placeholder="01" />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-white/50 text-xs font-medium mb-1.5">Title</label>
                                    <input type="text" required value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" placeholder="Service name" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-white/50 text-xs font-medium mb-1.5">Description</label>
                                <textarea required value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20 resize-none" placeholder="Describe the service..." />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-white/50 text-xs font-medium">Image Path</label>
                                <div className="flex items-center gap-3">
                                    <input type="text" required value={form.image} onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))} className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20" placeholder="/services/icon.png or https://..." />
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            aria-label="Upload image"
                                            title="Upload image"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                                        />
                                        <button
                                            type="button"
                                            disabled={uploading}
                                            className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm hover:bg-white/[0.08] hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <Upload size={14} />
                                            {uploading ? "Uploading..." : "Upload from device"}
                                        </button>
                                    </div>
                                </div>
                            </div>
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
