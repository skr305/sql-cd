import SuccessError from '@/lib/errors/success';
import ISDUContext from '@/types/isdu-context';
import { Middleware } from 'koa';

function koaResponse(): Middleware<any, ISDUContext> {
  return async (ctx, next) => {
    await next();
    throw new SuccessError(ctx.body);
  };
}

export default koaResponse;
