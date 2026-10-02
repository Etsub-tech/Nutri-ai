import {
  createMealPlan,
  getAllMealPlans,
  getMealPlanById,
} from "../controllers/mealPlanController.js";
import { parseBody } from "../utils/parseBody.js";



export const handleMealPlanRoutes = async (req, res) => {
  try {
    // CREATE meal plan
    if (req.method === "POST" && req.url.startsWith("/api/meal-plan/create")) {
      console.log("POST /api/meal-plan/create detected");
      const body = await parseBody(req);
      await createMealPlan(req, res, body);
      return true;
    }

    // GET all meal plans
    if (req.method === "GET" && req.url.startsWith("/api/meal-plan/all")) {
      console.log("GET /api/meal-plan/all detected");
      await getAllMealPlans(req, res);
      return true;
    }

    // GET meal plan by ID
    if (req.method === "GET" && req.url.startsWith("/api/meal-plan/")) {
      const id = req.url.split("/").pop();
      await getMealPlanById(req, res, id);
      return true;
    }

    // DELETE meal plan by ID
if (req.method === "DELETE" && req.url.startsWith("/api/meal-plan/")) {
  const id = req.url.split("/").pop();
  await deleteMealPlan(req, res,id);
  return true;
}



    return false;
  } catch (error) {
    console.error("MealPlan route error:", error.message);
    if (!res.writableEnded) {
      res.writeHead(500);
      res.end("Meal plan route failed");
    }
    return true;
  }
};
