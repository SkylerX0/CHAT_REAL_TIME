import type { ChatState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware"; //lưu dữ liệu chat vào localStorage để giữ lại khi người dùng làm mới trang hoặc đóng trình duyệt

export const useChatStore = create<ChatState>()(
    persist((set, get) => ({
        conversations: [],
        messages: {},
        activeConversationId: null,
        loading: false,

        setActiveConversationId: (id) => set({activeConversationId: id}),
        reset: () => set({conversations: [], messages: {}, activeConversationId: null, loading: false})
    }), {
        name: "chat-storage", // tên của storage để lưu trữ trạng thái chat vào localStorage hoặc sessionStorage
        partialize: (state) =>({conversations: state.conversations}) // chỉ lưu trữ thông tin conversations  vào storage, không lưu activeConversationId và loading để tránh lỗi khi khôi phục trạng thái từ storage
    }
    )
)
