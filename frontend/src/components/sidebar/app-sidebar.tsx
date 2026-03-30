"use client"


import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
import { Switch } from "../ui/switch"
import CreateNewChat from "../chat/CreateNewChat"
import NewGroupChatModal from "../chat/NewGroupChatModal"
import GroupChatList from "../chat/GroupChatList"
import AddFriendModal from "../chat/AddFriendModal"
import DirectMessageList from "../chat/DirectMessageList"
import { useThemeStore } from "@/stores/useThemeStore"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { isDark, toggleTheme } = useThemeStore();

  return (
    <Sidebar variant="inset" {...props}>
      {/* header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="bg-gradient-primary">
              <a href="#">
                <div className="flex w-full items-center px-2 justify-between">
                  <h1 className="text-xl font-bold text-white">LAYZI</h1>
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-white/80" />
                    <Switch
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                      className="data-[state=checked]:bg-background/80"
                    />
                    <Moon className="size-4 text-white/80" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* content */}
      <SidebarContent>
        {/* new chat */}
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* groups chat */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            nhóm Chat
          </SidebarGroupLabel>
          <SidebarGroupAction title="Tạo Nhóm" className="cursor-pointer">
            <NewGroupChatModal />
            <SidebarGroupContent>
              <GroupChatList />

            </SidebarGroupContent>
          </SidebarGroupAction>
        </SidebarGroup>


        {/* Direct Messages */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            bạn bè
          </SidebarGroupLabel>
          <SidebarGroupAction title="Kết Bạn" className="cursor-pointer">
            <AddFriendModal />
            <SidebarGroupContent>
              <DirectMessageList />

            </SidebarGroupContent>
          </SidebarGroupAction>
        </SidebarGroup>

      </SidebarContent>

      {/* footer */}
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}
