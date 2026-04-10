import React from 'react'
import { Badge } from '../ui/badge'

const UnreadCountBadge = ({unreadCount}: {unreadCount : number}) => {
  return (
    <div className='pulse-ring absolute z-20 -top-1 -right-1'>
      <Badge className='size-5 text-xs bg-gradient-chat border border-background'>
        {unreadCount > 9 ? "9+" : unreadCount} /* nếu số lượng tin nhắn chưa đọc lớn hơn 9 thì hiển thị "9+", ngược lại hiển thị số lượng tin nhắn chưa đọc */
      </Badge>
    </div>
  )
}

export default UnreadCountBadge
