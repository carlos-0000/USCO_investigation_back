import {Router} from 'express';
const router = Router();

import * as documentTypesCtrl from '../controllers/documentTypes.controller';

router.get('/', documentTypesCtrl.getDocumentTypes);
router.get('/:documentTypeId', documentTypesCtrl.getDocumentTypeById);

export default router;
