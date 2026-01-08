import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    avataUrl: {
        type: String, // lưu đường link CDN hình
    },
    avataId: {
        type: String //cloudinary public_id để xóa hình
    },
    bio: {
        type: String,
        maxlength: 500, //tối đa 500 ký tự
    },
    phone: {
        type: String,
        sparse: true, //cho phép null, nhưng nếu có giá trị thì ko đc trùng
    },
}, {
    timestamps: true //tự động thêm createdAt và updatedAt
}
);

const User = mongoose.model('User', userSchema);//tạo model User từ schema đã định nghĩa
export default User; //tạo và xuất model User để sử dụng trong các phần khác của ứng dụng