import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="grid place-items-center h-screen text-white text-4xl ">
      <div>
        404 Page Not Found
        <strong className="text-violet-200 p-2 bg-violet-600 rounded-lg m-3">
          <Link to="/">Go Back To Home</Link>
        </strong>
      </div>
    </div>
  );
};

export default PageNotFound;
