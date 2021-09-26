import ISDUContext from '@/types/isdu-context';
import * as koaCompose from 'koa-compose';
import { Middleware } from 'koa';
import koaUnknownErrorHandler from './unknown';
import koaStandardErrorHandler from './standard';
import koaAxiosErrorHandler from './axios';

function koaErrorHandlder(): Middleware<any, ISDUContext> {
  return koaCompose([
    koaStandardErrorHandler(),
    koaUnknownErrorHandler(),
    koaAxiosErrorHandler(),
  ]);
}

export default koaErrorHandlder;
