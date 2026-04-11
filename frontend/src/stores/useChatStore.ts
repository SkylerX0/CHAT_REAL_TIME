import { chatService } from "@/services/chatService";
import type { ChatState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware"; //lưu dữ liệu chat vào localStorage để giữ lại khi người dùng làm mới trang hoặc đóng trình duyệt
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatState>()(
    persist((set, get) => ({
        conversations: [],
        messages: {},
        activeConversationId: null,
        convoLoading: false, //convo loading
        messageLoading: false, // tin nhắn loading

        setActiveConversationId: (id) => set({ activeConversationId: id }),
        reset: () => {
            set({ conversations: [], messages: {}, activeConversationId: null, convoLoading: false, messageLoading: false });
        },
        fetchConversations: async () => {
            try {
                set({ convoLoading: true });
                // gọi API để lấy danh sách cuộc trò chuyện và cập nhật trạng thái conversations trong store
                // giả sử có một hàm fetchConversationsFromAPI() trả về danh sách cuộc trò chuyện
                const { conversations } = await chatService.fetchConversations();
                set({ conversations, convoLoading: false });
            } catch (error) {
                console.error("Lỗi xảy ra khi fetch conversations:", error);
                set({ convoLoading: false });
            }
        },
        fetchMessages: async (conversationId) => {
            const { activeConversationId, messages } = get();
            const { user } = useAuthStore.getState();

            const convoId = conversationId ?? activeConversationId; // nếu conversationId được cung cấp thì sử dụng nó, ngược lại sử dụng activeConversationId từ trạng thái của store

            if (!convoId) return; // nếu không có conversationId nào được cung cấp và activeConversationId cũng null thì không làm gì cả

            const current = messages?.[convoId]; // lấy thông tin tin nhắn hiện tại của cuộc trò chuyện này từ trạng thái messages trong store, nếu không có thì mặc định là undefined
            const nextCursor = current?.nextCursor === undefined ? "" : current?.nextCursor; // nếu current tồn tại và có nextCursor thì sử dụng nó, nếu current tồn tại nhưng không có nextCursor thì sử dụng chuỗi rỗng (để gọi API lần đầu tiên), nếu current không tồn tại thì nextCursor sẽ là undefined

            if (nextCursor === null) return;// nếu nextCursor là null nghĩa là đã hết tin nhắn để tải thêm rồi thì không làm gì cả

            set({ messageLoading: true });

            try {
                const { messages: fetched, cursor } = await chatService.fetchMessages(convoId, nextCursor);
                const processed = fetched.map((m) => ({
                    ...m,
                    isOwn: m.senderId === user?._id,
                }));

                // sau khi nhận được tin nhắn mới từ API, chúng ta sẽ gộp chúng với tin nhắn hiện tại của cuộc trò chuyện này trong trạng thái messages của store. Nếu đã có tin nhắn nào trước đó thì sẽ gộp vào trước (để giữ thứ tự thời gian), nếu chưa có tin nhắn nào thì chỉ cần sử dụng tin nhắn mới nhận được. Sau đó cập nhật lại trạng thái messages trong store với cuộc trò chuyện này đã được gộp tin nhắn mới và cập nhật nextCursor mới nhận được từ API để phục vụ cho việc tải thêm tin nhắn sau này.
                set((state) => {
                    const prev = state.messages[convoId]?.items ?? [];
                    const merged = prev.length > 0 ? [...processed, ...prev] : processed;

                    return {
                        messages: {
                            ...state.messages,
                            [convoId]: {
                                items: merged,
                                hasMore: !!cursor, //để bt còn load đc nx hay ko
                                nextCursor: cursor ?? null, // nếu cursor nhận được từ API là undefined thì đặt nextCursor thành null để đánh dấu đã hết tin nhắn để tải thêm, nếu cursor có giá trị thì cập nhật nextCursor với giá trị đó để phục vụ cho việc tải thêm tin nhắn sau này
                            },
                        },
                    };
                })

            } catch (error) {
                console.error("Lôi xảy ra khi fetch messages:", error);
            } finally{
                set({ messageLoading: false });
            }



        }
    }), {
        name: "chat-storage", // tên của storage để lưu trữ trạng thái chat vào localStorage hoặc sessionStorage
        partialize: (state) => ({ conversations: state.conversations }) // chỉ lưu trữ thông tin conversations  vào storage, không lưu activeConversationId và loading để tránh lỗi khi khôi phục trạng thái từ storage
    }
    )
)
