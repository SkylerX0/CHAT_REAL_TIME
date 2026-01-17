import { useAuthStore } from '@/stores/useAuthStore';
import { use, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {

    const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();

    // đánh dấu trạng thái khởi tạo
    const [starting, setStarting] = useState(true);

    const init = async () => {
        //có thể xảy ra khi refresh trang, lúc này accessToken có thể đã có nhưng user chưa được load
        if (!accessToken) {
            await refresh(); // gọi làm mới token
        }

        if (accessToken && !user) {
            await fetchMe(); // lấy thông tin user nếu chưa có
        }

        setStarting(false);
    }

    //khởi tạo khi component được render, hàm này dùng để kiểm tra và lấy thông tin xác thực. đảm bảo user và token luôn đồng bộ
    useEffect(() => {
        init();
    }, [])

    if (starting || loading) {
        return <div className='flex h-screen items-center justify-center'>Đang tải trang...</div>; // hoặc hiển thị một spinner/loading indicator
    }

    if ( !accessToken) {

        return (
            //chuyển hướng đến trang đăng nhập
            <Navigate 
                to="/signin" replace // thay thế lịch sử trình duyệt để không quay lại trang bảo vệ sau khi đăng xuất
            />
        )
    }

  return (
    <Outlet></Outlet>
  )
}

export default ProtectedRoute
