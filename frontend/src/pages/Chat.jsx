import { useState } from "react";
import { chatService } from "../services/chatService";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await chatService.sendMessage(message);

      const aiMessage = {
        sender: "ai",
        text: response.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    }

    setMessage("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        NutriNav AI Assistant
      </h1>

      <div className="border rounded p-4 h-[500px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-3">
            <strong>
              {msg.sender === "user" ? "You" : "NutriNav"}
            </strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          className="border p-2 flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask nutrition questions..."
        />

        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;