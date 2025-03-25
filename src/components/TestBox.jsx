import React from "react";

const TestBox = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-10 left-0 w-40 h-40 bg-red-500 z-[9999]">
      Test Box is Open
    </div>
  );
};

export default TestBox;
