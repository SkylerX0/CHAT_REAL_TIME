import express from 'express'; // import thư viện express để tạo server
import dotenv from 'dotenv'; // import thư viện dotenv để quản lý biến môi trường
import { connectDB } from './libs/db.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import { protectedRoute } from './middlewares/authMiddleware.js';
import cors from 'cors';

dotenv.config(); // hàm này sẽ đọc file .env và gán các biến môi trường

const app = express(); // khởi tạo ứng dụng express
const PORT = process.env.PORT || 5001; // sử dụng biến môi trường PORT từ file .env hoặc mặc định là 5001

//middlewares
app.use(express.json()); // middleware để phân tích cú pháp JSON trong các yêu cầu đến
app.use(cookieParser()); // middleware để phân tích cookie từ các yêu cầu đến
app.use(cors({
  origin: process.env.CLIENT_URL, //cho phép truy cập từ frontend
  credentials: true, //cho phép gửi cookie
}));

//public routes
app.use('/api/auth', authRoute);


//privete routes
app.use(protectedRoute);//sử dụng middleware xác thực cho các route bên dưới có thể đặt ở server hoặc từng route riêng lẻ
app.use('/api/users', userRoute);


//kết nối DB và khởi động server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);// khởi động server 
  });
});
