import express from "express"; //to use its routing and middleware feautures.
import { createMealPlan, getLatestMealPlan, getAllMealPlans, deleteMealPlan, getMealPlanById } from "../controllers/mealPlanController.js";

const router = express.Router();

router.post("/", createMealPlan); //If server.js sends a POST request to my door (/), then I'll run the createMealPlan function from mealPlanController.js.
router.get("/latest", getLatestMealPlan);
router.get("/latest/:userId", getLatestMealPlan);
router.get("/all", getAllMealPlans);
router.get("/:id", getMealPlanById);
router.delete("/:id", deleteMealPlan);

export default router;