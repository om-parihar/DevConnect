import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProjectedRoute";
import ProjectDetails from "./pages/ProjectDetails";
import GuestRoute from "./components/GuestRoute";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen flex-col bg-[#080b14]">
                <Navbar />

                <main className="flex-1">
                    <Routes>
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/" element={<Home />} />

                        <Route
                            path="/register"
                            element={
                                <GuestRoute>
                                    <Register />
                                </GuestRoute>
                            }
                        />

                        <Route
                            path="/login"
                            element={
                                <GuestRoute>
                                    <Login />
                                </GuestRoute>
                            }
                        />

                        <Route
                            path="/projects/:id"
                            element={<ProjectDetails />}
                        />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;