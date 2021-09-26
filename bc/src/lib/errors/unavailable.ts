import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';

/**
 * 未认证身份错误
 * 该错误代表当前用户没有登录或登录凭证过期
 */
class UnavailableError extends BaseError {
  public constructor(message = '当前服务不可用') {
    super(StatusCodes.SERVICE_UNAVAILABLE, ErrorCode.Unavailable, message);
  }
}

export default UnavailableError;
