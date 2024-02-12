import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import ApiError from './errors/ApiError';
import routes from './app/routes';

const app: Application = express();

app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/', routes);

// global error handler
app.use(globalErrorHandler);

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Server running on port 5000')
//   throw new Error('Testing Error logger')
// })

export default app;
