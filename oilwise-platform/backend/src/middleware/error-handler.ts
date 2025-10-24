import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    details: err.details || null,
    timestamp: new Date().toISOString(),
  });
};

export class ValidationError extends Error implements ApiError {
  statusCode = 400;
  details: any;

  constructor(message: string, details?: any) {
    super(message);
    this.details = details;
  }
}

export class NotFoundError extends Error implements ApiError {
  statusCode = 404;

  constructor(message: string = 'Resource not found') {
    super(message);
  }
}

export class UnauthorizedError extends Error implements ApiError {
  statusCode = 401;

  constructor(message: string = 'Unauthorized') {
    super(message);
  }
}

export class ForbiddenError extends Error implements ApiError {
  statusCode = 403;

  constructor(message: string = 'Forbidden') {
    super(message);
  }
}

