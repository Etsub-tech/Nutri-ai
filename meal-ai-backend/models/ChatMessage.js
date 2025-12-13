import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
        default: "defaultUser",
    },
    userMessage:{
        type: String,
        required: true,
    },
    aiReply: {
        type: String,
        required: true,
    },
    },
   {
    timestamps: true,

   });

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
export default ChatMessage;