import { AuthCryptoKey, TokenSignKey } from '@/constant/secret';
import InternalError from '../errors/internal';

export function getTokenSignKey(): string | never {
  if (TokenSignKey) {
    return TokenSignKey;
  }
  throw new InternalError('Token 签名密钥不存在');
}

export function getAuthCryptoKey(): string | never {
  if (AuthCryptoKey) {
    return AuthCryptoKey;
  }
  throw new InternalError('鉴权密钥不存在');
}
