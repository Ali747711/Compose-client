import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import ChatBox from "../../components/chat/ChatBox";

const HelpCenter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 min-h-screen bg-white lg:bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 z-10">
        <button onClick={() => navigate("/user")} className="p-1">
          <HugeiconsIcon icon={Cancel01Icon} size={24} />
        </button>
        <h1 className="text-xl font-bold text-main-text">Help Center</h1>
      </div>

      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-main-text mb-2">
            Help Center
          </h1>
          <p className="text-gray-500 text-sm mb-3">
            Have questions? Chat with our support team.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
        </div>

        {/* Mobile Description */}
        <p className="lg:hidden text-gray-600 mb-6">
          Have questions? Chat with our support team.
        </p>

        <ChatBox />

        {/* Quick Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-white lg:bg-gray-50 rounded-xl border border-gray-200 lg:border-0">
            <h4 className="font-semibold text-main-text mb-2">Track Order</h4>
            <p className="text-sm text-gray-600">
              Check your order status and delivery
            </p>
          </div>
          <div className="p-4 bg-white lg:bg-gray-50 rounded-xl border border-gray-200 lg:border-0">
            <h4 className="font-semibold text-main-text mb-2">FAQs</h4>
            <p className="text-sm text-gray-600">
              Find answers to common questions
            </p>
          </div>
          <div className="p-4 bg-white lg:bg-gray-50 rounded-xl border border-gray-200 lg:border-0">
            <h4 className="font-semibold text-main-text mb-2">Contact Us</h4>
            <p className="text-sm text-gray-600">
              Email: ali-support@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
