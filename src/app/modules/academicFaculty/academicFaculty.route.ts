import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.get('/', AcademicFacultyController.getAllFaculties);

router.post('/create-faculty', AcademicFacultyController.createFaculty);

export const AcademicFacultyRoutes = router;
