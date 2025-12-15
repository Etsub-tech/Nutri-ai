import { generateMealPlan } from "../services/aiService.js";
import MealPlan from "../models/MealPlan.js";

export const createMealPlan = async (req, res) => {
    try{
        const { goal, preference, preferences, userId } = req.body;
        const userPreferences = preferences || preference;

        if (!goal || !userPreferences) {
           return res.status(400).json({ error: "Goal and preferences are required" });
        }

        const plan = await generateMealPlan(goal, userPreferences);

        // Handle case where plan might be { planText: text } if JSON parsing failed
        if (plan.planText) {
            console.error("AI returned planText instead of JSON:", plan.planText);
            return res.status(500).json({ 
                error: "AI returned invalid format. Please try again.",
                details: "The AI response could not be parsed as JSON"
            });
        }

        // Transform the plan to match frontend expectations
        let mealPlan = [];
        
        if (plan && typeof plan === 'object') {
            mealPlan = Object.entries(plan).map(([day, meals]) => {
                // If meals is an array, convert to object format
                if (Array.isArray(meals)) {
                    const mealsObj = {};
                    meals.forEach(meal => {
                        if (typeof meal === 'string') {
                            const colonIndex = meal.indexOf(':');
                            if (colonIndex > 0) {
                                const mealType = meal.substring(0, colonIndex).trim();
                                const mealText = meal.substring(colonIndex + 1).trim();
                                if (mealType && mealText) {
                                    mealsObj[mealType] = mealText;
                                }
                            }
                        }
                    });
                    return { day, meals: mealsObj };
                }
                // If already an object, use it directly
                return { day, meals: meals || {} };
            }).filter(item => item && item.day && (Object.keys(item.meals || {}).length > 0 || Array.isArray(item.meals)));
        }

        // If transformation resulted in empty array, try a simpler format
        if (mealPlan.length === 0 && plan && typeof plan === 'object') {
            console.warn("Standard transformation failed, trying fallback format");
            // Fallback: return plan as-is but in array format
            mealPlan = Object.entries(plan).map(([day, meals]) => {
                if (Array.isArray(meals)) {
                    // If it's an array of strings, create a simple meals object
                    const mealsObj = {};
                    meals.forEach((meal, idx) => {
                        if (typeof meal === 'string') {
                            const colonIndex = meal.indexOf(':');
                            if (colonIndex > 0) {
                                const mealType = meal.substring(0, colonIndex).trim();
                                const mealText = meal.substring(colonIndex + 1).trim();
                                mealsObj[mealType] = mealText;
                            } else {
                                // If no colon, use index as key
                                mealsObj[`Meal ${idx + 1}`] = meal;
                            }
                        } else {
                            mealsObj[`Meal ${idx + 1}`] = String(meals);
                        }
                    });
                    return { day, meals: mealsObj };
                } else if (typeof meals === 'object' && meals !== null) {
                    return { day, meals: meals };
                } else {
                    return { day, meals: { "Meal": String(meals) } };
                }
            });
        }

        // If still empty, return error with plan structure for debugging
        if (mealPlan.length === 0) {
            console.error("Meal plan transformation resulted in empty array. Plan structure:", JSON.stringify(plan, null, 2));
            return res.status(500).json({ 
                error: "Failed to process meal plan format",
                details: "The AI response format was unexpected. Please check the backend logs."
            });
        }

        const newPlan = await MealPlan.create({
            goal,
            preferences: userPreferences,
            plan,
            userId: userId || "defaultUser",
        });

        await newPlan.save();

        res.status(201).json({
            message: "Meal plan generated successfully!",
            mealPlan: mealPlan,
            data: newPlan,
    });
  } catch (error) {
    console.error("Error creating meal plan:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ 
        error: "Failed to generate meal plan",
        details: error.message 
    });
  }
};

