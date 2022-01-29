import {Router} from 'express';
const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import {documentNumberAlreadyExist, hasMinimumData, institutionalEmailAlreadyExist} from '../middlewares/users';
const userAlreadyExist = [documentNumberAlreadyExist, institutionalEmailAlreadyExist];

router.post('/register', [userAlreadyExist, hasMinimumData], authCtrl.register);
router.post('/login', authCtrl.login);

export default router;
