import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: false;
  message: string;
  errors?: any;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
    return;
  }

  if (err.name === 'ZodError') {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors,
    });
    return;
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};
