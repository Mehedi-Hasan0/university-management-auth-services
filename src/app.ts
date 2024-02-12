import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import ApiError from './errors/ApiError';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';

const app: Application = express();

app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

// global error handler
app.use(globalErrorHandler);

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Server running on port 5000')
//   throw new Error('Testing Error logger')
// })

export default app;
