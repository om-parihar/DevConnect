import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-white/[0.08] bg-[#080b14] text-slate-400">
            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            to="/"
                            className="inline-block text-xl font-bold tracking-tight text-white"
                        >
                            Dev<span className="text-blue-400">Connect</span>
                            <span className="text-violet-400">.</span>
                        </Link>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            Discover projects, share your work, and connect
                            with developers building the future.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                        <Link
                            to="/"
                            className="transition hover:text-blue-400"
                        >
                            Explore
                        </Link>

                        <Link
                            to="/dashboard"
                            className="transition hover:text-blue-400"
                        >
                            Dashboard
                        </Link>

                        <a
                            href="https://github.com/om-parihar"
                            target="_blank"
                            rel="noreferrer"
                            className="transition hover:text-blue-400"
                        >
                            GitHub ↗
                        </a>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-5 text-center text-xs text-slate-600 sm:flex sm:items-center sm:justify-between sm:text-left">
                    <p>
                        © {new Date().getFullYear()} DevConnect. All rights
                        reserved.
                    </p>

                    <p className="mt-2 sm:mt-0">
                        Built for developers, by developers.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;