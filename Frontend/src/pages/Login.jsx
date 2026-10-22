import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email: formData.email.trim(),
                password: formData.password
            });

            login(response.data.token);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Login failed. Please check your credentials and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-white/[0.09] bg-[#090d17] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/15 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

    return (
        <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden bg-[#080b14] px-4 py-12 text-white sm:px-6">
            <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-600/[0.09] blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-600/[0.08] blur-[130px]" />

            <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b101c] shadow-2xl shadow-black/30 lg:grid-cols-2">
                <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/[0.07] bg-gradient-to-br from-[#111b32] via-[#111426] to-[#17102b] p-10 lg:flex xl:p-12">
                    <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-blue-500/15 blur-[90px]" />
                    <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-violet-500/15 blur-[90px]" />

                    <Link
                        to="/"
                        className="relative z-10 w-fit text-2xl font-extrabold tracking-tight"
                    >
                        <span className="text-blue-400">Dev</span>Connect
                        <span className="text-blue-400">.</span>
                    </Link>

                    <div className="relative z-10 py-12">
                        <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-300/[0.08] text-2xl font-bold text-blue-300">
                            {"</>"}
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">
                            Your developer community
                        </p>

                        <h2 className="mt-5 max-w-md text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
                            Good to see you
                            <br />
                            <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                                building again.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                            Pick up where you left off. Manage your projects,
                            share what you've built, and discover what other
                            developers are creating.
                        </p>

                        <div className="mt-9 space-y-4">
                            {[
                                "Showcase your latest projects",
                                "Keep your repositories in reach",
                                "Discover ideas from the community"
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 text-sm text-slate-300"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] text-xs text-emerald-300">
                                        ✓
                                    </span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="relative z-10 text-xs text-slate-500">
                        Connect. Collaborate. Create.
                    </p>
                </div>

                <div className="p-6 sm:p-10 lg:p-10 xl:p-12">
                    <div className="mb-9 lg:hidden">
                        <Link
                            to="/"
                            className="text-2xl font-extrabold tracking-tight"
                        >
                            <span className="text-blue-400">Dev</span>Connect
                            <span className="text-blue-400">.</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-3 py-1.5 text-xs font-semibold text-blue-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            WELCOME BACK
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Sign in to your account
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            Enter your details to access your workspace.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                autoCapitalize="none"
                                spellCheck={false}
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-300"
                                >
                                    Password
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                    className={`${inputClass} pr-20`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    aria-pressed={showPassword}
                                    className="absolute inset-y-0 right-3 my-auto h-fit rounded-md px-2 py-1 text-xs font-semibold text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {message && (
                            <div
                                role="alert"
                                className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3.5 text-sm leading-6 text-red-200"
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-red-300/30 text-xs">
                                    !
                                </span>
                                <p>{message}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b101c] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <span className="transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/[0.07]" />
                        <span className="text-xs text-slate-500">
                            NEW TO DEVCONNECT?
                        </span>
                        <div className="h-px flex-1 bg-white/[0.07]" />
                    </div>

                    <Link
                        to="/register"
                        className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-400/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        Create an account
                    </Link>

                    <p className="mt-8 text-center text-xs leading-5 text-slate-500">
                        By continuing, you're ready to connect, collaborate,
                        and create.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;