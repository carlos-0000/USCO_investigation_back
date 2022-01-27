import {Router} from 'express';
const router = Router();

import * as ethnicGroupsCtrl from '../controllers/ethnicGroups.controller';

router.get('/', ethnicGroupsCtrl.getEthnicGroups);
router.get('/:ethnicGroupId', ethnicGroupsCtrl.getEthnicGroupById);

export default router;
