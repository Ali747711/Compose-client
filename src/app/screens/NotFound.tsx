import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-bold text-main mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-main hover:bg-main-dull text-main-text font-semibold px-6 py-3 rounded-lg transition-all"
        >
          <HugeiconsIcon icon={Home01Icon} size={20} />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
