import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const registUser = async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error){
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordCorrect){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {userId : user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error){
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const getMe = async (req,res) => {
    try{
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const updateProfile = async(req,res) =>{
    try{
        const {name, bio, skills, github, linkedin, avatar} = req.body;

        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if(name != undefined) user.name = name;
        if(bio != undefined) user.bio = bio;
        if(skills != undefined) user.skills = skills;
        if(github != undefined) user.github = github;
        if(linkedin != undefined) user.linkedin = linkedin;
        if(avatar != undefined) user.avatar = avatar;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                skills: user.skills,
                github: user.github,
                linkedin: user.linkedin,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "server error"
        });
    }
};