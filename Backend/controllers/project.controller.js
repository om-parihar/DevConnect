import Project from "../models/Project.js"

export const createProject = async (req,res) => {
    try{
        const {title, description, techStack, github} = req.body;

        if(!title || !description || !github){
            return res.status(400).json({
                success: false,
                message: "Title,description and GitHub repo are required"
            });
        }

        const project = await Project.create({
            title,
            description,
            techStack,
            github,
            owner: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project
        });
    } catch (error) {
        console.error(error);
        
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const getProjects = async (req, res) => {
    try {
        const { search, techStack, mine } = req.query;

        const filter = {};

        if (mine === "true") {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Please log in to view your projects"
                });
            }

            filter.owner = req.user._id;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        if (techStack) {
            filter.techStack = {
                $regex: techStack,
                $options: "i"
            };
        }

        const projects = await Project.find(filter)
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: projects.length,
            projects
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate("owner", "name email");

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            project
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own projects"
            });
        }

        const { title, description, techStack, github } = req.body;

        if (title !== undefined) project.title = title;
        if (description !== undefined) project.description = description;
        if (techStack !== undefined) project.techStack = techStack;
        if (github !== undefined) project.github = github;

        await project.save();

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own projects"
            });
        }

        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



export const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            owner: req.user._id
        })
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: projects.length,
            projects
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
