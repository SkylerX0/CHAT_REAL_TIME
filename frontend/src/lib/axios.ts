import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api', // ở chế độ development thì gọi tới localhost, còn production thì gọi tới cùng domain
    withCredentials: true, // gửi cookie cùng với mỗi yêu cầu

});

// thiết lập interceptor để tự động thêm access token vào header của mỗi yêu cầu
api.interceptors.request.use((config) => {
    // có thể thêm các thiết lập chung cho tất cả các yêu cầu ở đây, ví dụ như thêm token xác thực vào header
    const { accessToken } = useAuthStore.getState(); // lấy accessToken từ zustand store

    if ( accessToken ) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

//tự động gọi refresh api khi access token hết hạn

api.interceptors.response.use((res) => res, async (error) => {
    const originalRequest = error.config;
    
    //những api ko cần check
    if (originalRequest.url.includes("/auth/signin")
        || originalRequest.url.includes("/auth/signup")
        || originalRequest.url.includes("/auth/refresh")
    ) {
        return Promise.reject(error);
    }

    //giới hạn lặp lại tối đa 4 lần
    originalRequest._retryCount = originalRequest._retryCount || 0;

    if(error.response?.status === 403 && originalRequest._retryCount < 4) {
        originalRequest._retryCount += 1;

        console.log("refresh", originalRequest._retryCount)
        try {
            // lấy access token mới
            const res = await api.post("/auth/refresh", {withCredentials: true});
            const newAccessToken = res.data.accessToken;

            //cập nhật token trong store
            useAuthStore.getState().setAccessToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            useAuthStore.getState().clearState();
            return Promise.reject(refreshError);
        }
        
    }

    return Promise.reject(error);
});

export default api;