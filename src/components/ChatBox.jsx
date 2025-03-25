import React, { useState, useRef, useEffect } from "react";
import { getGeminiResponse } from "../utils/geminiAPI";

const ChatBox = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your movie assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retryMessage, setRetryMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async (text = inputText, isRetry = false) => {
    if ((!text.trim() || isLoading) && !isRetry) return;

    // If not a retry, add user message
    if (!isRetry) {
      const userMessage = { text, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
    }

    // Store message for potential retry
    if (!isRetry) {
      setRetryMessage(text);
    }

    // Show loading state
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await getGeminiResponse(text);

      // Add AI response
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
      setRetryMessage(null);
    } catch (error) {
      console.error("Error getting response:", error);

      // More specific error message based on error type
      let errorMessage =
        "Sorry, I encountered an error processing your request.";

      if (error.message?.includes("network") || error.code === "ECONNABORTED") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please try again in a moment.";
      }

      // Add error message to chat
      setMessages((prev) => [...prev, { text: errorMessage, isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle key press events
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden z-[9999]">
      <div className="bg-violet-600 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="text-base font-medium m-0">Movie Chat Assistant</h3>
        <button
          className="bg-transparent border-none text-white text-xl cursor-pointer hover:text-gray-200"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] break-words ${
              msg.isUser
                ? "bg-violet-600 text-white self-end"
                : "bg-gray-100 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="p-2 rounded-lg max-w-[80%] break-words bg-gray-100 text-gray-800 self-start flex items-center">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-3 border-t border-gray-200">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about movies..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none max-h-20"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className={`ml-2 bg-violet-600 text-white border-none rounded-full px-4 py-2 cursor-pointer ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-violet-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
