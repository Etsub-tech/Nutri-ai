
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { handleChatRoutes } from "./routes/chatRoutes.js";
import { handleMealPlanRoutes } from "./routes/mealPlanRoutes.js";

dotenv.config();
connectDB();

const server = http.createServer(async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url.startsWith("/api/chat")) {
    return handleChatRoutes(req, res);
  }

  if (req.url.startsWith("/api/meal-plan")) {
    return handleMealPlanRoutes(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Native Node server running on port ${PORT}`)
);
