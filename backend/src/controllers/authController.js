import bcrypt from 'bcrypt'; // thư viện để mã hóa mật khẩu
import User from '../models/User.js';

//xử lý đăng ký người dùng
export const signUp = async(req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body; //lấy dữ liệu từ body yêu cầu

        // kiểm tra có input nào thiếu ko
        if(!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" }); //nếu thiếu thông tin trả về lỗi 400
        }
        //kiểm tra xem user đã tồn tại chưa
        const duplicate = await User.findOne({username});
        if(duplicate) {
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