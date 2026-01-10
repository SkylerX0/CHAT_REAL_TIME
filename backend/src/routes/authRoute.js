import express from 'express';
import { signIn,signUp } from '../controllers/authController.js';

const router = express.Router(); // Tạo một router mới từ express

router.post("/signup", signUp)

router.post("/signin", signIn);

export default router; // Xuất router để sử dụng trong các phần khác của ứng dụng