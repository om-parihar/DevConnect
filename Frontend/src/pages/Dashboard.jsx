import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const initialForm = {
    title: "",
    description: "",
    techStack: "",
    github: ""
};

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchingProjects, setFetchingProjects] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await api.get("/projects/mine");
                setProjects(response.data.projects || []);
            } catch (error) {
                setIsError(true);
                setMessage(
                    error.response?.data?.message ||
                    "Failed to fetch your projects."
                );
            } finally {
                setFetchingProjects(false);
            }
        };

        getProjects();
    }, []);

    const showMessage = (text, error = false) => {
        setMessage(text);
        setIsError(error);
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData(initialForm);
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const getPayload = () => ({
        ...formData,
        techStack: formData.techStack
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean)
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);
        setLoading(true);

        try {
            const response = await api.post("/projects", getPayload());

            setProjects((prev) => [
                response.data.project,
                ...prev
            ]);

            resetForm();
            showMessage("Project created successfully.");
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                "Failed to create project. Please try again.",
                true
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);

        setFormData({
            title: project.title || "",
            description: project.description || "",
            techStack: Array.isArray(project.techStack)
                ? project.techStack.join(", ")
                : "",
            github: project.github || ""
        });

        showMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);
        setLoading(true);

        try {
            const response = await api.put(
                `/projects/${editingId}`,
                getPayload()
            );

            setProjects((prev) =>
                prev.map((project) =>
                    project._id === editingId
                        ? response.data.project
                        : project
                )
            );

            resetForm();
            showMessage("Project updated successfully.");
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                "Failed to update project. Please try again.",
                true
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project? This action cannot be undone."
        );

        if (!confirmed) return;

        setMessage("");
        setIsError(false);
        setDeletingId(id);

        try {
            const response = await api.delete(`/projects/${id}`);

            setProjects((prev) =>
                prev.filter((project) => project._id !== id)
            );

            if (editingId === id) {
                resetForm();
            }

            showMessage(
                response.data.message || "Project deleted successfully."
            );
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                "Failed to delete project. Please try again.",
                true
            );
        } finally {
            setDeletingId(null);
        }
    };

    const totalTechnologies = new Set(
        projects.flatMap((project) =>
            Array.isArray(project.techStack)
                ? project.techStack
                : []
        )
    ).size;

    const inputClass =
        "w-full rounded-xl border border-white/[0.09] bg-[#090d17] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

    const labelClass =
        "mb-2 block text-sm font-medium text-slate-300";

    return (
        <div className="min-h-screen overflow-hidden bg-[#080b14] text-slate-100">
            <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
                <div className="absolute -top-48 right-0 h-96 w-96 rounded-full bg-blue-600/[0.08] blur-[120px]" />
                <div className="absolute left-[-150px] top-[500px] h-80 w-80 rounded-full bg-violet-600/[0.06] blur-[120px]" />
            </div>

            <main className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
                <header className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                            <span className="h-px w-6 bg-blue-400" />
                            Your workspace
                        </div>

                        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            My Dashboard
                            <span className="text-blue-400">.</span>
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                            Your ideas, your projects, your progress.
                            Manage everything you've shared with the community.
                        </p>
                    </div>

                    <Link
                        to="/"
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-500/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        <span aria-hidden="true">←</span>
                        Explore projects
                    </Link>
                </header>

                {message && (
                    <div
                        role={isError ? "alert" : "status"}
                        className={`mb-8 flex items-start justify-between gap-4 rounded-xl border px-4 py-4 text-sm ${
                            isError
                                ? "border-red-400/20 bg-red-400/[0.06] text-red-200"
                                : "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200"
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-base" aria-hidden="true">
                                {isError ? "!" : "✓"}
                            </span>
                            <p className="leading-6">{message}</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setMessage("");
                                setIsError(false);
                            }}
                            aria-label="Dismiss message"
                            className="shrink-0 rounded-lg px-2 py-1 text-lg leading-none opacity-70 transition hover:bg-white/10 hover:opacity-100"
                        >
                            ×
                        </button>
                    </div>
                )}

                <section className="mb-12 grid gap-5 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/[0.08] bg-[#0e1320] p-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">
                                Your projects
                            </p>
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-400/[0.08] text-lg text-blue-300">
                                {"</>"}
                            </span>
                        </div>
                        <p className="mt-4 text-3xl font-bold text-white">
                            {fetchingProjects ? "—" : projects.length}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            Projects in your workspace
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.08] bg-[#0e1320] p-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">
                                Technologies
                            </p>
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.08] text-lg text-violet-300">
                                ◈
                            </span>
                        </div>
                        <p className="mt-4 text-3xl font-bold text-white">
                            {fetchingProjects ? "—" : totalTechnologies}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            Unique technologies across your projects
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.08] bg-[#0e1320] p-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">
                                Workspace status
                            </p>
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08] text-lg text-emerald-300">
                                ✓
                            </span>
                        </div>
                        <p className="mt-4 text-xl font-bold text-white">
                            {fetchingProjects
                                ? "Loading"
                                : "Ready to build"}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            Manage and share your work
                        </p>
                    </div>
                </section>

                <section className="mb-14 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div
                        id="project-form"
                        className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0e1320] shadow-xl shadow-black/10"
                    >
                        <div className="border-b border-white/[0.07] p-6 sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-400/[0.08] text-xl text-blue-300">
                                    {editingId ? "✎" : "+"}
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {editingId
                                            ? "Edit your project"
                                            : "Create a project"}
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {editingId
                                            ? "Make changes to your project details."
                                            : "Show the community what you've been building."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={editingId ? handleUpdate : handleSubmit}
                            className="space-y-5 p-6 sm:p-8"
                        >
                            <div>
                                <label htmlFor="title" className={labelClass}>
                                    Project title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="e.g. DevConnect"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    maxLength={120}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className={labelClass}
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="What problem does your project solve?"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                    maxLength={3000}
                                    className={`${inputClass} resize-y leading-6`}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="techStack"
                                    className={labelClass}
                                >
                                    Tech stack
                                </label>
                                <input
                                    id="techStack"
                                    type="text"
                                    name="techStack"
                                    placeholder="React, Node.js, MongoDB"
                                    value={formData.techStack}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                                <p className="mt-2 text-xs leading-5 text-slate-500">
                                    Separate each technology with a comma.
                                </p>
                            </div>

                            <div>
                                <label htmlFor="github" className={labelClass}>
                                    GitHub repository URL
                                </label>
                                <input
                                    id="github"
                                    type="url"
                                    name="github"
                                    placeholder="https://github.com/username/repository"
                                    value={formData.github}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1320] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading && (
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    )}
                                    {loading
                                        ? "Saving..."
                                        : editingId
                                            ? "Save changes"
                                            : "Create project"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        disabled={loading}
                                        className="rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
                                    >
                                        Cancel edit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="relative isolate overflow-hidden rounded-2xl border border-blue-400/15 bg-gradient-to-br from-[#111b32] via-[#111426] to-[#17102b] p-6 sm:p-8 lg:min-h-[520px]">
                        <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-blue-500/15 blur-[90px]" />
                        <div className="pointer-events-none absolute -bottom-24 -left-16 -z-10 h-64 w-64 rounded-full bg-violet-500/15 blur-[90px]" />

                        <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/15 bg-blue-300/[0.07] px-3 py-1.5 text-xs font-semibold text-blue-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                            YOUR CREATIVE SPACE
                        </span>

                        <h2 className="mt-7 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                            Build it.
                            <br />
                            Share it.
                            <br />
                            <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                                Inspire others.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                            Every project tells a story. Keep your work
                            organized, share your repositories, and help other
                            developers discover what is possible.
                        </p>

                        <div className="mt-8 space-y-4">
                            {[
                                {
                                    number: "01",
                                    title: "Showcase your work",
                                    detail: "Give your projects a place to shine."
                                },
                                {
                                    number: "02",
                                    title: "Share your tech stack",
                                    detail: "Make your tools and skills discoverable."
                                },
                                {
                                    number: "03",
                                    title: "Keep building",
                                    detail: "Update your projects as they evolve."
                                }
                            ].map((item) => (
                                <div
                                    key={item.number}
                                    className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-black/10 p-4"
                                >
                                    <span className="pt-0.5 text-xs font-bold tracking-widest text-blue-300">
                                        {item.number}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-100">
                                            {item.title}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            {item.detail}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                                <span className="h-px w-5 bg-blue-400" />
                                Project library
                            </div>
                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                Your projects
                                <span className="text-blue-400">.</span>
                            </h2>
                            <p className="mt-2 text-sm text-slate-400">
                                Manage, update, and share the work you've published.
                            </p>
                        </div>

                        {!fetchingProjects && (
                            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {projects.length}{" "}
                                {projects.length === 1 ? "project" : "projects"}
                            </span>
                        )}
                    </div>

                    {fetchingProjects ? (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="animate-pulse rounded-2xl border border-white/[0.07] bg-[#0e1320] p-6"
                                >
                                    <div className="h-11 w-11 rounded-xl bg-slate-800" />
                                    <div className="mt-6 h-5 w-3/4 rounded bg-slate-800" />
                                    <div className="mt-4 h-3 rounded bg-slate-800" />
                                    <div className="mt-2 h-3 w-5/6 rounded bg-slate-800" />
                                    <div className="mt-6 h-8 w-2/3 rounded bg-slate-800" />
                                    <div className="mt-6 h-10 rounded-xl bg-slate-800" />
                                </div>
                            ))}
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0e1320]/60 px-6 py-16 text-center sm:py-20">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/15 bg-blue-400/[0.07] text-2xl text-blue-300">
                                {"</>"}
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-white">
                                {isError
                                    ? "Your projects couldn't be loaded"
                                    : "Your workspace is waiting"}
                            </h3>
                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                                {isError
                                    ? "Check your connection and refresh the page to try again."
                                    : "Your projects will appear here. Create your first project using the form above and start sharing your work."}
                            </p>
                            {!isError && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        document.getElementById("project-form")?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start"
                                        })
                                    }
                                    className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                                >
                                    Create your first project
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {projects.map((project) => (
                                <article
                                    key={project._id}
                                    className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0e1320] transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-[#111827] hover:shadow-xl hover:shadow-blue-950/20"
                                >
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition group-hover:opacity-100" />

                                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-400/[0.08] text-lg font-bold text-blue-300">
                                                {project.title?.charAt(0).toUpperCase() || "P"}
                                            </div>
                                            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-slate-400">
                                                Your project
                                            </span>
                                        </div>

                                        <h3 className="mt-6 break-words text-xl font-bold leading-snug text-white transition group-hover:text-blue-300">
                                            {project.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-3 flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-400">
                                            {project.description}
                                        </p>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {(Array.isArray(project.techStack)
                                                ? project.techStack
                                                : []
                                            ).slice(0, 4).map((tech, index) => (
                                                <span
                                                    key={`${tech}-${index}`}
                                                    className="max-w-full break-words rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-xs font-medium text-slate-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}

                                            {Array.isArray(project.techStack) &&
                                                project.techStack.length > 4 && (
                                                    <span className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-xs text-slate-500">
                                                        +{project.techStack.length - 4}
                                                    </span>
                                                )}
                                        </div>

                                        <div className="mt-6 border-t border-white/[0.07] pt-5">
                                            <div className="flex items-center justify-between gap-3">
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
                                                >
                                                    GitHub repository
                                                    <span aria-hidden="true">↗</span>
                                                </a>

                                                <Link
                                                    to={`/projects/${project._id}`}
                                                    className="text-sm font-medium text-slate-400 transition hover:text-white"
                                                >
                                                    Details →
                                                </Link>
                                            </div>

                                            <div className="mt-5 grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(project)}
                                                    disabled={loading || deletingId !== null}
                                                    className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-400/[0.07] hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    Edit project
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(project._id)}
                                                    disabled={deletingId !== null || loading}
                                                    className="rounded-xl border border-red-400/15 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-400/30 hover:bg-red-400/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {deletingId === project._id
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <footer className="mt-16 border-t border-white/[0.07] py-6 text-center">
                    <p className="text-xs text-slate-500">
                        Dev<span className="font-semibold text-slate-400">Connect</span>
                        {" "}· Built for developers, by developers.
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default Dashboard;