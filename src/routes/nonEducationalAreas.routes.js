import {Router} from 'express';
import {verifyToken} from '../middlewares/auth';
import {
    createNonEducationalArea,
    deleteNonEducationalAreaById, 
    getNonEducationalAreas,
    getNonEducationalAreaById,
    updateNonEducationalAreaById,
} from '../controllers/nonEducationalAreas.controller';

let router = Router();

router.get('/', [verifyToken], getNonEducationalAreas);
router.get('/:nonEducationalAreaId', [verifyToken], getNonEducationalAreaById);
router.post('/', [verifyToken], createNonEducationalArea);
router.put('/:nonEducationalAreaId', [verifyToken], updateNonEducationalAreaById);
router.delete('/:nonEducationalAreaId', [verifyToken], deleteNonEducationalAreaById);

export default router;