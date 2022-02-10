import {Router} from 'express';
import * as userCtrl from '../controllers/user.controller';
import {isAtLeastAdmin, verifyToken} from '../middlewares/auth';
import {
    documentNumberAlreadyExist,
    hasMinimumData,
    isAdminOrOwner,
    userAlreadyExist,
    userIsNotDeleted
} from '../middlewares/users';

const router = Router();

const {verifyToken, isAtLeastAdmin} = authJwt;

router.get('/', [verifyToken, isAtLeastAdmin], userCtrl.getUsers);
router.get('/:userId', [verifyToken, isAdminOrOwner, userIsNotDeleted], userCtrl.getUserById);
router.post('/', [verifyToken, isAtLeastAdmin, hasMinimumData, documentNumberAlreadyExist], userCtrl.createUser);
router.put('/:userId', [verifyToken, userAlreadyExist, isAdminOrOwner, userIsNotDeleted], userCtrl.updateUserById);
router.delete('/:userId', [verifyToken, userAlreadyExist, isAtLeastAdmin, userIsNotDeleted], userCtrl.deleteUserById);

export default router;
