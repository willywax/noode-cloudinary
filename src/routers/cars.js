import express from 'express';
import carController from '../controller/cars';
import multer from '../middleware/multer-config';

const router = express.Router();

router.post('/', multer, carController.saveOne);
router.get('/:id',carController.getCarImage);
router.get('/',carController.getCarImages);
router.delete('/:id',carController.deleteCarImage);
router.delete('/', carController.deleteMultipleImages);

export default router;
