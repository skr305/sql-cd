import ISDUContext from '@/types/isdu-context';
import { Middleware } from 'koa';

function koaJson(): Middleware<any, ISDUContext> {
  return async (ctx, next) => {
    ctx.json = ctx.request.body || {};
    await next();
  };
}

export default koaJson;
