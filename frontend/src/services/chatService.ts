import api from "@/lib/axios";
import type { ConversationResponse, Message } from "@/types/chat";

//hàm FetchMessageProps chịu trách nhiệm gọi api để lấy tin nhắn 
interface FetchMessageProps {
  messages: Message[];// type của messages là một mảng chứa các đối tượng có kiểu Message
  cursor?: string;  // cursor là một chuỗi tùy chọn, có thể được sử dụng để phân trang hoặc lấy thêm dữ liệu nếu cần
}

const pageLimit =50;// biến pageLimit được đặt thành 50, có thể được sử dụng để giới hạn số lượng tin nhắn được lấy mỗi lần gọi API

export const chatService = {
    async fetchConversations(): Promise<ConversationResponse> {
        const res = await api.get('/conversations');
        return res.data;
    },
    // hàm fetchMessages chịu trách nhiệm gọi api để lấy tin nhắn của một cuộc trò chuyện cụ thể dựa trên conversationId và cursor (nếu có)
  async fetchMessages(id: string, cursor?: string): Promise<FetchMessageProps> {
    const res = await api.get(
      `/conversations/${id}/messages?limit=${pageLimit}&cursor=${cursor}`
    );

    return { messages: res.data.messages, cursor: res.data.nextCursor };
  },
};