//to get the latest meal
export const getLatestMealPlan = async(req, res)=>{
    try{
        const userId = req.query.userId || req.params.userId || "defaultUser";
        const latestPlan = await MealPlan.findOne({userId}).sort({createdAt: -1})

        if(!latestPlan){
            return res.status(404).json({ message: "No meal plan found" });
        }

        // Transform to match frontend expectations
        const mealPlan = latestPlan.plan && typeof latestPlan.plan === 'object' 
            ? Object.entries(latestPlan.plan).map(([day, meals]) => {
                if (Array.isArray(meals)) {
                    const mealsObj = {};
                    meals.forEach(meal => {
                        if (typeof meal === 'string') {
                            const colonIndex = meal.indexOf(':');
                            if (colonIndex > 0) {
                                const mealType = meal.substring(0, colonIndex).trim();
                                const mealText = meal.substring(colonIndex + 1).trim();
                                if (mealType && mealText) {
                                    mealsObj[mealType] = mealText;
                                }
                            }
                        }
                    });
                    return { day, meals: mealsObj };
                }
                return { day, meals: meals || {} };
            }).filter(item => item.day && Object.keys(item.meals).length > 0)
            : [];

        res.status(200).json({
            ...latestPlan.toObject(),
            mealPlan: mealPlan,
            title: `Meal Plan - ${latestPlan.goal}`,
            date: latestPlan.createdAt.toLocaleDateString()
        });
    }
    catch(error){
        console.error("Error fetching latest meal plan:", error.message);
        res.status(500).json({error: "Failed to fetch meal plan"});
    }
};

// Get all meal plans for a user
export const getAllMealPlans = async(req, res)=>{
    try{
        const userId = req.query.userId || req.params.userId || "defaultUser";
        const plans = await MealPlan.find({userId}).sort({createdAt: -1}).limit(20);

        const formattedPlans = plans.map(plan => ({
            ...plan.toObject(),
            title: `Meal Plan - ${plan.goal}`,
            date: plan.createdAt.toLocaleDateString()
        }));

        res.status(200).json(formattedPlans);
    }
    catch(error){
        console.error("Error fetching meal plans:", error.message);
        res.status(500).json({error: "Failed to fetch meal plans"});
    }
};

// Get meal plan by ID
export const getMealPlanById = async(req, res)=>{
    try{
        const planId = req.params.id;
        const plan = await MealPlan.findById(planId);

        if(!plan){
            return res.status(404).json({ message: "Meal plan not found" });
        }

        // Transform to match frontend expectations
        const mealPlan = plan.plan && typeof plan.plan === 'object' 
            ? Object.entries(plan.plan).map(([day, meals]) => {
                if (Array.isArray(meals)) {
                    const mealsObj = {};
                    meals.forEach(meal => {
                        if (typeof meal === 'string') {
                            const colonIndex = meal.indexOf(':');
                            if (colonIndex > 0) {
                                const mealType = meal.substring(0, colonIndex).trim();
                                const mealText = meal.substring(colonIndex + 1).trim();
                                if (mealType && mealText) {
                                    mealsObj[mealType] = mealText;
                                }
                            }
                        }
                    });
                    return { day, meals: mealsObj };
                }
                return { day, meals: meals || {} };
            }).filter(item => item.day && Object.keys(item.meals).length > 0)
            : [];

        res.status(200).json({
            ...plan.toObject(),
            mealPlan: mealPlan,
            title: `Meal Plan - ${plan.goal}`,
            date: plan.createdAt.toLocaleDateString()
        });
    }
    catch(error){
        console.error("Error fetching meal plan:", error.message);
        res.status(500).json({error: "Failed to fetch meal plan"});
    }
};

// Delete meal plan by ID
export const deleteMealPlan = async(req, res)=>{
    try{
        const planId = req.params.id;
        const deletedPlan = await MealPlan.findByIdAndDelete(planId);

        if(!deletedPlan){
            return res.status(404).json({ message: "Meal plan not found" });
        }

        res.status(200).json({ 
            message: "Meal plan deleted successfully",
            deletedPlan: deletedPlan
        });
    }
    catch(error){
        console.error("Error deleting meal plan:", error.message);
        res.status(500).json({error: "Failed to delete meal plan"});
    }
};