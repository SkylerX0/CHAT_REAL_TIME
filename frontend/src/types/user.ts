// mô tả cấu trúc dữ liệu người dùng backend trả về
export interface User {
    _id: string;
    username: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    bio?: string;
    phoneNumber?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Friend {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
}

export interface FriendRequest {
    id: String:
    username: string;
    displayName: string;
    avatarUrl?: string;
}