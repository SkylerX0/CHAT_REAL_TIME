import React from 'react'
import { useChatStore } from '@/stores/useChatStore';
import GroupChatCard from './GroupChatCard';

const GroupChatList = () => {
    const { conversations } = useChatStore();

    if (!conversations) return; // nếu chưa có conversations thì không render gì cả
    const groupChats = conversations.filter((convo) => convo.type === 'group'); // lọc ra các cuộc trò chuyện có type là 'group'

  return (
    <div className='flex-1 overflow-y-auto p-2 space-y-2'>
      {
        groupChats.map((convo) => (
          <GroupChatCard
            convo = {convo}
            key={convo._id}
          />
        ) )
      }
    </div>
  )
}

export default GroupChatList
