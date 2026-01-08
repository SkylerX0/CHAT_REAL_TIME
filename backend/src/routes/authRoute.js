import express from 'express';
import { signUp } from '../controllers/authController.js';

const router = express.Router(); // Tạo một router mới từ express

router.post("/signup", signUp)

export default router; // Xuất router để sử dụng trong các phần khác của ứng dụng