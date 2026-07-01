import express from "express";
import { connectDB, disconnectDB } from "./config/db.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import attendancelistRoutes from "./routes/attendancelistRoutes.js";

const app = express();
app.use(express.json());

// API routes
app.use("/auth", authRoutes);
app.use("/classes", classRoutes);
app.use("/attendance", attendancelistRoutes);




const PORT = 5002;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})