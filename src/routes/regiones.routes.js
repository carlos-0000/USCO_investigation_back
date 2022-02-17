import {Router} from 'express';
const router = Router();

import {getRegionById, getRegiones} from '../controllers/regiones.controller';

router.get('/', getRegiones);
router.get('/:regionId', getRegionById);

export default router;