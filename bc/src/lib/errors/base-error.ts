import StandardResponse from '@/types/response';
import { StatusCodes } from 'http-status-codes';

class BaseError extends Error {
  public code: number;

  public httpStatus: StatusCodes;

  public message: string;

  public data: unknown = undefined;

  public constructor(httpStatus: StatusCodes, code: number, message: string) {
    super(message);
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }

  public get asJson(): StandardResponse {
    return {
      errorCode: this.code,
      message: this.message,
      data: this.data,
    };
  }
}

export default BaseError;
