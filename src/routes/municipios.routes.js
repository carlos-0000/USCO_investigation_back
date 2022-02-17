import {Router} from 'express';
const router = Router();

import {getMunicipioById, getMunicipios} from '../controllers/municipios.controller';

router.get('/', getMunicipios);
router.get('/:municipioId', getMunicipioById);

export default router;