import express from 'express';
import { signIn, signOut, signUp } from '../controllers/authController.js';
import { ref } from 'process';
import { refreshToken } from '../controllers/authController.js';

const router = express.Router(); // Tạo một router mới từ express

router.post("/signup", signUp)

router.post("/signin", signIn);

router.post("/signout", signOut);

router.post("/refresh", refreshToken);

export default router; // Xuất router để sử dụng trong các phần khác của ứng dụng