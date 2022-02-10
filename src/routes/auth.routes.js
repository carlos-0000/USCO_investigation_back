import {Router} from 'express';
const router = Router();

import {login, register} from '../controllers/auth.controller';
import {documentNumberAlreadyExist, hasMinimumData, institutionalEmailAlreadyExist} from '../middlewares/users';
import {userExists, userIsNotDeleted} from '../middlewares/auth';

router.post('/register', [documentNumberAlreadyExist, institutionalEmailAlreadyExist, hasMinimumData], register);
router.post('/login', [userExists, userIsNotDeleted], login);

export default router;
