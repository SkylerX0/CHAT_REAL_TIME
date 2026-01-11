

export const authMe = async (req, res) => {
    try {
        const user = req.user; // lấy user từ authMiddleware đã gán vào req

        return res.status(200).json({ user }); // trả về thông tin user
    } catch (error) {
        console.error('Lỗi khi xác thực người dùng(authMe):', error);
        return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" }); //500 là lỗi máy chủ
    }
};