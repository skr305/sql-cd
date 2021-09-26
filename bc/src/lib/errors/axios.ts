import ErrorCode from '@/constant/errno';
import BaseError from './base-error';
import { StatusCodes } from 'http-status-codes';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * 发送 Axios 错误
 */
class AxiosError extends BaseError {
  public request: AxiosRequestConfig;

  public response?: AxiosResponse;

  public constructor(
    message = '服务器内部错误',
    request: AxiosRequestConfig,
    response?: AxiosResponse
  ) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.Internal, message);
    this.request = request;
    this.response = response;
  }
}

export default AxiosError;
