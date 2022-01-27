import {Router} from 'express';
const router = Router();

import * as civilStatusesCtrl from '../controllers/civilStatuses.controller';

router.get('/', civilStatusesCtrl.getCivilStatuses);
router.get('/:civilStatusId', civilStatusesCtrl.getCivilStatusById);

export default router;
