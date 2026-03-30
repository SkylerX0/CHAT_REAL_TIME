import type { ThemeState } from "@/types/store"
import {create} from "zustand"
import {persist} from "zustand/middleware" //để lưu trữ trạng thái của store vào localStorage hoặc sessionStorage của trình duyệt, giúp dữ liệu được giữ lại ngay cả khi người dùng làm mới trang hoặc đóng trình duyệt.


export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            isDark: false,

            toggleTheme: () => {
                const newValue = !get().isDark;
                set({ isDark: newValue })
                if (newValue) {
                    document.documentElement.classList.add("dark")
                } 
                else {
                    document.documentElement.classList.remove("dark")
                }
            },
            setTheme: (Dark: boolean) => {
                set({ isDark: Dark })
                if (Dark) {
                    document.documentElement.classList.add("dark")
                }
                else {
                    document.documentElement.classList.remove("dark")
                }
            }
        }),
        {
            name: "theme-storage"
        }
    )
)

