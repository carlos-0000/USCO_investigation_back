import {Router} from 'express';
const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import {verifySignUp} from '../middlewares';
const {checkDuplicateUsernameOrEmail, checkRolesExisted} = verifySignUp;

router.post('/signup', [checkDuplicateUsernameOrEmail, checkRolesExisted], authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

export default router;
