const CN_Validate_Message = {
  default: '字段 %s 验证失败',
  required: '%s 必填',
  enum: '%s 必须是 %s 中的一个',
  whitespace: '%s 不能为空',
  date: {
    format: '%s 日期 %s 无法格式化为 %s',
    parse: '%s 日期解析失败, %s 无效',
    invalid: '%s 日期 %s 无效',
  },
  types: {
    string: '%s 不是一段文本',
    method: '%s 不是一个函数',
    array: '%s 不是一个数组',
    object: '%s 不是一个对象',
    number: '%s 不是一个数字',
    date: '%s 不是一个日期',
    boolean: '%s 不是一个布尔值',
    integer: '%s 不是一个整数',
    float: '%s 不是一个小数',
    regexp: '%s 无效',
    email: '%s 不是一个有效的邮件',
    url: '%s 不是一个有效的 URL 地址',
    hex: '%s 不是一个有效的十六进制数',
  },
  string: {
    len: '%s 必须为 %s 个字符',
    min: '%s 至少为 %s 个字符',
    max: '%s 至多为 %s 个字符',
    range: '%s 的长度必须在 %s 到 %s 个字符之间',
  },
  number: {
    len: '%s 必须为 %s',
    min: '%s 不小于 %s',
    max: '%s 不大于 %s',
    range: '%s 需要在 %s 和 %s 之间',
  },
  array: {
    len: '%s 的长度必须为 %s',
    min: '%s 的长度不小于 %s',
    max: '%s 的长度不多于 %s',
    range: '%s 的长度必须在 %s 和 %s 之间',
  },
  pattern: {
    mismatch: '%s value %s 不匹配模式 %s',
  },
};

export default CN_Validate_Message;
