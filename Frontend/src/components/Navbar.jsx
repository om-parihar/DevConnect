import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        setMenuOpen(false);
        logout();
        navigate("/login", { replace: true });
    };

    const linkClass = (path) =>
        `relative rounded-lg px-3 py-2 text-sm font-medium transition duration-200 ${
            location.pathname === path
                ? "bg-indigo-500/10 text-indigo-300"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
        }`;

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080b14]/85 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="group flex items-center gap-2.5"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-black shadow-lg shadow-indigo-500/20 transition duration-300 group-hover:scale-105">
                        D
                    </div>

                    <span className="text-xl font-bold tracking-tight sm:text-2xl">
                        Dev<span className="text-blue-400">Connect</span>
                        <span className="text-violet-400">.</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-2 md:flex">
                    <Link to="/" className={linkClass("/")}>
                        Explore
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={linkClass("/dashboard")}
                            >
                                Dashboard
                            </Link>

                            <div className="mx-2 h-6 w-px bg-white/10" />

                            <button
                                onClick={handleLogout}
                                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={linkClass("/login")}>
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="ml-1 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/20 transition duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-violet-500 hover:shadow-blue-500/30"
                            >
                                Get Started <span className="ml-1">→</span>
                            </Link>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/10 md:hidden"
                >
                    {menuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <path d="M4 7h16" />
                            <path d="M4 12h16" />
                            <path d="M4 17h16" />
                        </svg>
                    )}
                </button>
            </div>

            {menuOpen && (
                <div className="border-t border-white/[0.08] bg-[#0b0f1a] px-5 py-4 md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-2">
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className={linkClass("/")}
                        >
                            Explore
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={closeMenu}
                                    className={linkClass("/dashboard")}
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="mt-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-left text-sm font-semibold text-red-300 transition hover:bg-red-500/15"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className={linkClass("/login")}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-center text-sm font-semibold transition hover:from-blue-500 hover:to-violet-500"
                                >
                                    Get Started →
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;