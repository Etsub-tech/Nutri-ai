<<<<<<< HEAD
import http from "http";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { handleChatRoutes } from "./routes/chatRoutes.js";
import { handleMealPlanRoutes } from "./routes/mealPlanRoutes.js";

dotenv.config(); //activaes .env file loading so i can use variables like port and secret mongodb password.
connectDb();

const server = http.createServer(async (req, res) => {    //- http.createServer = building the reception desk  - (req, res) = the receptionist who greets every visitor.  - req = the visitor’s request form (what they want).   - res = the receptionist’s reply form (what you give back).

 //manual CORs(cross origin resource sharing) settup
  res.setHeader("Access-Control-Allow-Origin", "*");  //Allows any origin to access this server's resources.
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");  //telling the browser "i allowed clients to send me requests that include content-Type header"
  
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
 
  //routing
=======

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

>>>>>>> 07d78ea4464db1b0ee7ddf606fd20389b9c2f4aa
  if (req.url.startsWith("/api/chat")) {
    return handleChatRoutes(req, res);
  }

  if (req.url.startsWith("/api/meal-plan")) {
    return handleMealPlanRoutes(req, res);
  }

<<<<<<< HEAD
  //Default Route
=======
>>>>>>> 07d78ea4464db1b0ee7ddf606fd20389b9c2f4aa
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Native Node server running on port ${PORT}`)
);
<<<<<<< HEAD

=======
>>>>>>> 07d78ea4464db1b0ee7ddf606fd20389b9c2f4aa
