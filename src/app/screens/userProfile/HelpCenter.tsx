import ChatBox from "../../components/chat/ChatBox";

const HelpCenter = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-main-text mb-2">Help Center</h2>
        <p className="text-gray-600">
          Have questions? Chat with our support team.
        </p>
      </div>

      <ChatBox />

      {/* Quick Help Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-main-text mb-2">Track Order</h4>
          <p className="text-sm text-gray-600">
            Check your order status and delivery
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-main-text mb-2">FAQs</h4>
          <p className="text-sm text-gray-600">
            Find answers to common questions
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-main-text mb-2">Contact Us</h4>
          <p className="text-sm text-gray-600">Email: support@compose.com</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
