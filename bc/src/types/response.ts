type StandardResponse = {
  /**
   * 业务自定义错误码
   */
  errorCode: number;
  /**
   * 响应提示
   */
  message: string;
  /**
   * 最终结果数据
   */
  data: unknown;
};

export default StandardResponse;
