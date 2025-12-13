import mongoose from "mongoose";
const mealPlanSchema = new mongoose.Schema({
    goal: String,
    Preferences: String,
    plan: Object,  //to hold the ai response JSON
    createdAt: { type: Date, default: Date.now }
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema); //creating a model called MealPlan based on the schema.
                                                            //a model gives you access to MongoDB operations like: MealPlan.create(), MealPlan.find(),Mealplan.deleteOne()...
export default MealPlan;