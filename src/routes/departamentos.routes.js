import {Router} from 'express';
const router = Router();

import * as municipiosCtrl from '../controllers/municipios.controller'
// import {authJwt} from '../middlewares';

// const {verifyToken} = authJwt;
// const verifyAccess = [verifyToken];

// router.post('/', verifyAccess, municipiosCtrl.createCountries);
router.get('/', municipiosCtrl.getDepartamentos);
router.get('/:codigoDepartamento', municipiosCtrl.getDepartamentoByCodigo);
router.get('/:codigoDepartamento/municipios', municipiosCtrl.getMunicipiosByDepartamento);
// router.put('/:productId', verifyAccess, municipiosCtrl.updateProductById);
// router.delete('/:productId', verifyAccess, municipiosCtrl.deleteProductById);

export default router;
