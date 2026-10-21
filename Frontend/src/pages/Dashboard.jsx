import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        techStack: "",
        github: ""
    });

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await api.get("/projects/mine");
                setProjects(response.data.projects || []);
            } catch (error) {
                setIsError(true);
                setMessage(
                    error.response?.data?.message || "Failed to fetch projects"
                );
            }
        };

        getProjects();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            title: "",
            description: "",
            techStack: "",
            github: ""
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);
        setLoading(true);

        try {
            const response = await api.post("/projects", {
                ...formData,
                techStack: formData.techStack
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean)
            });

            setProjects((prev) => [
                response.data.project,
                ...prev
            ]);

            resetForm();
            setMessage("Project created successfully.");
        } catch (error) {
            setIsError(true);
            setMessage(
                error.response?.data?.message || "Failed to create project"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);

        setFormData({
            title: project.title,
            description: project.description,
            techStack: project.techStack.join(", "),
            github: project.github
        });

        setMessage("");
        setIsError(false);

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
            const response = await api.put(`/projects/${editingId}`, {
                ...formData,
                techStack: formData.techStack
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean)
            });

            setProjects((prev) =>
                prev.map((project) =>
                    project._id === editingId
                        ? response.data.project
                        : project
                )
            );

            resetForm();
            setMessage("Project updated successfully.");
        } catch (error) {
            setIsError(true);
            setMessage(
                error.response?.data?.message || "Failed to update project"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) return;

        setMessage("");
        setIsError(false);

        try {
            const response = await api.delete(`/projects/${id}`);

            setProjects((prev) =>
                prev.filter((project) => project._id !== id)
            );

            if (editingId === id) {
                resetForm();
            }

            setMessage(
                response.data.message || "Project deleted successfully."
            );
        } catch (error) {
            setIsError(true);
            setMessage(
                error.response?.data?.message || "Failed to delete project"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
                            Workspace
                        </p>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            My Dashboard
                        </h1>
                        <p className="mt-3 text-gray-400">
                            Manage your projects and showcase what you're building.
                        </p>
                    </div>

                    <Link
                        to="/"
                        className="inline-flex w-fit items-center justify-center rounded-xl border border-gray-700 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:border-blue-500 hover:text-blue-400"
                    >
                        Explore Projects
                    </Link>
                </div>

                <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl shadow-black/10 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold">
                                {editingId ? "Edit Project" : "Create a Project"}
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                {editingId
                                    ? "Update your project's information."
                                    : "Add your latest work to the DevConnect community."}
                            </p>
                        </div>

                        <form
                            onSubmit={editingId ? handleUpdate : handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
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
                                    className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="What does your project do?"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                    className="w-full resize-y rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="techStack"
                                    className="mb-2 block text-sm font-medium text-gray-300"
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
                                    className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    Separate technologies with commas.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="github"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
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
                                    className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            {message && (
    <p
        role={isError ? "alert" : "status"}
        className={`rounded-xl border px-4 py-3 text-sm ${
            isError
                ? "border-red-500/20 bg-red-500/10 text-red-300"
                : "border-green-500/20 bg-green-500/10 text-green-300"
        }`}
    >
                            {message}
                            <button
                                type="button"
                                onClick={() => {
                                    setMessage("");
                                    setIsError(false);
                                }}
                                className="ml-3 font-semibold underline"
                            >
                                Dismiss
                            </button>
                        </p>
                    )}

                            <div className="flex flex-wrap gap-3 pt-1">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Please wait..."
                                        : editingId
                                            ? "Update Project"
                                            : "Create Project"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        disabled={loading}
                                        className="rounded-xl border border-gray-700 px-5 py-3 font-semibold text-gray-300 transition hover:bg-gray-800 disabled:opacity-60"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950/40 p-6 sm:p-8">
                        <div>
                            <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                                Your Workspace
                            </span>

                            <h2 className="mt-6 max-w-md text-3xl font-bold leading-tight sm:text-4xl">
                                Turn your ideas into something{" "}
                                <span className="text-blue-400">real.</span>
                            </h2>

                            <p className="mt-4 max-w-md leading-7 text-gray-400">
                                Keep your projects organized, share your GitHub
                                repositories, and let other developers discover
                                what you create.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-5">
                                <p className="text-sm text-gray-400">
                                    Total projects
                                </p>
                                <p className="mt-2 text-3xl font-bold text-white">
                                    {projects.length}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-5">
                                <p className="text-sm text-gray-400">
                                    Technologies used
                                </p>
                                <p className="mt-2 text-3xl font-bold text-white">
                                    {new Set(
                                        projects.flatMap(
                                            (project) => project.techStack || []
                                        )
                                    ).size}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-2xl font-bold">Your Projects</h2>
                            <p className="mt-2 text-sm text-gray-400">
                                All the projects you've shared on DevConnect.
                            </p>
                        </div>

                        <p className="text-sm text-gray-500">
                            {projects.length}{" "}
                            {projects.length === 1 ? "project" : "projects"}
                        </p>
                    </div>

                    {projects.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/50 px-6 py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-700 bg-gray-900 text-blue-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            </div>

                            <h3 className="mt-5 text-lg font-semibold">
                                No projects yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-400">
                                Your next great project belongs here. Use the
                                form above to share it with the community.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {projects.map((project) => (
                                <article
                                    key={project._id}
                                    className="flex flex-col rounded-2xl border border-gray-800 bg-gray-900 p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20"
                                >
                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-lg font-bold text-blue-400">
                                            {project.title?.charAt(0).toUpperCase() || "P"}
                                        </div>

                                        <span className="rounded-full border border-gray-700 bg-gray-950 px-3 py-1 text-xs text-gray-400">
                                            Your project
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold">
                                        {project.title}
                                    </h3>

                                    <p className="mt-3 flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-gray-400">
                                        {project.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {(project.techStack || []).map(
                                            (tech, index) => (
                                                <span
                                                    key={`${tech}-${index}`}
                                                    className="rounded-lg border border-gray-700 bg-gray-950 px-2.5 py-1.5 text-xs font-medium text-blue-300"
                                                >
                                                    {tech}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <div className="mt-6 border-t border-gray-800 pt-5">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                                            >
                                                View GitHub ↗
                                            </a>

                                            <Link
                                                to={`/projects/${project._id}`}
                                                className="text-sm font-semibold text-gray-300 transition hover:text-white"
                                            >
                                                Details
                                            </Link>
                                        </div>

                                        <div className="mt-5 grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(project)}
                                                className="rounded-xl border border-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-300"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(project._id)}
                                                className="rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-500/50 hover:bg-red-500/10"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;