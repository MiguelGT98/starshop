import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="bg-white px-48 py-8 text-gray-700">
      <h2 className="text-6xl font-bold w-3/4 leading-tight text-gray-900 mb-4">
        Page not found
      </h2>
      <p>
        Go back{" "}
        <Link to="/" className="text-blue-500 font-bold">
          home
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
