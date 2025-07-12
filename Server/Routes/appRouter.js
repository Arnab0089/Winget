import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import { uploadApps } from '../Path/appCor.js';

const router = express.Router();
const upload = multer(); // parsing multipart/form-data

router.post('/upload', verifyToken, upload.single('file'), uploadApps);

export default router;
