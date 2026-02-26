"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
    Plus,
    Pencil,
    Trash2,
    ExternalLink,
    Eye,
    EyeOff,
    X,
    Save,
    Upload,
} from "lucide-react";
import { toast } from "sonner";

type ProjectForm = {
    title: string;
    slug: string;
    url: string;
    tags: string;
    year: string;
    category: string;
    size: "large" | "small";
    image: string;
    description: string;
    isPublished: boolean;
};

const emptyForm: ProjectForm = {
    title: "",
    slug: "",
    url: "",
    tags: "",
    year: new Date().getFullYear().toString(),
    category: "",
    size: "small",
    image: "",
    description: "",
    isPublished: true,
};

export default function ProjectsPage() {
    const projects = useQuery(api.projects.listAll);
    const createProject = useMutation(api.projects.create);
    const updateProject = useMutation(api.projects.update);
    const deleteProject = useMutation(api.projects.remove);
    const togglePublish = useMutation(api.projects.togglePublish);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<Id<"projects"> | null>(null);
    const [form, setForm] = useState<ProjectForm>(emptyForm);
    const [deleteConfirm, setDeleteConfirm] = useState<Id<"projects"> | null>(null);
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
        setForm(emptyForm);
        setEditingId(null);
        setShowModal(true);
    };

    const openEdit = (project: NonNullable<typeof projects>[number]) => {
        setForm({
            title: project.title,
            slug: project.slug,
            url: project.url,
            tags: project.tags.join(", "),
            year: project.year,
            category: project.category,
            size: project.size,
            image: project.image,
            description: project.description || "",
            isPublished: project.isPublished,
        });
        setEditingId(project._id);
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tagsArray = form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        try {
            if (editingId) {
                await updateProject({
                    id: editingId,
                    title: form.title,
                    slug: form.slug,
                    url: form.url,
                    tags: tagsArray,
                    year: form.year,
                    category: form.category,
                    size: form.size,
                    image: form.image,
                    description: form.description || undefined,
                    isPublished: form.isPublished,
                });
                toast.success("Project updated successfully");
            } else {
                await createProject({
                    title: form.title,
                    slug: form.slug,
                    url: form.url,
                    tags: tagsArray,
                    year: form.year,
                    category: form.category,
                    size: form.size,
                    image: form.image,
                    description: form.description || undefined,
                    isPublished: form.isPublished,
                });
                toast.success("Project created successfully");
            }
            setShowModal(false);
            setEditingId(null);
            setForm(emptyForm);
        } catch (error) {
            toast.error("Failed to save project");
            console.error(error);
        }
    };

    const handleDelete = async (id: Id<"projects">) => {
        try {
            await deleteProject({ id });
            setDeleteConfirm(null);
            toast.success("Project deleted securely");
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };

    const handleTogglePublish = async (id: Id<"projects">) => {
        try {
            await togglePublish({ id });
            toast.success("Visibility status updated");
        } catch (error) {
            toast.error("Failed to update visibility");
        }
    };

    const autoSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Projects</h1>
                    <p className="text-white/40 mt-1">
                        Manage your portfolio projects
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                    <Plus size={16} />
                    Add Project
                </button>
            </div>

            {/* Projects Table */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
                {!projects ? (
                    <div className="p-12 text-center text-white/30">Loading...</div>
                ) : projects.length === 0 ? (
                    <div className="p-12 text-center text-white/30">
                        No projects yet. Click &quot;Add Project&quot; to create one.
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">
                                    Project
                                </th>
                                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">
                                    Year
                                </th>
                                <th className="text-left px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-right px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr
                                    key={project._id}
                                    className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-white/[0.04] overflow-hidden shrink-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-white/90 font-medium text-sm">
                                                    {project.title}
                                                </p>
                                                <div className="flex gap-1 mt-1 flex-wrap">
                                                    {project.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-white/30"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white/50 text-sm">
                                        {project.category}
                                    </td>
                                    <td className="px-6 py-4 text-white/50 text-sm">
                                        {project.year}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleTogglePublish(project._id)}
                                            className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors ${project.isPublished
                                                ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                                                : "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                                                }`}
                                        >
                                            {project.isPublished ? (
                                                <Eye size={12} />
                                            ) : (
                                                <EyeOff size={12} />
                                            )}
                                            {project.isPublished ? "Published" : "Draft"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            {project.url && project.url !== "#" && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Visit live site"
                                                    className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-colors"
                                                >
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                            <button
                                                onClick={() => openEdit(project)}
                                                aria-label="Edit project"
                                                className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-colors"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(project._id)}
                                                aria-label="Delete project"
                                                className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 max-w-sm w-full mx-4">
                        <h3 className="text-white font-semibold text-lg">Delete Project?</h3>
                        <p className="text-white/40 text-sm mt-2">
                            This action cannot be undone. The project will be permanently removed.
                        </p>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-white/60 text-sm hover:bg-white/[0.04] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white font-semibold text-lg">
                                {editingId ? "Edit Project" : "Add Project"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingId(null);
                                }}
                                aria-label="Close modal"
                                className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/50 text-xs font-medium mb-1.5">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) => {
                                            const title = e.target.value;
                                            setForm((f) => ({
                                                ...f,
                                                title,
                                                slug: editingId ? f.slug : autoSlug(title),
                                            }));
                                        }}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                                        placeholder="Project name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/50 text-xs font-medium mb-1.5">
                                        Slug *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.slug}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, slug: e.target.value }))
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                                        placeholder="project-slug"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-white/50 text-xs font-medium mb-1.5">
                                    URL
                                </label>
                                <input
                                    type="text"
                                    value={form.url}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, url: e.target.value }))
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-white/50 text-xs font-medium mb-1.5">
                                        Category *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.category}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, category: e.target.value }))
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                                        placeholder="e.g., E-commerce"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/50 text-xs font-medium mb-1.5">
                                        Year *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.year}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, year: e.target.value }))
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                                        placeholder="2025"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/50 text-xs font-medium mb-1.5">
                                        Size
                                    </label>
                                    <select
                                        value={form.size}
                                        aria-label="Project size"
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                size: e.target.value as "large" | "small",
                                            }))
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-white/20"
                                    >
                                        <option value="small" className="bg-[#0a0a0a]">
                                            Small
                                        </option>
                                        <option value="large" className="bg-[#0a0a0a]">
                                            Large
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-white/50 text-xs font-medium mb-1.5">
                                    Tags (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={form.tags}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, tags: e.target.value }))
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                                    placeholder="React, Next.js, Tailwind"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-white/50 text-xs font-medium">
                                    Image Path *
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        required
                                        value={form.image}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, image: e.target.value }))
                                        }
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                                        placeholder="/projects/my-project.webp or https://..."
                                    />
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

                            <div>
                                <label className="block text-white/50 text-xs font-medium mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, description: e.target.value }))
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20 resize-none"
                                    placeholder="Brief project description..."
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isPublished}
                                        aria-label="Published status"
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                isPublished: e.target.checked,
                                            }))
                                        }
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-green-500/40 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                                </label>
                                <span className="text-white/50 text-sm">
                                    {form.isPublished ? "Published" : "Draft"}
                                </span>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingId(null);
                                    }}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-white/60 text-sm hover:bg-white/[0.04] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={14} />
                                    {editingId ? "Save Changes" : "Create Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
