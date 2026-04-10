import type { Participant } from '@/types/chat'
import React from 'react'
import UserAvatar from './UserAvatar';
import { Ellipsis } from 'lucide-react';


interface GroupChatAvatarProps {
    paticipants: Participant[];
    type: "chat" | "sidebar";

}

const GroupChatAvatar = ({ paticipants, type }: GroupChatAvatarProps) => {

    const avatars = [];
    const limit = Math.min(paticipants.length, 4);

    for (let i = 0; i < limit; i++) {
        const member = paticipants[i]; // lấy thông tin của người tham gia thứ i
        avatars.push(
            <UserAvatar
                key={i}
                type={type}
                name={member.displayName ?? ""}
                avatarUrl={member.avatarUrl ?? undefined}
            />
        );
    }

    return (
        <div className='relative flex -space-x-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2'>
            {avatars}
            {/* nếu nhiều hơn 4  member thì hiện thị dấu ... */}
            {paticipants.length > 4 && (
                <div className='flex items-center z-10 justify-center size-8 rounded-full bg-muted ring-2 ring-background text-muted-foreground'>
                    <Ellipsis
                        className='size-4'
                    />
                </div>
            )

            }
        </div>
    )
}

export default GroupChatAvatar
