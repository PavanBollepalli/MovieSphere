import React from "react";

const ChatIcon = ({ onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 focus:outline-none"
      aria-label="Chat support"
      type="button"
    >
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
    </button>
  );
};

export default ChatIcon;
