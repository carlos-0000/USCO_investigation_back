import {Router} from 'express';
const router = Router();

import * as municipiosCtrl from '../controllers/municipios.controller'
// import {authJwt} from '../middlewares';

// const {verifyToken} = authJwt;
// const verifyAccess = [verifyToken];

// router.post('/', verifyAccess, municipiosCtrl.createCountries);
router.get('/', municipiosCtrl.getMunicipios);
router.get('/:codigoMunicipio', municipiosCtrl.getMunicipioByCodigo);
// router.put('/:productId', verifyAccess, municipiosCtrl.updateProductById);
// router.delete('/:productId', verifyAccess, municipiosCtrl.deleteProductById);

export default router;
