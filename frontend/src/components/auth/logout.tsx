import React from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function Logout() {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate("/signin");
        } catch (error) {
            console.error("Logout failed:", error);

        }
    }
    return (
        <Button variant="completeGhost" onClick={handleLogout}><LogOut className="text-destructive" /> Log Out</Button>
    )
}

export default Logout;