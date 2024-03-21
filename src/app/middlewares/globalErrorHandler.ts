import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { IGenericErrorMessage } from '../../types';
import config from '../../config';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import zodErrorHandler from '../../errors/zodErrorHandler';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // separating logs based on development and production
  config.env === 'development'
    ? console.log('globalErrorHandler ~~~', error)
    : errorLogger.error('globalErrorHandler ~~~', error);

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplyfiedError = handleValidationError(error);

    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
    errorMessages = simplyfiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplyfiedError = zodErrorHandler(error);

    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
    errorMessages = simplyfiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
