import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="grid place-items-center h-screen text-white shadow-lg dark:bg-violet-400">
      <div className="text-4xl">
        404 Page Not Found
        <div className="text-violet-200 p-0.5 bg-violet-600 rounded-lg m-3 shadow-2xl-green">
          <Link to="/">Go Back To Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
