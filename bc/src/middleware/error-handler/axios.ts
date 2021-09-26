import AxiosError from '@/lib/errors/axios';
import ISDUContext from '@/types/isdu-context';
import { Middleware } from 'koa';

function koaAxiosErrorHandler(): Middleware<any, ISDUContext> {
  return async (_, next) => {
    try {
      await next();
    } catch (error) {
      if (error.request) {
        if (error.code === 'ECONNABORTED') {
          throw new AxiosError(
            `服务请求远程数据超时`,
            error.request,
            error.response
          );
        }
        throw new AxiosError(
          `服务请求远程数据时发生错误`,
          error.request,
          error.response
        );
      }
      throw error;
    }
  };
}

export default koaAxiosErrorHandler;
