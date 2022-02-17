import {Router} from 'express';
import {getDepartamentoById, getDepartamentos} from '../controllers/departamentos.controller';
import {getMunicipiosByDepartamentoId} from '../controllers/municipios.controller';
const router = Router();


router.get('/', getDepartamentos);
router.get('/:departamentoId', getDepartamentoById);
router.get('/:departamentoId/municipios', getMunicipiosByDepartamentoId);

export default router;
