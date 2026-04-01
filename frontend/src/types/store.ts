// dùng để mô tả cấu trúc dữ liệu trong store xác thực
import type { Conversation, Message } from './chat';
import type { User } from './user';

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    signUp: (username: string, password: string, email: string, firstName: string, lastName: string) => Promise<void>;

    signIn: (username: string, password: string) => Promise<void>;

    signOut: () => Promise<void>;

    clearState: () => void;

    fetchMe: () => Promise<void>;

    refresh: () => Promise<void>;

    setAccessToken: (accessToken: string) => void;
}

export interface ThemeState {
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (Dark: boolean) => void;
}

export interface ChatState {
    conversations: Conversation[];
    messages: Record<string,{ 
        items: Message[];
        hasMore: boolean; //infinite scroll: còn tin nhắn nào để tải thêm hay không
        nextCursor?: string | null; //để lưu trữ con trỏ cho việc phân trang khi tải thêm tin nhắn nói chung là để phân trang
    }>;
    activeConversationId: string | null; // để lưu trữ ID của cuộc trò chuyện đang hoạt động, giúp xác định cuộc trò chuyện nào đang được hiển thị và tương tác
    loading: boolean; // đẻ theo dõi trạng thái request đã hoàn thành hay chưa
    reset: () => void; // để reset lại trạng thái của store về giá trị mặc định, thường được sử dụng khi người dùng đăng xuất để xóa sạch dữ liệu liên quan đến cuộc trò chuyện và tin nhắn khỏi store.

    setActiveConversationId: (conversationId: string | null) => void; // để cập nhật ID của cuộc trò chuyện đang hoạt động khi người dùng chọn một cuộc trò chuyện khác hoặc khi họ đăng xuất (đặt về null)
}