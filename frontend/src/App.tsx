import { BrowserRouter, Route, Routes } from "react-router";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ChatAppPage from "./pages/ChatAppPage";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useThemeStore } from "./stores/useThemeStore";
import { use, useEffect } from "react";


function App() {
  const {isDark, setTheme} = useThemeStore();

  useEffect(() => {
    // kiểm tra theme đã lưu trong localStorage
    setTheme(isDark);
  }, [isDark]);

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
