import { AxiosInstance } from 'axios';

interface ISDUContext {
  /**
   * 使用该 axios 实例完成所有请求
   */
  axios: AxiosInstance;
  /**
   * 请求主体的 Json 数据
   */
  json: any;
  /**
   * 请求 Header 中解析出的 Token 字段
   */
  token: string;
}

export default ISDUContext;
