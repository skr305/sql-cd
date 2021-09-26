import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';

/**
 * 权限不足错误
 */
class PermissionDeniedError extends BaseError {
  public constructor(message = '无权限访问') {
    super(StatusCodes.FORBIDDEN, ErrorCode.PermissionDenied, message);
  }
}

export default PermissionDeniedError;
