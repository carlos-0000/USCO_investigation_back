import {Router} from 'express';
const router = Router();

import * as productCtrl from '../controllers/product.controller'
import {authJwt} from '../middlewares';

const {verifyToken, isModerator, isAdmin} = authJwt;
const verifyAccess = [verifyToken, isModerator];

router.post('/', verifyAccess, productCtrl.createProducts);
router.get('/', productCtrl.getProducts);
router.get('/:productId', productCtrl.getProductById);
router.put('/:productId', verifyAccess, productCtrl.updateProductById);
router.delete('/:productId', verifyAccess, productCtrl.deleteProductById);

export default router;
