export enum ConversationStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export enum MessageSenderType {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum MessageStatus {
  SENT = "SENT",
  READ = "READ",
}

export interface Conversation {
  _id: string;
  userId: string;
  adminId?: string;
  status: ConversationStatus;
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: {
    user: number;
    admin: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  senderType: MessageSenderType;
  content: string;
  status: MessageStatus;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  sender?: {
    _id: string;
    userNick: string;
    userImage?: string;
  };
}
