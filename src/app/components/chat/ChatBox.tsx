import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../hooks/useSocket";
import MessageService from "../../services/message.service";
import { Message, MessageSenderType } from "../../../libs/data/types/message";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sent02Icon, Loading03Icon } from "@hugeicons/core-free-icons";

const ChatBox = () => {
  const { socket, connected } = useSocket();
  const messageService = new MessageService();

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize conversation
  useEffect(() => {
    const initChat = async () => {
      try {
        setLoading(true);
        const conversation = await messageService.getConversation();
        setConversationId(conversation._id);

        const messagesData = await messageService.getMessages(conversation._id);
        setMessages(messagesData.data);
      } catch (error) {
        console.error("Failed to load conversation:", error);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, []);

  // Join conversation room when socket connects
  useEffect(() => {
    if (socket && connected && conversationId) {
      socket.emit("user:join");

      // Listen for new messages
      socket.on("message:new", (message: Message) => {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();

        // Mark as read if from admin
        if (message.senderType === MessageSenderType.ADMIN) {
          socket.emit("mark_read", {
            conversationId,
            userType: MessageSenderType.USER,
          });
        }
      });

      // Listen for typing indicators
      socket.on("typing:start", () => {
        setIsTyping(true);
      });

      socket.on("typing:stop", () => {
        setIsTyping(false);
      });

      return () => {
        socket.off("message:new");
        socket.off("typing:start");
        socket.off("typing:stop");
      };
    }
  }, [socket, connected, conversationId]);

  // Scroll when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle send message
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socket || !connected) return;

    setSending(true);
    socket.emit("user:send_message", { content: inputMessage });
    setInputMessage("");
    setSending(false);

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket.emit("typing:stop", { conversationId });
  };

  // Handle typing
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);

    if (!socket || !conversationId) return;

    // Send typing start
    socket.emit("typing:start", { conversationId });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Send typing stop after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing:stop", { conversationId });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <HugeiconsIcon
          icon={Loading03Icon}
          className="w-8 h-8 text-main animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-main-text">Chat with Support</h3>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                connected ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <span className="text-sm text-gray-500">
              {connected ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isUser = message.senderType === MessageSenderType.USER;
            return (
              <div
                key={message._id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                    isUser
                      ? "bg-main text-main-text"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            disabled={!connected || sending}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-main"
          />
          <button
            onClick={handleSendMessage}
            disabled={!connected || !inputMessage.trim() || sending}
            className="px-6 py-3 bg-main text-main-text rounded-xl hover:bg-main-dull disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <HugeiconsIcon icon={Sent02Icon} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
