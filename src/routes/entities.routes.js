import {Router} from 'express';
// import * as entityCtrl from '../controllers/entities.controller';
import {/*isAtLeastEntity, */verifyToken} from '../middlewares/auth';
import {
    createEducationalEntity,
    createNonEducationalEntity,
    deleteEducationalEntityById, 
    deleteNonEducationalEntityById,
    getEducationalEntities,
    getEducationalEntityById,
    getNonEducationalEntities,
    getNonEducationalEntityById,
    updateEducationalEntityById,
    updateNonEducationalEntityById
} from '../controllers/entities.controller';
// import {
//     documentNumberAlreadyExist,
//     hasMinimumData,
//     isEntityOrOwner,
//     entityAlreadyExist,
//     entityIsNotDeleted
// } from '../middlewares/entities';

let router = Router();

router.get('/', [verifyToken/*, isAtLeastEntity*/], getEducationalEntities);
router.get('/:entityId', [verifyToken/*, isEntityOrOwner, entityIsNotDeleted*/], getEducationalEntityById);
router.post('/', [verifyToken/*, isAtLeastEntity, hasMinimumData, documentNumberAlreadyExist*/], createEducationalEntity);
router.put('/:entityId', [verifyToken/*, entityAlreadyExist, isEntityOrOwner, entityIsNotDeleted*/], updateEducationalEntityById);
router.delete('/:entityId', [verifyToken/*, entityAlreadyExist, isAtLeastEntity, entityIsNotDeleted*/], deleteEducationalEntityById);

export const educationalEntitiesRouter = router;

router = Router();

router.get('/', [verifyToken/*, isAtLeastEntity*/], getNonEducationalEntities);
router.get('/:entityId', [verifyToken/*, isEntityOrOwner, entityIsNotDeleted*/], getNonEducationalEntityById);
router.post('/', [verifyToken/*, isAtLeastEntity, hasMinimumData, documentNumberAlreadyExist*/], createNonEducationalEntity);
router.put('/:entityId', [verifyToken/*, entityAlreadyExist, isEntityOrOwner, entityIsNotDeleted*/], updateNonEducationalEntityById);
router.delete('/:entityId', [verifyToken/*, entityAlreadyExist, isAtLeastEntity, entityIsNotDeleted*/], deleteNonEducationalEntityById);

export const noEducationalEntitiesRouter = router;