import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import mealPlanRoutes from "./routes/mealPlanRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import dotenv from "dotenv";
dotenv.config(); //activaes .env file loading so i can use variables like port and secret mongodb password.

const app = express();

//middleware
app.use(cors());
app.use(express.json());

connectDb();

//Routes
app.use("/api/meal-plan", mealPlanRoutes);
app.use("/api/chat", chatRoutes);

//health check route
app.get("/",(req,res)=>{
    res.send("Meal Planner API is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
