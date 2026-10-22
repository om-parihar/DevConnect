import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
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
        setIsError(false);
        setLoading(true);

        try {
            const response = await api.post("/auth/register", {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password
            });

            setIsError(false);
            setMessage(
                response.data.message ||
                "Registration successful! You can now log in."
            );

            setFormData({
                name: "",
                email: "",
                password: ""
            });
        } catch (error) {
            setIsError(true);
            setMessage(
                error.response?.data?.message ||
                "Registration failed. Please try again."
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
                            Your next chapter starts here
                        </p>

                        <h2 className="mt-5 max-w-md text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
                            Your ideas
                            <br />
                            deserve to be
                            <br />
                            <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                                discovered.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                            Join a community of developers, showcase your
                            projects, and turn the things you build into
                            opportunities to connect and collaborate.
                        </p>

                        <div className="mt-9 space-y-4">
                            {[
                                {
                                    number: "01",
                                    title: "Create your profile",
                                    detail: "Start building your developer presence."
                                },
                                {
                                    number: "02",
                                    title: "Share your projects",
                                    detail: "Showcase your work and tech stack."
                                },
                                {
                                    number: "03",
                                    title: "Explore the community",
                                    detail: "Discover what other developers create."
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
                            GET STARTED
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Create your account
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            Set up your account and start sharing your work.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Full name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                                minLength={2}
                                maxLength={100}
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Email address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$"
                                title="Enter a valid email, e.g. name@example.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="At least 8 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    minLength={8}
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

                            <p className="mt-2 text-xs leading-5 text-slate-500">
                                Use at least 8 characters.
                            </p>
                        </div>

                        {message && (
                            <div
                                role={isError ? "alert" : "status"}
                                className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm leading-6 ${
                                    isError
                                        ? "border-red-400/20 bg-red-400/[0.06] text-red-200"
                                        : "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200"
                                }`}
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current/30 text-xs">
                                    {isError ? "!" : "✓"}
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create account
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
                            ALREADY A MEMBER?
                        </span>
                        <div className="h-px flex-1 bg-white/[0.07]" />
                    </div>

                    <Link
                        to="/login"
                        className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-400/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        Sign in to your account
                    </Link>

                    <p className="mt-8 text-center text-xs leading-5 text-slate-500">
                        Connect. Collaborate. Create.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;