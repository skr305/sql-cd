/**
 * 标准错误码
 * 0 - 99 为保留码
 */
enum ErrorCode {
  Success = 0, // 请求成功
  Unknown = 1, // 未知错误
  Unauthenticated = 2, // 未鉴权
  PermissionDenied = 3, // 权限不足
  InvalidArgument = 4, // 参数非法
  NotFound = 5, // 资源不存在
  Internal = 8, // 服务器内部错误
  Unavailable = 9, // 服务不可用
}

export default ErrorCode;
