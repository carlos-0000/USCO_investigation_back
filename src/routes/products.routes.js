import {Router} from 'express';
const router = Router();

import * as productCtrl from '../controllers/products.controller'

router.post('/', productCtrl.createProducts);
router.get('/', productCtrl.getProducts);
router.get('/:productId', productCtrl.getProductById);
router.put('/:productId', productCtrl.updateProductById);
router.delete('/:productId', productCtrl.deleteProductById);

export default router;
