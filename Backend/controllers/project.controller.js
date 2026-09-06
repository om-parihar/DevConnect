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