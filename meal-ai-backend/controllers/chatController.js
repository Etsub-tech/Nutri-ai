import { chatWithAI } from "../services/aiService.js";
import ChatMessage from "../models/ChatMessage.js";

export const sendMessage = async(req, res) => {
    try{
        const{message, userId} = req.body;
        if(!message){
            return res.status(400).json({error: "Message is required"});
        }

        const aiReply = await chatWithAI(message);

        const chat = new ChatMessage({
            userId: userId||"defaultUser",
            userMessage: message,
            aiReply,
        });

        await chat.save();

        res.status(200).json({
      reply: aiReply,
      savedChat: chat,
    });
    } catch (error) {
        console.error("Error sending chat message:", error.message);
        res.status(500).json({ error: "Chat failed" });
    }
    };

    //get chathistory
    export const getChatHistory = async(req, res)=>{
        try{
            const userId = req.query.userId || "defaultUser";
            const history = await ChatMessage.find({userId})
            .sort({createdAt: -1})
            .limit(10);

            res.status(200).json(history);
        }
        catch(error){
            console.error("Error fetching chat history:", error.message);
            res.status(500).json({error: "Failed to get chat history"});
        }
    };