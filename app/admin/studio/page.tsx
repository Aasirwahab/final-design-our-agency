"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { Plus, Pencil, Trash2, Save, X, GripVertical, Image as ImageIcon, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";

// Reusable Button Component (matches other admin pages)
const AdminButton = ({
    onClick,
    disabled,
    type = 'button',
    variant = 'primary',
    size = 'default',
    className = '',
    children
}: {
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'default' | 'sm' | 'icon';
    className?: string;
    children: React.ReactNode;
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-100 focus:ring-white/50",
        secondary: "bg-[#1A1A1A] text-white border border-white/10 hover:bg-[#222] focus:ring-white/20",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 focus:ring-red-500/50",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 focus:ring-white/20",
    };

    const sizes = {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        icon: "h-9 w-9 p-0",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};

// --- Team Member Interfaces & Types ---
type TeamMember = {
    _id: Id<"teamMembers">;
    name: string;
    role: string;
    image: string;
    position: string;
    order: number;
};

// --- Studio Value Interfaces & Types ---
type StudioValue = {
    _id: Id<"studioValues">;
    title: string;
    description: string;
    order: number;
};


export default function StudioAdminPage() {
    // Queries
    const teamMembers = useQuery(api.teamMembers.list);
    const studioValues = useQuery(api.studioValues.list);

    // Mutations - Team Members
    const createTeamMember = useMutation(api.teamMembers.create);
    const updateTeamMember = useMutation(api.teamMembers.update);
    const deleteTeamMember = useMutation(api.teamMembers.remove);

    // Mutations - Studio Values
    const createStudioValue = useMutation(api.studioValues.create);
    const updateStudioValue = useMutation(api.studioValues.update);
    const deleteStudioValue = useMutation(api.studioValues.remove);

    // Mutations - File Upload
    const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
    const getImageUrl = useMutation(api.upload.getImageUrl);

    // State - Modals
    const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
    const [isStudioValueModalOpen, setIsStudioValueModalOpen] = useState(false);
    const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
    const [editingStudioValue, setEditingStudioValue] = useState<StudioValue | null>(null);

    // State - Form Data
    const [teamMemberFormData, setTeamMemberFormData] = useState({ name: "", role: "", image: "", position: "object-top" });
    const [studioValueFormData, setStudioValueFormData] = useState({ title: "", description: "" });

    // State - Uploads
    const [isUploading, setIsUploading] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');

    // --- Loading State ---
    if (teamMembers === undefined || studioValues === undefined) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    // --- Handlers: Team Members ---
    const handleTeamMemberSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingTeamMember) {
                await updateTeamMember({
                    id: editingTeamMember._id,
                    ...teamMemberFormData,
                    order: editingTeamMember.order
                });
                toast.success("Team member updated successfully");
            } else {
                await createTeamMember({
                    ...teamMemberFormData,
                    order: teamMembers.length
                });
                toast.success("Team member created successfully");
            }
            closeTeamMemberModal();
        } catch (error) {
            toast.error(editingTeamMember ? "Failed to update team member" : "Failed to create team member");
            console.error(error);
        }
    };

    const handleDeleteTeamMember = async (id: Id<"teamMembers">) => {
        if (!window.confirm("Are you sure you want to delete this team member?")) return;
        try {
            await deleteTeamMember({ id });
            toast.success("Team member deleted successfully");
        } catch (error) {
            toast.error("Failed to delete team member");
            console.error(error);
        }
    };

    const openTeamMemberModal = (member?: TeamMember) => {
        if (member) {
            setEditingTeamMember(member);
            setTeamMemberFormData({
                name: member.name,
                role: member.role,
                image: member.image,
                position: member.position
            });
            setImagePreview(member.image);
        } else {
            setEditingTeamMember(null);
            setTeamMemberFormData({ name: "", role: "", image: "", position: "object-top" });
            setImagePreview('');
        }
        setIsTeamMemberModalOpen(true);
    };

    const closeTeamMemberModal = () => {
        setIsTeamMemberModalOpen(false);
        setEditingTeamMember(null);
        setTeamMemberFormData({ name: "", role: "", image: "", position: "object-top" });
        setImagePreview('');
    };

    // --- Handlers: Studio Values ---
    const handleStudioValueSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingStudioValue) {
                await updateStudioValue({
                    id: editingStudioValue._id,
                    ...studioValueFormData,
                    order: editingStudioValue.order
                });
                toast.success("Value updated successfully");
            } else {
                await createStudioValue({
                    ...studioValueFormData,
                    order: studioValues.length
                });
                toast.success("Value created successfully");
            }
            closeStudioValueModal();
        } catch (error) {
            toast.error(editingStudioValue ? "Failed to update value" : "Failed to create value");
            console.error(error);
        }
    };

    const handleDeleteStudioValue = async (id: Id<"studioValues">) => {
        if (!window.confirm("Are you sure you want to delete this value?")) return;
        try {
            await deleteStudioValue({ id });
            toast.success("Value deleted successfully");
        } catch (error) {
            toast.error("Failed to delete value");
            console.error(error);
        }
    };

    const openStudioValueModal = (value?: StudioValue) => {
        if (value) {
            setEditingStudioValue(value);
            setStudioValueFormData({ title: value.title, description: value.description });
        } else {
            setEditingStudioValue(null);
            setStudioValueFormData({ title: "", description: "" });
        }
        setIsStudioValueModalOpen(true);
    };

    const closeStudioValueModal = () => {
        setIsStudioValueModalOpen(false);
        setEditingStudioValue(null);
        setStudioValueFormData({ title: "", description: "" });
    };

    // --- Handlers: Image Upload ---
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            setLoadingImage(true);

            // 1. Generate an upload URL
            const postUrl = await generateUploadUrl();

            // 2. Upload the file
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();

            // 3. Get the URL for the uploaded file
            const imageUrl = await getImageUrl({ storageId });

            if (imageUrl) {
                setTeamMemberFormData(prev => ({ ...prev, image: imageUrl }));
                setImagePreview(imageUrl);
                toast.success("Image uploaded successfully");
            }
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
            setLoadingImage(false);
            // Reset the file input
            e.target.value = '';
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-light text-white mb-2">Studio Content</h1>
                <p className="text-gray-400">Manage your team members and company values.</p>
            </div>

            {/* --- TEAM MEMBERS SECTION --- */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-medium text-white">Team Members</h2>
                        <p className="text-sm text-gray-400 mt-1">Manage the people displayed on the Studio page.</p>
                    </div>
                    <AdminButton onClick={() => openTeamMemberModal()}>
                        <Plus className="w-5 h-5 mr-2" />
                        Add Member
                    </AdminButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teamMembers.map((member) => (
                        <motion.div
                            key={member._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden group"
                        >
                            <div className="relative aspect-[3/4] w-full bg-[#111]">
                                {member.image ? (
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className={`object-cover ${member.position}`}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-white/20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Actions Overlay */}
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <AdminButton
                                        variant="secondary"
                                        size="icon"
                                        onClick={() => openTeamMemberModal(member)}
                                        className="h-8 w-8 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </AdminButton>
                                    <AdminButton
                                        variant="danger"
                                        size="icon"
                                        onClick={() => handleDeleteTeamMember(member._id)}
                                        className="h-8 w-8 bg-red-500/20 backdrop-blur-md border border-red-500/20 hover:bg-red-500/40 text-red-500"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </AdminButton>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 text-left">
                                    <h3 className="text-lg font-medium text-white">{member.name}</h3>
                                    <p className="text-sm font-light text-gray-300">{member.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {teamMembers.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-[#1A1A1A] rounded-2xl border border-white/10">
                            <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white mb-1">No Team Members</h3>
                            <p className="text-gray-400">Add team members to display them on the Studio page.</p>
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-white/10" />

            {/* --- STUDIO VALUES SECTION --- */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-medium text-white">What Drives Us Forward</h2>
                        <p className="text-sm text-gray-400 mt-1">Manage your company values and principles.</p>
                    </div>
                    <AdminButton onClick={() => openStudioValueModal()}>
                        <Plus className="w-5 h-5 mr-2" />
                        Add Value
                    </AdminButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studioValues.map((value) => (
                        <motion.div
                            key={value._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 group relative"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-medium text-white">{value.title}</h3>
                                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <AdminButton
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openStudioValueModal(value)}
                                        className="h-8 w-8"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </AdminButton>
                                    <AdminButton
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteStudioValue(value._id)}
                                        className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </AdminButton>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed font-light">{value.description}</p>
                        </motion.div>
                    ))}
                    {studioValues.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-[#1A1A1A] rounded-2xl border border-white/10">
                            <div className="w-12 h-12 text-gray-500 mx-auto mb-4 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-xl">+</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-1">No Values Set</h3>
                            <p className="text-gray-400">Add core values to display on the Studio page.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODALS --- */}

            {/* Team Member Modal */}
            <AnimatePresence>
                {isTeamMemberModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1A1A1A] w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#111]">
                                <h2 className="text-xl font-medium text-white">
                                    {editingTeamMember ? 'Edit Team Member' : 'Add Team Member'}
                                </h2>
                                <button
                                    type="button"
                                    title="Close"
                                    aria-label="Close modal"
                                    onClick={closeTeamMemberModal}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleTeamMemberSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm border-white/40text-gray-400">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={teamMemberFormData.name}
                                            onChange={(e) => setTeamMemberFormData({ ...teamMemberFormData, name: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                            placeholder="e.g. Navrif"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 border-white/40">Role</label>
                                        <input
                                            type="text"
                                            required
                                            value={teamMemberFormData.role}
                                            onChange={(e) => setTeamMemberFormData({ ...teamMemberFormData, role: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                            placeholder="e.g. Founder"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 border-white/40">Image Path / URL</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            required
                                            value={teamMemberFormData.image}
                                            onChange={(e) => {
                                                setTeamMemberFormData({ ...teamMemberFormData, image: e.target.value });
                                                setImagePreview(e.target.value);
                                            }}
                                            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                            placeholder="/images/team/member.jpg or https://..."
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                title="Upload image"
                                                aria-label="Upload image"
                                                onChange={handleImageUpload}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                disabled={isUploading}
                                            />
                                            <AdminButton
                                                type="button"
                                                variant="secondary"
                                                disabled={isUploading}
                                                className="h-[50px] w-full"
                                            >
                                                {isUploading ? (
                                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <Upload className="w-5 h-5 mr-2" />
                                                        Upload
                                                    </>
                                                )}
                                            </AdminButton>
                                        </div>
                                    </div>
                                    {imagePreview && (
                                        <div className="mt-4 relative h-48 w-full bg-black/50 rounded-xl border border-white/10 overflow-hidden">
                                            {loadingImage && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A] z-10">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                                </div>
                                            )}
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                fill
                                                className={`object-cover ${teamMemberFormData.position}`}
                                                onLoadingComplete={() => setLoadingImage(false)}
                                                onError={() => setLoadingImage(false)}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 border-white/40">Image Position (CSS)</label>
                                    <select
                                        value={teamMemberFormData.position}
                                        title="Image Position"
                                        aria-label="Image Position"
                                        onChange={(e) => setTeamMemberFormData({ ...teamMemberFormData, position: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                    >
                                        <option value="object-center">Center</option>
                                        <option value="object-top">Top</option>
                                        <option value="object-bottom">Bottom</option>
                                        <option value="object-[center_20%]">Custom Top (20%)</option>
                                    </select>
                                    <p className="text-xs text-gray-500">Controls how the image is positioned inside its container.</p>
                                </div>

                                <div className="flex items-center justify-end space-x-4 pt-6 mt-6 border-t border-white/10">
                                    <AdminButton type="button" variant="ghost" onClick={closeTeamMemberModal}>
                                        Cancel
                                    </AdminButton>
                                    <AdminButton type="submit">
                                        <Save className="w-5 h-5 mr-2" />
                                        Save Member
                                    </AdminButton>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Studio Value Modal */}
            <AnimatePresence>
                {isStudioValueModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1A1A1A] w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#111]">
                                <h2 className="text-xl font-medium text-white">
                                    {editingStudioValue ? 'Edit Value' : 'Add Value'}
                                </h2>
                                <button
                                    type="button"
                                    title="Close"
                                    aria-label="Close modal"
                                    onClick={closeStudioValueModal}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleStudioValueSubmit} className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 border-white/40">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={studioValueFormData.title}
                                        onChange={(e) => setStudioValueFormData({ ...studioValueFormData, title: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                        placeholder="e.g. Design Excellence"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 border-white/40">Description</label>
                                    <textarea
                                        required
                                        value={studioValueFormData.description}
                                        onChange={(e) => setStudioValueFormData({ ...studioValueFormData, description: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 h-32 resize-none text-white focus:outline-none focus:border-white/30 transition-colors"
                                        placeholder="Briefly describe this value..."
                                    />
                                </div>

                                <div className="flex items-center justify-end space-x-4 pt-6 mt-6 border-t border-white/10">
                                    <AdminButton type="button" variant="ghost" onClick={closeStudioValueModal}>
                                        Cancel
                                    </AdminButton>
                                    <AdminButton type="submit">
                                        <Save className="w-5 h-5 mr-2" />
                                        Save Value
                                    </AdminButton>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
