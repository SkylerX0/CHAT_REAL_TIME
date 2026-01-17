import { create } from 'zustand';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import type { AuthState } from '@/types/store';

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false, // dung để theo dõi trạng thái api(đăng nhập/đăng xuất)
    setAccessToken: (accessToken) => {
        set({accessToken});
    },
    clearState: () => {
        set({accessToken: null, user: null, loading: false});
    },

    signUp: async (username, password, email, firstName, lastName) => {
        try {
            set({loading: true}); // bắt đầu gọi api
            // gọi api đăng ký
            await authService.signUp(username, password, email, firstName, lastName);

            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");

        } catch (error) {
            console.error(error);
            toast.error("Đăng ký thất bại! Vui lòng thử lại.");
        } finally {
            set({loading: false}); // kết thúc gọi api
        }
    },

    signIn: async (username, password) => {
        try {
            set({loading: true}); // bắt đầu gọi api

            const {accessToken} = await authService.signIn(username, password);
            // set({accessToken});
            get().setAccessToken(accessToken);
            await get().fetchMe(); // lấy thông tin user sau khi đăng nhập thành công

            toast.success("Đăng nhập thành công!");

        } catch (error) {
            console.error(error);
            toast.error("Đăng nhập thất bại! Vui lòng thử lại.");
        } finally {
            set({loading: false}); // kết thúc gọi api
        }
    },

    signOut: async () => {
        try {
            get().clearState(); // xóa trạng thái xác thực ở frontend ngay lập tức
            await authService.signOut(); // gọi api đăng xuất ở backend
            toast.success("Đăng xuất thành công!");
        } catch (error) {
            console.error(error);
            toast.error("Đăng xuất thất bại! Vui lòng thử lại.");
        }
    },

    fetchMe: async () => {
        try {
            set({loading: true}); // bắt đầu gọi api, set loading = true để biết là đang loading dữ liệu

            const user =  await authService.fetchMe(); // gọi api lấy thông tin user hiện tại

            set({user}); // lưu thông tin user vào store


        } catch (error) {
            console.error(error);
            set ({user: null, accessToken: null}); // nếu có lỗi thì xóa thông tin user và accessToken
            toast.error("Lấy thông tin người dùng thất bại! Vui lòng thử lại.");
        } finally {
            set({loading: false}); // kết thúc gọi api
        }
    },
    refresh: async () => {
        try {
            set({loading: true}); // bắt đầu gọi api    
            const {user, fetchMe,setAccessToken} = get();

            //tạo biến để lưu accessToken mới
            const accessToken = await authService.refresh();
            // set({accessToken});
            setAccessToken(accessToken);

            if (!user) {
                await fetchMe(); // nếu chưa có thông tin user thì gọi fetchMe để lấy thông tin user
            }
        } catch (error) {
            console.error(error);
            toast.error("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.");
            get().clearState(); // nếu có lỗi thì xóa thông tin xác thực
        } finally {
            set({loading: false}); // kết thúc gọi api
        }
    }
}));