import {Router} from 'express';
import * as userCtrl from '../controllers/user.controller';
import {authJwt, verifySignUp} from '../middlewares';

const router = Router();

const {verifyToken, isAtLeastAdmin, isAtLeastModerator, isAtLeastSuperAdmin, isAtLeastUser} = authJwt;

router.get('/', [verifyToken, isAtLeastAdmin], userCtrl.getUsers);
router.get('/:userIdToGet', [verifyToken], userCtrl.getUserById);

export default router;
