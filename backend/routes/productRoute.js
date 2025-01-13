import express from 'express';
import { getProducts, getProductById,addProduct,deleteProduct,updateProduct } from '../controller/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();
productRouter.get('/products', getProducts);
productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct);
productRouter.post('/single', getProductById);
productRouter.put('/product/:id', updateProduct);
productRouter.post('/remove',adminAuth, deleteProduct);
export default productRouter;
