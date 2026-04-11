import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socketMiddleware.js";
// import { getUserConversationsForSocketIO } from "../controllers/conversationController.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
});

io.use(socketAuthMiddleware); // sử dụng middleware xác thực cho tất cả các kết nối socket

const onlineUsers = new Map(); // {userId: socketId} cặp key - value

io.on("connection", async (socket) => {
    const user = socket.user; // socketAuthMiddleware đã gán thông tin người dùng vào socket.user
    console.log(user.displayName + ' Online với ' + socket.id);

    onlineUsers.set(user._id, socket.id); // lưu userId và socketId vào onlineUsers khi người dùng kết nối

    io.emit("online-users", Array.from(onlineUsers.keys()));

    socket.on("disconnect", () => {
        onlineUsers.delete(user._id); // xóa userId khỏi onlineUsers khi người dùng ngắt kết nối
        io.emit("online-users", Array.from(onlineUsers.keys()));
        console.log(user.displayName + ' Offline với ' + socket.id);
    });
});


export {io, app, server};

