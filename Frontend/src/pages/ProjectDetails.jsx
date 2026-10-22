import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProject = async () => {
            setLoading(true);
            setMessage("");

            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data.project);
            } catch (error) {
                setMessage(
                    error.response?.data?.message ||
                    "Failed to fetch project"
                );
            } finally {
                setLoading(false);
            }
        };

        getProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 px-6 py-24 text-slate-100">
                <div className="mx-auto max-w-4xl animate-pulse space-y-6">
                    <div className="h-5 w-36 rounded bg-slate-800" />
                    <div className="h-12 w-2/3 rounded-xl bg-slate-800" />
                    <div className="h-32 rounded-2xl bg-slate-900" />
                    <div className="h-48 rounded-2xl bg-slate-900" />
                </div>
            </div>
        );
    }

    if (message || !project) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-slate-100">
                <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl sm:p-12">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl text-red-400">
                        !
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Project unavailable
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        {message || "This project could not be found."}
                    </p>
                    <Link
                        to="/"
                        className="mt-8 inline-flex items-center rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                    >
                        ← Back to Explore
                    </Link>
                </div>
            </div>
        );
    }

    const techStack = Array.isArray(project.techStack)
        ? project.techStack
        : [];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="pointer-events-none fixed inset-x-0 top-0 -z-0 h-96 bg-gradient-to-b from-indigo-600/10 via-violet-500/5 to-transparent" />

            <main className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-400 transition hover:text-white"
                >
                    <span className="transition group-hover:-translate-x-1">←</span>
                    Back to Explore
                </Link>

                <section className="relative mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-6 shadow-2xl sm:mt-10 sm:p-10 lg:p-12">
                    <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
                    <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

                    <div className="relative">
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-indigo-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                                PROJECT SHOWCASE
                            </span>
                            <span className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-400">
                                Developer community
                            </span>
                        </div>

                        <h1 className="max-w-4xl break-words text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {project.title}
                        </h1>

                        <p className="mt-5 max-w-3xl whitespace-pre-wrap break-words text-base leading-8 text-slate-300 sm:text-lg">
                            {project.description}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.56.23 2.71.11 3 .72.78 1.16 1.78 1.16 3 0 4.3-2.62 5.24-5.11 5.52.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
                                    </svg>
                                    View GitHub Repository
                                    <span aria-hidden="true">↗</span>
                                </a>
                            )}

                            <button
                                type="button"
                                onClick={() => {
                                    if (navigator.clipboard) {
                                        navigator.clipboard.writeText(window.location.href);
                                    }
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
                            >
                                <span aria-hidden="true">↗</span>
                                Share Project
                            </button>
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-300">
                                {"</>"}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    Technologies & Tools
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Built with these technologies
                                </p>
                            </div>
                        </div>

                        {techStack.length > 0 ? (
                            <div className="mt-6 flex flex-wrap gap-2.5">
                                {techStack.map((tech, index) => (
                                    <span
                                        key={`${tech}-${index}`}
                                        className="rounded-xl border border-indigo-400/20 bg-indigo-400/[0.07] px-4 py-2 text-sm font-medium text-indigo-200 transition hover:border-indigo-400/40 hover:bg-indigo-400/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-6 text-sm text-slate-500">
                                No technologies have been added yet.
                            </p>
                        )}
                    </section>

                    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-xl text-violet-300">
                                ♙
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    Project Owner
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Contributed to the community
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white">
                                {(project.owner?.name || "U")
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <p className="break-words font-semibold text-white">
                                    {project.owner?.name || "Unknown"}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Project creator
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 border-t border-slate-800 pt-5">
                            <p className="text-xs leading-5 text-slate-500">
                                Discover projects, explore different tech stacks,
                                and learn from fellow developers.
                            </p>
                        </div>
                    </section>
                </div>

                <footer className="mt-8 border-t border-slate-800/80 py-6 text-center">
                    <p className="text-xs text-slate-500">
                        Built for developers, by developers.
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default ProjectDetails;