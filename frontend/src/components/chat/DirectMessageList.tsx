import React from 'react'
import { useChatStore } from '@/stores/useChatStore';
import DirectMessageCard from './DirectMessageCard';

const DirectMessageList = () => {
  const { conversations } = useChatStore();

  if (!conversations) return; // nếu chưa có conversations thì không render gì cả
  
  const directConversations = conversations.filter((convo) => convo.type === 'direct'); // lọc ra các cuộc trò chuyện có type là 'direct'

  return (
    <div className='flex-1 overflow-y-auto p-2 space-y-2'>
      {
        directConversations.map((convo) => (
          <DirectMessageCard 
            convo = {convo}
            key={convo._id}
          />
        ) )
      }
    </div>
  )
}

export default DirectMessageList
