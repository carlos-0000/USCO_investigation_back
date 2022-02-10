import {Router} from 'express';
const router = Router();

import {getRoleById, getRoles} from '../controllers/roles.controller';
import {verifyToken} from '../middlewares/auth';

router.get('/', [verifyToken], getRoles);
router.get('/:roleId', [verifyToken], getRoleById);

export default router;
