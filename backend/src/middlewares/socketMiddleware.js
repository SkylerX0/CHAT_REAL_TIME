import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token; //handshake là đối tượng chứa thông tin về kết nối socket, auth là nơi chứa dữ liệu xác thực được gửi từ client khi kết nối socket, token là token JWT được gửi từ client để xác thực người dùng khi kết nối socket
    if (!token) {
      return next(new Error("Unauthorized - Token không tồn tại"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return next(new Error("Unauthorized - Token không hợp lệ hoặc đã hết hạn"));
    }

    const user = await User.findById(decoded.userId).select("-hashedPassword");

    if (!user) {
      return next(new Error("User không tồn tại"));
    }

    socket.user = user;

    next();
  } catch (error) {
    console.error("Lỗi khi verify JWT trong socketMiddleware", error);
    next(new Error("Unauthorized"));
  }
};