
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <nav className="border-b border-gray-800 bg-gray-950 text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight text-blue-500"
                >
                    DevConnect<span className="text-white">.</span>
                </Link>

                <div className="flex items-center gap-3 sm:gap-6">
                    <Link
                        to="/"
                        className="text-sm text-gray-300 transition hover:text-white"
                    >
                        Explore
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-sm text-gray-300 transition hover:text-white"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium transition hover:bg-gray-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm text-gray-300 transition hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
