import React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface IUserAvatarProps {
    type: "sidebar" | "chat" | "profile"; // loại avatar để xác định kích thước và kiểu dáng
    name: string; // tên người dùng để hiển thị trong AvatarFallback nếu không có ảnh
    avatarUrl?: string; // url của ảnh đại diện, nếu có thì hiển thị AvatarImage, nếu không có thì hiển thị AvatarFallback
    className?:string; //
}

const UserAvatar = ({ type, name, avatarUrl, className }: IUserAvatarProps) => {

    const bgColor = !avatarUrl ? "bg-gray-500" : ""; // nếu không có avatarUrl thì sử dụng màu nền xám cho AvatarFallback

    if (!name){name = "Laizy";}


  return (
    <Avatar className={cn(className ?? "",
        type === "sidebar" && "size-12 text-base",
        type === "chat" && "size-8 text-sm",
        type === "profile" && "size-24 text-3xl shadow-md"
    )}>
        <AvatarImage 
        src={avatarUrl} alt={name}
        />
        <AvatarFallback 
        className= {'${bgColor} text-white font-semibold'}
        >
            {name.charAt(0).toUpperCase()} {/* hiển thị chữ cái đầu tiên của tên người dùng trong AvatarFallback */}
        </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
