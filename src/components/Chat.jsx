import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! Welcome to MovieFinder. How can I help you today?",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample responses for demo purposes
  const botResponses = {
    hello: "Hey there! How can I help you find a movie today?",
    hi: "Hello! Looking for a movie recommendation?",
    recommend:
      "I'd recommend checking out the trending section for popular movies right now!",
    popular:
      "Our trending section shows the most popular movies right now. You can check it out!",
    help: "I can help you find movies, learn about actors, or discover new releases. What are you interested in?",
    genres:
      "We have movies across all genres - action, comedy, drama, horror, sci-fi, and more. Any specific genre you're interested in?",
    thanks: "You're welcome! Enjoy your movie watching experience!",
    "thank you": "You're welcome! Enjoy your movie watching experience!",
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botReply = generateResponse(inputValue);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: botReply, isBot: true },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userInput) => {
    const lowercaseInput = userInput.toLowerCase();

    // Check for movie search queries
    if (
      lowercaseInput.includes("movie") &&
      (lowercaseInput.includes("find") || lowercaseInput.includes("search"))
    ) {
      return "You can use the search bar at the top of the page to look for specific movies!";
    }

    // Check for keywords in our predefined responses
    for (const keyword in botResponses) {
      if (lowercaseInput.includes(keyword)) {
        return botResponses[keyword];
      }
    }

    // Default response
    return "I'm not sure how to help with that, but you can try searching for a movie using the search bar!";
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="bg-violet-600 hover:bg-violet-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 focus:outline-none"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-gray-900 rounded-lg shadow-2xl border border-violet-800/30 flex flex-col animate-slideUp">
          {/* Chat header */}
          <div className="bg-violet-800 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-bold">MovieFinder Assistant</h3>
            <button
              onClick={toggleChat}
              className="text-white/70 hover:text-white"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 max-w-[80%] ${message.isBot ? "ml-0" : "ml-auto"}`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.isBot
                      ? "bg-gray-800 text-white"
                      : "bg-violet-600 text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-3 max-w-[80%] ml-0">
                <div className="p-3 rounded-lg bg-gray-800 text-white">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-gray-800 bg-gray-900 rounded-b-lg"
          >
            <div className="flex">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white rounded-r-md px-4 transition-colors"
                disabled={inputValue.trim() === ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
