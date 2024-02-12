import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));

export default router;
