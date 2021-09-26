import * as jwt from 'jsonwebtoken';
import * as AES from 'crypto-js/aes';
import * as Utf8 from 'crypto-js/enc-utf8';
import { getAuthCryptoKey, getTokenSignKey } from '@/lib/secrets/key-mgr';
import UnauthenticatedError from '@/lib/errors/unauth';
import { AuthPayload, TokenPayload } from './types';

/**
 * i山大统一认证服务
 */
class AuthService {
  protected static _instance?: AuthService;

  public static get instance() {
    if (!this._instance) {
      this._instance = new AuthService();
    }
    return this._instance;
  }

  /**
   * 签发统一认证 Token
   * @param casID 学工号
   * @param password 密码
   * @param ip 用户 IP 地址
   */
  public sign(casID: string, password: string, ip: string): string | never {
    const encode = AES.encrypt(
      `${password}@${ip}`,
      getAuthCryptoKey()
    ).toString();
    return jwt.sign(
      {
        casID,
        data: encode,
      },
      getTokenSignKey(),
      {
        expiresIn: '2 days',
      }
    );
  }

  /**
   * 验证 Token 是否有效
   * @param token
   * @param ip 当前请求的 IP 地址
   */
  public verify(token: string, ip: string): AuthPayload | never {
    const payload = jwt.verify(token, getTokenSignKey()) as TokenPayload;
    const decode = AES.decrypt(payload.data, getAuthCryptoKey()).toString(Utf8);
    const [password, tokenIP] = decode.split('@');
    if (ip !== tokenIP) {
      throw new UnauthenticatedError('登录地点失效，请重新登录');
    }
    return {
      casID: payload.casID,
      password,
    };
  }
}

export default AuthService;
