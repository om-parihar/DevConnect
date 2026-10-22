import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [techStack, setTechStack] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const getProjects = async (searchValue = search, techValue = techStack) => {
        try {
            setLoading(true);
            setMessage("");

            const params = {};

            if (searchValue.trim()) {
                params.search = searchValue.trim();
            }

            if (techValue.trim()) {
                params.techStack = techValue.trim();
            }

            const response = await api.get("/projects", { params });
            setProjects(response.data.projects || []);
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to fetch projects. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        getProjects();
    };

    const clearFilters = () => {
        setSearch("");
        setTechStack("");
        getProjects("", "");
    };

    return (
        <div className="min-h-screen overflow-hidden bg-[#080b14] text-slate-100">
            <section className="relative isolate border-b border-white/[0.07]">
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute left-1/2 top-[-180px] h-[480px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
                    <div className="absolute left-[-150px] top-40 h-72 w-72 rounded-full bg-violet-600/10 blur-[100px]" />
                    <div className="absolute right-[-100px] top-60 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:pt-32">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-blue-300 sm:text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
                            </span>
                            Built by developers, for developers
                        </div>

                        <h1 className="mt-8 text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Your next idea
                            <br />
                            starts{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                right here.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
                            Discover what developers are building, explore new
                            technologies, and find inspiration for your next
                            project.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b14]"
                            >
                                Explore Projects
                                <span aria-hidden="true">↓</span>
                            </a>

                            <Link
                                to="/dashboard"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-semibold text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            >
                                <span aria-hidden="true">+</span>
                                Share Your Project
                            </Link>
                        </div>

                        <div className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/[0.07] pt-7 text-xs text-slate-500 sm:text-sm">
                            <span className="flex items-center gap-2">
                                <span className="text-blue-400">✳</span>
                                Discover ideas
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-violet-400">⌘</span>
                                Explore tech stacks
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-cyan-400">↗</span>
                                Build together
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="projects"
                className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
            >
                <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                            <span className="h-px w-6 bg-blue-400" />
                            The community
                        </div>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Explore projects<span className="text-blue-400">.</span>
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                            From side projects to ambitious ideas, find
                            something worth exploring.
                        </p>
                    </div>

                    {!loading && !message && (
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-slate-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            <span className="font-semibold text-white">
                                {projects.length}
                            </span>
                            {projects.length === 1 ? "project found" : "projects found"}
                        </div>
                    )}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mb-10 rounded-2xl border border-white/[0.09] bg-[#0e1320] p-4 shadow-xl shadow-black/10 sm:p-5"
                >
                    <div className="mb-4 flex items-center gap-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-5 w-5 text-blue-400"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m16 16 4 4" />
                        </svg>
                        <h3 className="text-sm font-semibold text-white">
                            Find your next inspiration
                        </h3>
                    </div>

                    <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto_auto]">
                        <label className="relative block min-w-0">
                            <span className="sr-only">Search projects</span>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="m16 16 4 4" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by title or description"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-white/[0.09] bg-[#080b14] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                        </label>

                        <label className="relative block min-w-0">
                            <span className="sr-only">Filter by technology</span>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                                aria-hidden="true"
                            >
                                <path d="M4 7h16M7 12h10m-7 5h4" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Filter by tech stack"
                                value={techStack}
                                onChange={(e) => setTechStack(e.target.value)}
                                className="w-full rounded-xl border border-white/[0.09] bg-[#080b14] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Searching
                                </>
                            ) : (
                                <>
                                    Search
                                    <span aria-hidden="true">→</span>
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={clearFilters}
                            disabled={loading || (!search && !techStack)}
                            className="rounded-xl border border-white/[0.09] px-4 py-3.5 text-sm font-medium text-slate-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Clear
                        </button>
                    </div>
                </form>

                <div className="mb-5 flex items-center justify-between border-b border-white/[0.07] pb-4">
                    <h3 className="text-sm font-semibold text-slate-200 sm:text-base">
                        {search || techStack ? "Search results" : "Recently discovered"}
                    </h3>
                    <span className="text-xs text-slate-500">
                        {loading ? "Loading..." : "Community showcase"}
                    </span>
                </div>

                {loading && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse rounded-2xl border border-white/[0.07] bg-[#0e1320] p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="h-11 w-11 rounded-xl bg-slate-800" />
                                    <div className="h-5 w-20 rounded-full bg-slate-800" />
                                </div>
                                <div className="mt-7 h-5 w-3/4 rounded bg-slate-800" />
                                <div className="mt-4 h-3 rounded bg-slate-800" />
                                <div className="mt-2 h-3 w-5/6 rounded bg-slate-800" />
                                <div className="mt-6 flex gap-2">
                                    <div className="h-6 w-16 rounded-lg bg-slate-800" />
                                    <div className="h-6 w-20 rounded-lg bg-slate-800" />
                                </div>
                                <div className="mt-8 h-10 rounded-xl bg-slate-800" />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && message && (
                    <div
                        role="alert"
                        className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-8 text-center"
                    >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10 text-xl text-red-300">
                            !
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-white">
                            Couldn't load projects
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">{message}</p>
                        <button
                            type="button"
                            onClick={() => getProjects()}
                            className="mt-5 rounded-xl border border-red-400/20 px-5 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !message && projects.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-white/10 bg-[#0e1320]/60 px-6 py-16 text-center sm:py-20">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/15 bg-blue-400/[0.07] text-2xl text-blue-300">
                            {"</>"}
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-white">
                            No projects found
                        </h3>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                            Nothing matches those filters just yet. Try another
                            search or explore all available projects.
                        </p>
                        <button
                            type="button"
                            onClick={clearFilters}
                            disabled={!search && !techStack}
                            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {!loading && !message && projects.length > 0 && (
                    <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <article
                                key={project._id}
                                className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0e1320] transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-[#111827] hover:shadow-2xl hover:shadow-blue-950/20"
                            >
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/15 bg-gradient-to-br from-blue-500/15 to-violet-500/10 text-lg font-bold text-blue-300 transition group-hover:border-blue-400/30">
                                            {"</>"}
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                            Community project
                                        </span>
                                    </div>

                                    <h3 className="mt-6 break-words text-xl font-bold leading-snug text-white transition group-hover:text-blue-300">
                                        {project.title}
                                    </h3>

                                    <p className="mt-3 line-clamp-3 flex-1 break-words text-sm leading-6 text-slate-400">
                                        {project.description}
                                    </p>

                                    <div className="mt-5 flex min-h-7 flex-wrap gap-2">
                                        {(Array.isArray(project.techStack)
                                            ? project.techStack
                                            : []
                                        ).slice(0, 4).map((tech, index) => (
                                            <span
                                                key={`${tech}-${index}`}
                                                className="max-w-full break-words rounded-lg border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 text-xs font-medium text-slate-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}

                                        {Array.isArray(project.techStack) &&
                                            project.techStack.length > 4 && (
                                                <span className="rounded-lg border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 text-xs text-slate-500">
                                                    +{project.techStack.length - 4}
                                                </span>
                                            )}
                                    </div>

                                    <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-400/15 bg-violet-400/10 text-sm font-bold text-violet-300">
                                            {(project.owner?.name || "U")
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[11px] text-slate-500">
                                                Created by
                                            </p>
                                            <p className="truncate text-sm font-medium text-slate-300">
                                                {project.owner?.name || "Unknown"}
                                            </p>
                                        </div>
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Open GitHub repository for ${project.title}`}
                                                title="Open GitHub repository"
                                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.56.23 2.71.11 3 .72.78 1.16 1.78 1.16 3 0 4.3-2.62 5.24-5.11 5.52.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>

                                    <Link
                                        to={`/projects/${project._id}`}
                                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/[0.07] px-4 py-3 text-sm font-semibold text-blue-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                    >
                                        View project details
                                        <span className="transition group-hover:translate-x-1" aria-hidden="true">
                                            →
                                        </span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <footer className="border-t border-white/[0.07] bg-[#070910] px-5 py-8 sm:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                    <Link to="/" className="text-sm font-bold tracking-tight text-slate-300 transition hover:text-white">
                        Dev<span className="text-blue-400">Connect</span>
                    </Link>
                    <p className="text-xs text-slate-500">
                        Built with passion by developers, for developers.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;