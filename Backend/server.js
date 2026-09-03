import express from "express";
import healthRoutes from "./routes/health.routes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app=express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/health",healthRoutes);
app.use("/api/auth",authRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});