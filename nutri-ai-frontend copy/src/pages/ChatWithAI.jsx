import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/page.css";

function ChatWithAI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const userId = "defaultUser";

  // 1️⃣ Load chat history when page opens
  useEffect(() => {
    axios
      .get(`/api/chat/history?userId=${userId}`)
      .then(res => {
        const formatted = [];

        res.data.forEach(chat => {
          formatted.push({ sender: "user", text: chat.userMessage });
          formatted.push({ sender: "ai", text: chat.aiReply });
        });

        setMessages(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  // 2️⃣ Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    // show user message instantly
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post("/api/chat/message", {
        message: input,
        userId
      });

      setMessages([
        ...newMessages,
        { sender: "ai", text: res.data.reply }
      ]);

      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ marginTop: "120px", textAlign: "center", padding: "0 20px" }}>
        <h1>Chat With AI</h1>
        <p>Create your personalized meal plan based on your goals and preferences</p>
      </div>

      <div className="chat-body">
        <div className="ai-chat-container">
          <h2>Nutrition AI Assistant</h2>
          <hr />

          <div className="chatBody">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "ai" ? "my-ai-chat" : "user-chat"}
              >
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          <hr />

          <div className="chat-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything about nutrition"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ChatWithAI;
