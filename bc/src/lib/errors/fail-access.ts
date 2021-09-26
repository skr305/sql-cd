import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';

/**
 * 一般意义上的查询错误
 */
class FailError extends BaseError {
  public constructor(data: unknown = {}) {
    super(StatusCodes.OK, ErrorCode.Internal, 'Fail');
    this.data = data;
  }
}

export default FailError;
