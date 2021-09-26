import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';

/**
 * 未认证身份错误
 * 该错误代表当前用户没有登录或登录凭证过期
 */
class UnauthenticatedError extends BaseError {
  public constructor(message = '身份认证失败，请重新登录') {
    super(StatusCodes.UNAUTHORIZED, ErrorCode.Unauthenticated, message);
  }
}

export default UnauthenticatedError;
