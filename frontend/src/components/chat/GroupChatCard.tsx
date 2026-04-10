import { useAuthStore } from '@/stores/useAuthStore';
import { useChatStore } from '@/stores/useChatStore';
import type { Conversation } from '@/types/chat'
import React from 'react'
import ChatCard from './ChatCard';
import UnreadCountBadge from './UnreadCountBadge';
import GroupChatAvatar from './GroupChatAvatar';

const GroupChatCard = ({ convo }: { convo: Conversation }) => {
  const {user} = useAuthStore();
  const {activeConversationId, setActiveConversationId, messages} = useChatStore();

  if (!user) return; // nếu chưa có user thì không render gì cả

  const unreadCount = convo.unreadCounts[user._id]; // lấy số lượng tin nhắn chưa đọc của user trong cuộc trò chuyện này, nếu không có thì mặc định là 0
  const name = convo.group.name ?? ""; // lấy tên cuộc trò chuyện, nếu không có thì mặc định là ""
  const handleSelectConversation = async (id: string) => {
    setActiveConversationId(id); // cập nhật activeConversationId trong store khi người dùng chọn một cuộc trò chuyện
    if (!messages[id]) {
      // todo: fetch messages của cuộc trò chuyện này nếu chưa có trong store để hiển thị khi người dùng chọn cuộc trò chuyện đó

    }
  }

  return (
    <ChatCard 
    
    convoId={convo._id} //id của cuộc trò chuyện này để truyền vào ChatCard
    name = {name} //tên cuộc trò chuyện để hiển thị trong ChatCard
    timestamp={
      convo.lastMessage?.createdAt ? new Date(convo.lastMessage.createdAt) : undefined
    }
    isActive={activeConversationId === convo._id} //kiểm tra xem cuộc trò chuyện này có phải là cuộc trò chuyện đang hoạt động hay không để truyền vào ChatCard
    onSelect={handleSelectConversation}
    unreadCount={unreadCount}
    leftSection={
      <>
      {
        unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />
      }
        <GroupChatAvatar 
        paticipants={convo.participants}
        type='chat'
        />
      </>
    }
    subtitle={
      <p className='text-sm truncate text-muted-foreground'>{convo.participants.length} thanh vien</p>
    }

    />
  )
}

export default GroupChatCard
