import express from 'express'; // import thư viện express để tạo server
import dotenv from 'dotenv'; // import thư viện dotenv để quản lý biến môi trường
import { connectDB } from './libs/db.js';
import authRoute from './routes/authRoute.js';

dotenv.config(); // hàm này sẽ đọc file .env và gán các biến môi trường

const app = express();
const PORT = process.env.PORT || 5001; // sử dụng biến môi trường PORT từ file .env hoặc mặc định là 5001

//middlewares
app.use(express.json()); // middleware để phân tích cú pháp JSON trong các yêu cầu đến

//public routes
app.use('/api/auth', authRoute);


//privete routes



//kết nối DB và khởi động server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);// khởi động server 
  });
});
