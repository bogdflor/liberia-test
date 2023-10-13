
import pkg from 'express-validator';
const { ValidationError } = pkg;

import { CustomError } from './custom-error.js';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  errors

  constructor(errors) {
    super('Invalid request parameters');
    this.errors=errors
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    let errArray={}

    this.errors.map(err => {
      errArray[err.param]=err.msg;
    });
    return errArray;
  }
}
