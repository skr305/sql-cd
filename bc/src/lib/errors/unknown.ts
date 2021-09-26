import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';

/**
 * 未知错误
 */
class UnknownError extends BaseError {
  public constructor(message = '未知错误') {
    super(StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.Unknown, message);
  }
}

export default UnknownError;
