import { register, login } from "./authController.js";
import { parseBody } from "../utils/parseBody.js";

export const handleAuthRoutes = async (req, res) => {
  if (req.method === "POST" && req.url === "/api/auth/register") {
    const body = await parseBody(req);
    await register(req, res, body);
    return true; // ✅ REQUIRED
  }

  if (req.method === "POST" && req.url === "/api/auth/login") {
    const body = await parseBody(req);
    await login(req, res, body);
    return true; // ✅ REQUIRED
  }

  return false;
};
