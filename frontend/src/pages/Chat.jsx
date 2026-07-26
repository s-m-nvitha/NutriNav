import { useState, useEffect, useRef } from "react";
import { chatService } from "../services/chatService";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);



  useEffect(() => {
    const fetchHistory = async () => {
  setLoading(true);

  try {
    const history = await chatService.getHistory();

    const formattedMessages = [];

    history.forEach((chat) => {
      formattedMessages.push({
        sender: "user",
        text: chat.message,
      });

      formattedMessages.push({
        sender: "ai",
        text: chat.response,
      });
    });

    setMessages(formattedMessages);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

    fetchHistory();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);
      const response = await chatService.sendMessage(message);

      const aiMessage = {
        sender: "ai",
        text: response.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    setMessage("");
  };

  const sendSuggestedQuestion = async (question) => {
  try {
    setLoading(true);

    const response =
      await chatService.sendMessage(question);

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "ai", text: response.response }
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        NutriNav AI Assistant
      </h1>

      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-xl mb-4">
  <h2 className="font-bold text-lg">
    Your Personal Nutrition Assistant
  </h2>

  <p className="text-sm opacity-90">
    Ask about deficiencies, symptoms, foods,
    meal plans, supplements and nutrition.
  </p>
</div>

      <div className="flex flex-wrap gap-2 mb-4">
  {[
    "Why am I tired?",
    "Explain my deficiencies",
    "What foods should I eat?",
    "Create a meal plan",
  ].map((question) => (
    <button
  key={question}
  onClick={() => sendSuggestedQuestion(question)}
  className="bg-blue-50 text-blue-700 px-3 py-2 rounded-xl hover:bg-blue-100"
>
  {question}
</button>
  ))}
</div>

      <div className="border rounded-xl p-4 h-[500px] overflow-y-auto bg-white shadow-sm">
        {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex mb-4 ${
      msg.sender === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >
    <div
      className={`max-w-[75%] p-4 rounded-2xl shadow ${
        msg.sender === "user"
          ? "bg-green-500 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <p className="font-semibold mb-1">
        {msg.sender === "user"
          ? "You"
          : "NutriNav"}
      </p>

      <ReactMarkdown>
        {msg.text}
      </ReactMarkdown>
    </div>
  </div>
))}

        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 p-4 rounded-2xl">
              <p className="font-semibold">
                NutriNav
              </p>

              <p>🧠 Analyzing your health profile...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          className="border rounded-xl p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask nutrition questions..."
        />

        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4"
        >
          Send
        </button>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/meal-planner")}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl"
        >
          Generate Meal Plan
        </button>
      </div>
    </div>
  );
}

export default Chat;