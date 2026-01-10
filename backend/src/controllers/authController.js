import bcrypt from 'bcrypt'; // thư viện để mã hóa mật khẩu
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Session from '../models/Session.js';


const ACCESS_TOKEN_TTL = '30m'; //thời gian sống của access token thường là  dưới 15 phút
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; //thời gian sống của refresh token thường là từ 7-14 ngày (tính bằng mili giây) 14 ngày, 24 giờ, 60 phút, 60 giây, 1000 mili giây


//xử lý đăng ký người dùng
export const signUp = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body; //lấy dữ liệu từ body yêu cầu

        // kiểm tra có input nào thiếu ko
        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" }); //nếu thiếu thông tin trả về lỗi 400
        }
        //kiểm tra xem user đã tồn tại chưa
        const duplicate = await User.findOne({ username });
        if (duplicate) {
            return res.status(409).json({ message: "Tên đăng nhập đã tồn tại" }); //409 là lỗi xung đột
        }

        //tạo hashed password
        const saltRounds = 10; //số lần băm, càng cao càng bảo mật nhưng tốn thời gian thường thì là 10 hoặc 12 (2 mũ 10(tốn khoảng 200 mili giây) hoặc 2 mũ 12(tốn gấp 4 lần mũ 10) lần)
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //tạo user mới
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstName} ${lastName}`,
        });

        //trả về phản hồi thành công
        return res.sendStatus(204); //204 là tạo thành công
    } catch (error) {
        console.error('Lỗi khi đăng ký người dùng:', error);
        return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" }); //500 là lỗi máy chủ
    }
};


export const signIn = async (req, res) => {
    try {
        // Lấy input từ body (username và password)
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" }); //nếu thiếu thông tin trả về lỗi 400
        }

        //lấy hashedPassword từ database so sánh với password người dùng vừa nhập

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" }); //401 là lỗi xác thực
        }

        //kiểm tra mật khẩu
        const passwordCorrect = await bcrypt.compare(password, user.hashedPassword); //so sánh mật khẩu người dùng nhập với mật khẩu đã băm trong database

        if (!passwordCorrect) {
            return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" }); //401 là lỗi xác thực
        }

        //nếu khớp nhau tạo access token với JWT

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL }); //tạo access token

        //tạo refresh token 

        const refreshToken = crypto.randomBytes(64).toString('hex'); //tạo chuỗi ngẫu nhiên dài 128 ký tự

        //tạo session mới để lưu refresh token vào database (tại sao ko lưu accessToken vào database vì access token có thời gian sống ngắn nên ko cần lưu)

        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL), //thời gian hết hạn của refresh token
        });

        //trả về refresh token cho người dùng thông qua cookie

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, //chỉ có thể truy cập cookie từ phía server
            secure: true, //chỉ gửi cookie qua kết nối HTTPS
            sameSite: 'none', //cho phép gửi cookie trong các yêu cầu cross-site
            maxAge: REFRESH_TOKEN_TTL, //thời gian sống của cookie
        });

        //trả về access token về trong response(res)

        return res.status(200).json({message: `User ${user.username} đã đăng nhập thành công`, accessToken})

    } catch (error) {
        console.error('Lỗi khi đăng nhập người dùng:', error); 
        return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" }); //500 là lỗi máy chủ
    }
};