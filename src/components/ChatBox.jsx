import React, { useState, useRef, useEffect } from "react";

const ChatBox = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you find movies today?", isUser: false },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputText, isUser: true }];
    setMessages(newMessages);
    setInputText("");

    // Simulate bot response (replace with actual API call if needed)
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          text: `Thanks for your message! I can help you find movies like "${inputText}".`,
          isUser: false,
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add a debugging effect
  useEffect(() => {
    console.log("ChatBox isOpen:", isOpen);
  }, [isOpen]);

  // Add more explicit debugging
  useEffect(() => {
    console.log("ChatBox isOpen state changed to:", isOpen);
  }, [isOpen]);

  // Make this very explicit
  if (!isOpen) {
    console.log("ChatBox not rendering - isOpen is false");
    return null;
  }

  console.log("ChatBox rendering - isOpen is true");

  return (
    <div
      className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden z-[9999]"
      style={{ display: isOpen ? "flex" : "none" }} // Explicitly force display with inline style
    >
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
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-3 border-t border-gray-200">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-violet-600 text-white border-none rounded-full px-4 py-2 cursor-pointer hover:bg-violet-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
