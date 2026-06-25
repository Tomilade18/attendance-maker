import express from "express";
import { connectDB, disconnectDB } from "./config/db.js";



// Import Routes
import authRoutes from "./routes/authRoutes.js"



const app = express();
app.use(express.json());

//API routes
app.use("/auth", authRoutes);




const PORT = 5002;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})