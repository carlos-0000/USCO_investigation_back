import {Router} from 'express';
import {verifyToken} from '../middlewares/auth';
import {
    createFaculty,
    deleteFacultyById, 
    getFaculties,
    getFacultyById,
    updateFacultyById,
} from '../controllers/faculties.controller';

let router = Router();

router.get('/', [verifyToken], getFaculties);
router.get('/:facultyId', [verifyToken], getFacultyById);
router.post('/', [verifyToken], createFaculty);
router.put('/:facultyId', [verifyToken], updateFacultyById);
router.delete('/:facultyId', [verifyToken], deleteFacultyById);

export default router;