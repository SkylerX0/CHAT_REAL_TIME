import express from 'express';
import { authMe, test } from '../controllers/userController.js';

const router = express.Router(); // Tạo một router mới từ express

router.get("/me", authMe);

router.get("/test", test);

export default router; // Xuất router để sử dụng trong các phần khác của ứng dụng