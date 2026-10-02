import { chatWithAI } from "../services/aiService.js";
import ChatMessage from "../models/ChatMessage.js";
import { parseBody } from "../utils/parseBody.js";
import { sendResponse } from "../utils/sendResponse.js";

/**
 * POST /api/chat/message
 */
export const sendMessage = async (req, res) => {
  try {
    const body = await parseBody(req);
    const { message, userId } = body;

    if (!message) {
      return sendResponse(res, 400, { error: "Message is required" });
    }

    const aiReply = await chatWithAI(message);

    const chat = new ChatMessage({
      userId: userId || "defaultUser",
      userMessage: message,
      aiReply,
    });

    await chat.save();

    sendResponse(res, 200, {
      reply: aiReply,
      savedChat: chat,
    });
  } catch (error) {
    console.error("❌ Error sending chat message:", error.message);
    sendResponse(res, 500, {
      error: "Chat failed",
      details: error.message,
    });
  }
};

/**
 * GET /api/chat/history?userId=xxx
 */
export const getChatHistory = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId") || "defaultUser";

    const history = await ChatMessage.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    sendResponse(res, 200, history);
  } catch (error) {
    console.error("❌ Error fetching chat history:", error.message);
    sendResponse(res, 500, { error: "Failed to get chat history" });
  }
};

/**
 * Main chat router
 */
export const handleChatRoutes = async (req, res) => {
  if (req.method === "POST" && req.url === "/api/chat/message") {
    await sendMessage(req, res);
    return true;
  }

  if (req.method === "GET" && req.url.startsWith("/api/chat/history")) {
    await getChatHistory(req, res);
    return true;
  }

  return false;
};
