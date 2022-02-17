import {Router} from 'express';
import {verifyToken} from '../middlewares/auth';
import {
    getNonEducationalEntities,
    getNonEducationalEntityById,
    createNonEducationalEntity,
    updateNonEducationalEntityById,
    deleteNonEducationalEntityById, 
} from '../controllers/nonEducationalEntities.controller';

let router = Router();

router.get('/', [verifyToken], getNonEducationalEntities);
router.get('/:nonEducationalEntityId', [verifyToken], getNonEducationalEntityById);
router.post('/', [verifyToken], createNonEducationalEntity);
router.put('/:nonEducationalEntityId', [verifyToken], updateNonEducationalEntityById);
router.delete('/:nonEducationalEntityId', [verifyToken], deleteNonEducationalEntityById);

export default router;