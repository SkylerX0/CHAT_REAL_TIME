import { useChatStore } from '@/stores/useChatStore';
import React from 'react'
import ChatWelcomeScreen from './ChatWelcomeScreen';
import ChatWelcomeSkeleton from './ChatWelcomeSkeleton';
import { SidebarInset } from '../ui/sidebar';
import ChatWindowHeader from './ChatWindowHeader';
import ChatWindowBody from './ChatWindowBody';
import MessageInput from './MessageInput';

const ChatWindowlayout = () => {

  const {
    activeConversationId,
    conversations,
    messageLoading: loading,
    messages,
  } = useChatStore();

    const selectedConvo = conversations.find((c) => c._id === activeConversationId) ?? null;
   
    if(!selectedConvo) {
      return <ChatWelcomeScreen />
    }
    
    if(loading){
      return <ChatWelcomeSkeleton/>
    }



  return (
    <SidebarInset className='flex flex-col h-full flex-1 overflow-hidden rounded-sm shadow-md'>

      {/* header */}
      <ChatWindowHeader/>

      {/* body */}
      <div className='flex-1 overflow-y-auto bg-primary-foreground'>
        <ChatWindowBody />
      </div>

      {/* footer */}
      <MessageInput />

    </SidebarInset>
  )
}

export default ChatWindowlayout
