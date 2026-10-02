import { generateMealPlan } from "../services/aiService.js";
import MealPlan from "../models/MealPlan.js";
import { parseBody } from "../utils/parseBody.js";
import { withTimeout } from "../utils/timeout.js";

export const createMealPlan = async (req, res, body) => {
  try {
    const { goal, preferences, userId } = body;

    if (!goal || !preferences) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Missing goal or preferences" }));
    }

    const plan = await withTimeout(
      generateMealPlan(goal, preferences),
      10000
    );

    const newPlan = await MealPlan.create({
      goal,
      preferences,
      plan,
      userId: userId || "defaultUser",
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Meal plan created",
      mealPlan: plan,
    }));

  } catch (err) {
    console.error("createMealPlan error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
};




//to get the latest meal
export const getLatestMealPlan = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId") || "defaultUser";

    const latestPlan = await MealPlan.findOne({ userId }).sort({ createdAt: -1 });

    if (!latestPlan) {
      return sendResponse(res, 404, { message: "No meal plan found" });
    }

    sendResponse(res, 200, {
      ...latestPlan.toObject(),
      title: `Meal Plan - ${latestPlan.goal}`,
      date: latestPlan.createdAt.toLocaleDateString(),
    });

  } catch (error) {
    console.error("❌ getLatestMealPlan error:", error);
    sendResponse(res, 500, { error: "Failed to fetch meal plan" });
  }
};


// Get all meal plans for a user
// Get all meal plans for a user
export const getAllMealPlans = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId") || "defaultUser";

    console.log("Fetching meal plans for user:", userId);

    const plans = await MealPlan.find({ userId }).sort({ createdAt: -1 });

    // Format plans to include title and date
    const formattedPlans = plans.map(plan => ({
      ...plan.toObject(),
      title: plan.goal ? `Meal Plan - ${plan.goal}` : "Meal Plan",
      date: plan.createdAt ? plan.createdAt.toLocaleDateString() : "",
    }));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(formattedPlans));
  } catch (error) {
    console.error("❌ getAllMealPlans error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to fetch meal plans" }));
  }
};



// Get meal plan by ID
// Example for getMealPlanById
export const getMealPlanById = async (req, res) => {
  try {
    const id = req.url.split("/").pop();
    const plan = await MealPlan.findById(id);

    if (!plan) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Meal plan not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(plan));
  } catch (error) {
    console.error("❌ getMealPlanById error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to fetch meal plan" }));
  }
};



// Delete meal plan by ID
export const deleteMealPlan = async (req, res) => {
  try {
    const id = req.url.split("/").pop(); // get ID from URL

    const deleted = await MealPlan.findByIdAndDelete(id);

    if (!deleted) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Meal plan not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Meal plan deleted successfully" }));

  } catch (error) {
    console.error("❌ deleteMealPlan error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to delete meal plan" }));
  }
};



