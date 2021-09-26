import SDUService from '@/constant/sdu-service';
import sduUniAuth from '@/lib/auth/sdu-auth';
import AuthService from '@/service/auth';
import ISDUContext from '@/types/isdu-context';
import { Middleware } from 'koa';

/**
 * 中间件：使用山东大学统一认证
 * @param services 传入一个或多个服务地址
 */
function koaSDUAuth(...services: SDUService[]): Middleware<any, ISDUContext> {
  return async (ctx, next) => {
    const { casID, password } = AuthService.instance.verify(ctx.token, ctx.ip);
    await Promise.all(
      services.map((url) => sduUniAuth(ctx.axios, url, casID, password))
    );
    await next();
  };
}

export default koaSDUAuth;
