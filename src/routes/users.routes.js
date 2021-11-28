import {Router} from 'express';
import * as userCtrl from '../controllers/user.controller';
import {authJwt, verifySignUp} from '../middlewares';

const router = Router();

const {verifyToken, isModerator, isAdmin} = authJwt;
const verifyAccess = [verifyToken, isAdmin, verifySignUp.checkRolesExisted, verifySignUp.checkDuplicateUsernameOrEmail]; 

router.post('/', verifyAccess, userCtrl.createUser);

export default router;
