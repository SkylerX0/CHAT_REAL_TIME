import React from 'react'
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import ChatWindowlayout from '@/components/chat/ChatWindowlayout';


const ChatAppPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='flex h-screen w-full p-2'>
        <ChatWindowlayout />
      </div>
    </SidebarProvider>
  )
};

export default ChatAppPage
