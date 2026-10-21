
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data.project);
            } catch (error) {
                setMessage(
                    error.response?.data?.message ||
                    "Failed to fetch project"
                );
            } finally {
                setLoading(false);
            }
        };

        getProject();
    }, [id]);

    if (loading) {
        return <p>Loading project...</p>;
    }

    if (message || !project) {
        return (
            <div>
                <p>{message || "Project not found"}</p>
                <Link to="/">Back to Projects</Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/">Back to Projects</Link>

            <h1>{project.title}</h1>
            <p>{project.description}</p>

            <h3>Tech Stack</h3>
            <p>{project.techStack.join(", ")}</p>

            <h3>Project Owner</h3>
            <p>{project.owner?.name || "Unknown"}</p>

            <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
            >
                View GitHub Repository
            </a>
        </div>
    );
}

export default ProjectDetails;
