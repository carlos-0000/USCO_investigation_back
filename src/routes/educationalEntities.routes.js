import {Router} from 'express';
import {verifyToken} from '../middlewares/auth';
import {
    createEducationalEntity,
    deleteEducationalEntityById, 
    getEducationalEntities,
    getEducationalEntityById,
    updateEducationalEntityById,
} from '../controllers/educationalEntities.controller';

let router = Router();

router.get('/', [verifyToken], getEducationalEntities);
router.get('/:educationalEntityId', [verifyToken], getEducationalEntityById);
router.post('/', [verifyToken], createEducationalEntity);
router.put('/:educationalEntityId', [verifyToken], updateEducationalEntityById);
router.delete('/:educationalEntityId', [verifyToken], deleteEducationalEntityById);

export default router;