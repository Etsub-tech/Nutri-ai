// app.js
import http from "http";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import { setCorsHeaders } from "./src/utils/cors.js";

import { handleAuthRoutes } from "./src/auth/authRoutes.js";
import { handleChatRoutes } from "./src/routes/chatRoutes.js";
import { handleMealPlanRoutes } from "./src/routes/mealPlanRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  setCorsHeaders(res);

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Route handlers
  if (await handleAuthRoutes(req, res)) return;
  if (await handleChatRoutes(req, res)) return;
  if (await handleMealPlanRoutes(req, res)) return;

  // Fallback for unknown routes
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
