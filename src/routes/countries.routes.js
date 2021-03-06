import {Router} from 'express';
const router = Router();

import * as countryCtrl from '../controllers/countries.controller'
// import {authJwt} from '../middlewares';

// const {verifyToken} = authJwt;
// const verifyAccess = [verifyToken];

// router.post('/', verifyAccess, countryCtrl.createCountries);
router.get('/', countryCtrl.getCountries);
router.get('/:countryId', countryCtrl.getCountryById);
// router.put('/:productId', verifyAccess, countryCtrl.updateProductById);
// router.delete('/:productId', verifyAccess, countryCtrl.deleteProductById);

export default router;
