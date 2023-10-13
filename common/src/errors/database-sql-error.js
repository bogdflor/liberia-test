import { CustomError } from './custom-error.js';

export class DatabaseSqlError extends CustomError {
  statusCode = 500;
  reason = 'Error executing sql';

  constructor() {
    super('Error executing sql');

    Object.setPrototypeOf(this, DatabaseSqlError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
