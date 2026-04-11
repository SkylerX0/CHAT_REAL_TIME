import { BrowserRouter, Route, Routes } from "react-router";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ChatAppPage from "./pages/ChatAppPage";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useThemeStore } from "./stores/useThemeStore";
import { use, useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import { useSocketStore } from "./stores/useSocketStore";


function App() {
  const {isDark, setTheme} = useThemeStore();
  const { accessToken } = useAuthStore();
  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    // kiểm tra theme đã lưu trong localStorage
    setTheme(isDark);
  }, [isDark]);

  //theo doi sự thay đổi của accessToken để kết nối hoặc ngắt kết nối socket
  useEffect(() => {
    if (accessToken) {
      connectSocket();
    }
    return () => disconnectSocket();
  },[accessToken]); // khi accessToken thay đổi, nếu có token thì kết nối socket, nếu không có token (đăng xuất) thì ngắt kết nối socket;

  return <>
    {/* đặt Toaster ở đây để có thể hiển thị thông báo ở tất cả các trang */}
    <Toaster richColors />
    <BrowserRouter>
      <Routes>

        {/*public routes */}
        <Route
          path = "/signin"
          element = {<SignInPage />}
        />


        <Route
          path = "/signup"
          element = {<SignUpPage />}
        />



        {/*protected routes */}
        {/* tạo protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
          path = "/"
          element = {<ChatAppPage />}
        />
        </Route>


      </Routes>
    </BrowserRouter>
  </>

}

export default App
