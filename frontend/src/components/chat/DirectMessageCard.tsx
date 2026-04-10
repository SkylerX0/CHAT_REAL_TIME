import type { Conversation } from '@/types/chat'
import React from 'react'
import ChatCard from './ChatCard'
import { useChatStore } from '@/stores/useChatStore';
import { useAuthStore} from '@/stores/useAuthStore';
// import { id } from 'zod/v4/locales';
import { cn } from '@/lib/utils';
import UserAvata from './UserAvatar';
import Statusbadge from './Statusbadge';
import UnreadCountBadge from './UnreadCountBadge';

const DirectMessageCard = ({ convo }: { convo: Conversation }) => {
    const {user} = useAuthStore();
    const {activeConversationId, setActiveConversationId, messages} = useChatStore();

    if (!user) return; // nếu chưa có user thì không render gì cả

    const otherUser = convo.participants.find((p) => p._id != user._id); // tìm người tham gia khác trong cuộc trò chuyện direct
    if (!otherUser) return; // nếu không tìm thấy người tham gia khác thì không render gì cả

    const unreadCount = convo.unreadCounts[user._id]; // lấy số lượng tin nhắn chưa đọc của user trong cuộc trò chuyện này, nếu không có thì mặc định là 0
    const lastMessage = convo.lastMessage?.content ?? ""; // lấy nội dung tin nhắn cuối cùng trong cuộc trò chuyện này, nếu không có thì mặc định là chuỗi rỗng
console.log("Dữ liệu convo:", convo)
    const handleSelectConversation = async (id: string) => {
        setActiveConversationId(id); // cập nhật activeConversationId trong store khi người dùng chọn một cuộc trò chuyện
        if (!messages[id]) {
            //todo: fetch messages của cuộc trò chuyện này nếu chưa có trong store để hiển thị khi người dùng chọn cuộc trò chuyện đó

        }
    }

    return (
        <ChatCard 
        convoId= {convo._id}
        name = {otherUser.displayName ?? ""}
        timestamp={
            convo.lastMessage?.createdAt ? new Date(convo.lastMessage.createdAt) : undefined
        }
        isActive={activeConversationId === convo._id}
        onSelect={handleSelectConversation}
        unreadCount={unreadCount}
        leftSection={
            <>  
                <UserAvata type='sidebar' name={otherUser.displayName ?? ""}
                avatarUrl={otherUser.avatarUrl ?? undefined}
                />
                {/* todo: sẽ sử lý offline hay onl sau khi có socket.io */}
                <Statusbadge 
                status='offline'
                />
                {
                    unreadCount > 0 &&  <UnreadCountBadge unreadCount={unreadCount} />
                }
            </>
        }
        subtitle={
            <p className={cn("text-sm truncate", unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground")}>
                {lastMessage}
            </p>
        }
        
        />
    )
}

export default DirectMessageCard
