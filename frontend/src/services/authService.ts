import api from '@/lib/axios';
import { RefreshCcw } from 'lucide-react';

// dịch vụ xác thực, gọi api liên quan đến đăng ký, đăng nhập, đăng xuất
export const authService = {
    signUp: async (username: string, password: string, email: string, firstName: string, lastName: string) => {
        const response = await api.post('/auth/signup', {username, password, email, firstName, lastName}, {withCredentials: true}); // gửi yêu cầu đăng ký tới backend

        return response.data; // trả về dữ liệu nhận được từ backend

    },

    signIn: async (username: string, password: string) => {
        const response = await api.post('/auth/signin', {username, password}, {withCredentials: true}); // gửi yêu cầu đăng nhập tới backend, withCredentials để gửi cookie

        return response.data; // trả về dữ liệu nhận được từ backend
    },

    signOut: async () => {
        return api.post('/auth/signout', {}, {withCredentials: true}); // gửi yêu cầu đăng xuất tới backend
    },

    //hàm fetchMe dùng để lấy thông tin người dùng hiện tại
    fetchMe: async () => { 
        const response = await api.get("/users/me", { withCredentials: true }); // gửi yêu cầu lấy thông tin người dùng tới backend

        return response.data.user; // trả về dữ liệu user nhận được từ backend
    },

    refresh: async () => {
        const response = await api.post('/auth/refresh', {}, {withCredentials: true}); // gửi yêu cầu làm mới token tới backend

        return response.data.accessToken; // trả về dữ liệu nhận được từ backend
    },
};