import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';

/**
 * 资源不存在
 */
class NotInitedError extends BaseError {
  public constructor(message = '尚未初始化数据库connection') {
    super(StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.Internal, message);
  }
}

export default NotInitedError;