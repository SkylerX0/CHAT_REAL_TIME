import { chatService } from "@/services/chatService";
import type { ChatState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware"; //lưu dữ liệu chat vào localStorage để giữ lại khi người dùng làm mới trang hoặc đóng trình duyệt

export const useChatStore = create<ChatState>()(
    persist((set, get) => ({
        conversations: [],
        messages: {},
        activeConversationId: null,
        loading: false,

        setActiveConversationId: (id) => set({ activeConversationId: id }),
        reset: () => {
            set({ conversations: [], messages: {}, activeConversationId: null, loading: false });
        },
        fetchConversations: async () => {
            try {
                set({ loading: true });
                // gọi API để lấy danh sách cuộc trò chuyện và cập nhật trạng thái conversations trong store
                // giả sử có một hàm fetchConversationsFromAPI() trả về danh sách cuộc trò chuyện
                const { conversations } = await chatService.fetchConversations();
                set({ conversations, loading: false });
            } catch (error) {
                console.error("Lỗi xảy ra khi fetch conversations:", error);
                set({ loading: false });
            }
        }
    }), {
        name: "chat-storage", // tên của storage để lưu trữ trạng thái chat vào localStorage hoặc sessionStorage
        partialize: (state) => ({ conversations: state.conversations }) // chỉ lưu trữ thông tin conversations  vào storage, không lưu activeConversationId và loading để tránh lỗi khi khôi phục trạng thái từ storage
    }
    )
)
