import { generateMealPlan } from "../services/aiService.js";
import MealPlan from "../models/MealPlan.js";

export const createMealPlan = async (req, res) => {
    try{
        const { goal, preferences,userId } = req.body;

        if (!goal || !preferences) {
           return res.status(400).json({ error: "Goal and preferences are required" });
        }

        const plan = await generateMealPlan(goal, preferences);

        const newPlan = await MealPlan.create({
            goal,
            preferences,
            plan,
        });

        await newPlan.save();

        res.status(201).json({
            message: "Meal plan generated successfully!",
            data: newPlan,
    });
  } catch (error) {
    console.error("Error creating meal plan:", error.message);
    res.status(500).json({ error: "Failed to generate meal plan" });
  }
};

//to get the latest meal
export const getLatestMealPlan = async(req, res)=>{
    try{
        const userId = req.query.userId || "defaultuser";
        const latestPlan = await MealPlan.findOne({userId}).sort({createdAt: -1})

        if(!latestPlan){
            return res.status(404).json({ message: "No meal plan found" });
        }

        res.status(200).json(latestPlan);
    }
    catch(error){
        console.error("Error fetching latest meal plan:", error.message);
        res.status(500).json({error: "Failed to fetch meal plan"});
    }
};