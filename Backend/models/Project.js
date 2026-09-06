import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim: true
    },
    
    description: {
        type: String,
        required: true,
        trim: true
    },

    techStack: {
        type: [String],
        default: []
    },

    github: {
        type: String,
        required: true,
        trim: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Project = mongoose.model("Project", projectSchema);

export default Project;