import {Router} from 'express';
const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import {verifySignUp} from '../middlewares';
const {checkDuplicateUsernameOrEmail} = verifySignUp;

router.post('/signup', [checkDuplicateUsernameOrEmail], authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

export default router;
