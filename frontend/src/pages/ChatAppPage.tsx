import React from 'react'
import { Logout } from '@/components/auth/logout'
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { toast } from 'sonner';


const ChatAppPage = () => {
  const user = useAuthStore((s) => s.user); // Lấy thông tin user từ store, (s) => s.user là một selector để chỉ lấy đúng thuộc tính user

  const handleOnClick = async () => {
    try {
      await api.get("/users/test", {withCredentials: true});
      toast.success("ok");
    } catch (error) {
      toast.error("Thất bại");
      console.error(error);
    }
  }

  return (
    <div>
      {user?.username}
      <Logout/>
      <Button onClick={handleOnClick}>test</Button>
    </div>
  )
}

export default ChatAppPage
