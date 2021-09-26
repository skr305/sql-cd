import BaseError from '@/lib/errors/base-error';
import SuccessError from '@/lib/errors/success';
import UnknownError from '@/lib/errors/unknown';
import ISDUContext from '@/types/isdu-context';
import { Middleware } from 'koa';

function koaUnknownErrorHandler(): Middleware<any, ISDUContext> {
  return async (_, next) => {
    try {
      await next();
    } catch (error) {
      if (error instanceof BaseError) {
        if (!(error instanceof SuccessError)) {
          console.error(error);
        }
        throw error;
      }
      console.error(error);
      throw new UnknownError();
    }
  };
}

export default koaUnknownErrorHandler;
