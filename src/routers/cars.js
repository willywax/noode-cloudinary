import express from 'express';
import carController from '../controller/cars';
import multer from '../middleware/multer-config';

const router = express.Router();

router.post('/', multer, carController.saveOne);
router.get('/',carController.getCars);

export default router;
