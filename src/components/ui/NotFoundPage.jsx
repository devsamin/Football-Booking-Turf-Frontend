import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <AlertTriangle className="text-red-500" size={70} />
        </div>

        {/* 404 Title */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved. Please
          check the URL or return to the homepage.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <Home size={18} />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
