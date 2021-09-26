import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';
/**
 * 请求参数非法
 */
class InvalidArgumentError extends BaseError {
  public constructor(message = '请求参数非法') {
    super(StatusCodes.BAD_REQUEST, ErrorCode.InvalidArgument, message);
  }
}

export default InvalidArgumentError;
