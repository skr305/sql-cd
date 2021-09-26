import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';

/**
 * 成功的“错误”
 * 该错误代表没有错误
 * 抛出该错误或设置 context.body 均可返回成功结果
 */
class SuccessError extends BaseError {
  public constructor(data: unknown) {
    super(StatusCodes.OK, ErrorCode.Success, 'success');
    this.data = data;
  }
}

export default SuccessError;
