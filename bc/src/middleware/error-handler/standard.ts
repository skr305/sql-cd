import BaseError from '@/lib/errors/base-error';
import ISDUContext from '@/types/isdu-context';
import { Middleware } from 'koa';

function koaStandardErrorHandler(): Middleware<any, ISDUContext> {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      if (error instanceof BaseError) {
        ctx.status = error.httpStatus;
        ctx.body = error.asJson;
      }
    }
  };
}

export default koaStandardErrorHandler;
