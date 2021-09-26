import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';

/**
 * 内部错误
 */
class InternalError extends BaseError {
  public constructor(message = '服务器内部错误') {
    super(StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.Internal, message);
  }
}

export default InternalError;
