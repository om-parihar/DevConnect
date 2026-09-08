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


export const getProjects = async(req,res) =>{
    try{
        const projects = await Project.find()
            .populate("owner", "name email")
            .sort({createAt: -1});

            res.status(200).json({
                success: true,
                count: projects.length,
                projects
            });
    } catch (error) {
        console.error(error);

        res.status(500).json({
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
                message: "You are not authorized to update this project"
            });
        }

        const { title, description, techStack, github } = req.body;

        project.title = title ?? project.title;
        project.description = description ?? project.description;
        project.techStack = techStack ?? project.techStack;
        project.github = github ?? project.github;

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