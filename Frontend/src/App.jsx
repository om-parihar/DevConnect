import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProjectedRoute";
import ProjectDetails from "./pages/ProjectDetails";
import GuestRoute from "./components/GuestRoute";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

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
                <Route path="/register" element={<GuestRoute> <Register /></GuestRoute>} />
                <Route path="/login" element={<GuestRoute> <Login /> </GuestRoute>} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
            <h1 className="text-3xl font-bold text-blue-600">
             DevConnect
            </h1>
        </BrowserRouter>
    );
}

export default App;