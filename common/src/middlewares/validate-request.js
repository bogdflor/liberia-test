
import pkg from 'express';
const { Request, Response, NextFunction } = pkg;

import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error.js';

export const validateRequest = (
  req,
  res,
  next
) => {
  const errors = validationResult(req).errors;

  if (errors.length>0) {
    throw new RequestValidationError(errors);
  }

  next();
};
