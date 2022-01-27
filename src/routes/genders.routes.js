import {Router} from 'express';
const router = Router();

import * as gendersCtrl from '../controllers/genders.controller';

router.get('/', gendersCtrl.getGenders);
router.get('/:genderId', gendersCtrl.getGenderById);

export default router;
