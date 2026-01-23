import { apiClient } from "../../libs/api/axios.config";
import { serverURL } from "../../libs/configs";
import { Conversation, Message } from "../../libs/data/types/message";

class MessageService {
  private readonly path: string;

  constructor() {
    this.path = serverURL;
  }

  public getConversation = async (): Promise<Conversation> => {
    const url = `${this.path}/message/conversation`;
    const result = await apiClient.get(url);
    return result.data;
  };

  public getMessages = async (
    conversationId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<{ data: Message[]; total: number }> => {
    const url = `${this.path}/message/messages?conversationId=${conversationId}&page=${page}&limit=${limit}`;
    const result = await apiClient.get(url);
    return result.data;
  };

  public getUnreadCount = async (): Promise<number> => {
    const url = `${this.path}/message/unread-count`;
    const result = await apiClient.get(url);
    return result.data.count;
  };
}

export default MessageService;
