import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3003";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "null" || token === "undefined") {
      console.log("No valid token, skipping socket connection");
      return;
    }

    const socketInstance = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setConnected(false);
    });

    socketInstance.on("error", (error: unknown) => {
      console.error("Socket error:", error);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, connected };
};
