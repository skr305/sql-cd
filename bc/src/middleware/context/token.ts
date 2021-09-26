import UnauthenticatedError from '@/lib/errors/unauth';
import ISDUContext from '@/types/isdu-context';
import { Middleware } from 'koa';

/**
 * 解析 Header 中的 Token
 * 使用此中间件意味着请求中必须包含正确的 Token 内容
 */
function koaToken(): Middleware<any, ISDUContext> {
  return async (ctx, next) => {
    const match = /Bearer\s(.*)/.exec(ctx.get('Authorization'));
    if (match) {
      ctx.token = match[1];
      await next();
    }
    throw new UnauthenticatedError('未检测到有效凭证');
  };
}

export default koaToken;
