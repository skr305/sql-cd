import ISDUContext from '@/types/isdu-context';
import { Middleware } from 'koa';
import Schema, { Rules } from 'async-validator';
import CN_Validate_Message from '@/constant/validate';
import InvalidArgumentError from '@/lib/errors/invalid-argument';

type ValidateKey = 'json' | 'query';

/**
 * 验证数据传输对象格式
 * @param rule
 * @param key
 */
function koaPipe(
  rule: Rules,
  key: ValidateKey = 'json'
): Middleware<any, ISDUContext> {
  return async (ctx, next) => {
    try {
      const schema = new Schema(rule);
      (schema as any).messages(CN_Validate_Message);
      await schema.validate(ctx[key]);
      await next();
    } catch (error) {
      if (error.errors && error.errors[0]?.message) {
        throw new InvalidArgumentError(error.errors[0].message);
      }
      throw error;
    }
  };
}

export default koaPipe;
