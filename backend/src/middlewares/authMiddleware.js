import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//authorization -xác minh user là ai
export const protectedRoute = async (req, res, next) => {
    try {
        //lấy token từ header Authorization
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
        
        if (!token) {
            return res.status(401).json({ message: "Không tìm thấy access token, truy cập bị từ chối" }); //401 là lỗi chưa xác thực
        }

        //xác nhận token hợp lệ
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => { //nếu token hợp lệ nó sẽ giải mã và lưu vào decoded nếu ko thì err sẽ có giá trị
            if (err) {
                console.error(err);
                return res.status(403).json({ message: "Access token không hợp lệ hoặc đã hết hạn" }); //403 là lỗi bị từ chối
            }
            //tìm user
            const user = await User.findById(decodedUser.userId).select('-hashedPassword'); // lấy tắt cả thông tin user trừ hashedPassword
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" }); //404 là lỗi không tìm thấy
            }
            //trả user về trong req
            req.user = user;
            next(); //cho phép đi tiếp đến controller

        })

    } catch (error) {
        console.error('Lỗi xác thực JWT trong authMiddleware', error);
        return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" }); //500 là lỗi máy chủ
    }
};