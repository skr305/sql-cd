import Axios from 'axios';
import ISDUContext from '@/types/isdu-context';
import { Middleware } from 'koa';
import { CookieJar } from 'tough-cookie';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import { AxiosTimeout } from '@/constant/axios';

/**
 * 对每个请求分配一个带有 Cookie 的 Axios 实例
 */
function koaAxios(): Middleware<any, ISDUContext> {
  return async (ctx, next) => {
    const cookie = new CookieJar();
    const axios = Axios.create({
      timeout: AxiosTimeout,
      jar: cookie,
      withCredentials: true,
    });
    axiosCookieJarSupport(axios);
    ctx.axios = axios;
    await next();
  };
}

export default koaAxios;
