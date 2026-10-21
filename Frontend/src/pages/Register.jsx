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

    return (
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-950 px-4 py-12 text-white">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link
                        to="/"
                        className="text-3xl font-extrabold tracking-tight text-blue-500"
                    >
                        DevConnect<span className="text-white">.</span>
                    </Link>

                    <h1 className="mt-6 text-3xl font-bold tracking-tight">
                        Join DevConnect
                    </h1>

                    <p className="mt-3 text-gray-400">
                        Create an account and share what you're building.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl shadow-black/20 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-300"
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
                                required
                                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-300"
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
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                title="Enter a valid email address, such as name@example.com"
                                required
                                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="At least 8 characters"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                minLength={8}
                                required
                                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Use at least 8 characters.
                            </p>
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
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-blue-400 transition hover:text-blue-300"
                        >
                            Log in
                        </Link>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-gray-600">
                    Connect. Collaborate. Create.
                </p>
            </div>
        </div>
    );
}

export default Register;