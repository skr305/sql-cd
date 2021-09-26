import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';

/**
 * 资源不存在
 */
class NotFoundError extends BaseError {
  public constructor(message = '资源不存在') {
    super(StatusCodes.NOT_FOUND, ErrorCode.NotFound, message);
  }
}

export default NotFoundError;
