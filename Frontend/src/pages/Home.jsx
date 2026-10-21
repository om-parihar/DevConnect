
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [techStack, setTechStack] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const getProjects = async () => {
        try {
            setLoading(true);
            setMessage("");

            const params = {};

            if (search.trim()) {
                params.search = search.trim();
            }

            if (techStack.trim()) {
                params.techStack = techStack.trim();
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

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <section className="relative overflow-hidden border-b border-gray-800">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950/60 via-gray-950 to-purple-950/30" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 text-center sm:py-28">
                    <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                        Built by developers, for developers
                    </span>

                    <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
                        Discover projects.
                        <span className="block text-blue-500">
                            Build something amazing.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
                        Explore developer projects, discover new technologies,
                        and get inspired to build your next big idea.
                    </p>

                    <div className="mt-9 flex flex-wrap justify-center gap-4">
                        <a
                            href="#projects"
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
                        >
                            Explore Projects
                        </a>

                        <Link
                            to="/dashboard"
                            className="rounded-xl border border-gray-700 bg-gray-900 px-6 py-3 font-semibold transition hover:border-gray-500 hover:bg-gray-800"
                        >
                            Share Your Project
                        </Link>
                    </div>
                </div>
            </section>

            <section
                id="projects"
                className="mx-auto max-w-7xl px-6 py-16"
            >
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                        Community showcase
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Explore Projects
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Find interesting projects and explore how they were built.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mb-10 grid gap-4 rounded-2xl border border-gray-800 bg-gray-900/80 p-4 sm:grid-cols-[1fr_1fr_auto]"
                >
                    <input
                        type="text"
                        placeholder="Search by title or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="min-w-0 rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />

                    <input
                        type="text"
                        placeholder="Filter by tech stack..."
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                        className="min-w-0 rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </form>

                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-200">
                        Community Projects
                    </h3>

                    {!loading && !message && (
                        <span className="text-sm text-gray-500">
                            {projects.length} {projects.length === 1 ? "project" : "projects"}
                        </span>
                    )}
                </div>

                {loading && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse rounded-2xl border border-gray-800 bg-gray-900 p-6"
                            >
                                <div className="h-5 w-2/3 rounded bg-gray-800" />
                                <div className="mt-5 h-3 rounded bg-gray-800" />
                                <div className="mt-3 h-3 w-4/5 rounded bg-gray-800" />
                                <div className="mt-8 h-8 w-1/2 rounded bg-gray-800" />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && message && (
                    <div
                        role="alert"
                        className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300"
                    >
                        <p>{message}</p>

                        <button
                            onClick={getProjects}
                            className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 font-medium transition hover:bg-red-500/20"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !message && projects.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/50 px-6 py-16 text-center">
                        <div className="text-4xl">{"</>"}</div>

                        <h3 className="mt-4 text-xl font-bold">
                            No projects found
                        </h3>

                        <p className="mt-2 text-gray-400">
                            Try different search terms or clear your filters.
                        </p>

                        <button
                            onClick={() => {
                                setSearch("");
                                setTechStack("");
                                setTimeout(getProjects, 0);
                            }}
                            className="mt-6 rounded-xl border border-gray-700 px-5 py-2.5 font-medium transition hover:bg-gray-800"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {!loading && !message && projects.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <article
                                key={project._id}
                                className="group flex h-full flex-col rounded-2xl border border-gray-800 bg-gray-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-gray-900/90 hover:shadow-xl hover:shadow-blue-950/20"
                            >
                                <div className="mb-5 flex items-start justify-between gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-xl font-bold text-blue-400">
                                        {"</>"}
                                    </div>

                                    <span className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-400">
                                        Open Source
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold transition group-hover:text-blue-400">
                                    {project.title}
                                </h3>

                                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-gray-400">
                                    {project.description}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {(project.techStack || []).map((tech, index) => (
                                        <span
                                            key={`${tech}-${index}`}
                                            className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 border-t border-gray-800 pt-5">
                                    <p className="mb-4 text-sm text-gray-500">
                                        Created by{" "}
                                        <span className="font-medium text-gray-300">
                                            {project.owner?.name || "Unknown"}
                                        </span>
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <Link
                                            to={`/projects/${project._id}`}
                                            className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold transition hover:bg-blue-500"
                                        >
                                            View Details
                                        </Link>

                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-xl border border-gray-700 px-4 py-2.5 text-sm font-medium transition hover:border-gray-500 hover:bg-gray-800"
                                            >
                                                GitHub ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
                Built with passion by developers, for developers.
            </footer>
        </div>
    );
}

export default Home;
