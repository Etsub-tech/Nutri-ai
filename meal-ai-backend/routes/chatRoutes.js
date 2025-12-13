import express from "express";
import { sendMessage, getChatHistory } from "../controllers/chatController.js";

const router = express.Router();

router.post("/message", sendMessage);
router.get("/history", getChatHistory);
export default router;
