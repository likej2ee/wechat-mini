module.exports = {
  // http 错误消息
  MESSAGE_ABORT_REQUEST: '撤销请求', // 立即终止已发出的请求，浏览器中止请求
  MESSAGE_NETWORK_ANOMALY: '服务器发呆呢', // httpStatus === 0 网络异常
  MESSAGE_INVALID_PARAMS: '无效参数', // httpStatus === 400
  MESSAGE_INVALID_REQUEST: '无效请求', // httpStatus === 404
  MESSAGE_IMAGE_ENTITY_TOO_LARGE: '请您选择小于10M的图片', // 413 上传图片
  MESSAGE_SERVICE_EXCEPTION: '系统繁忙', // httpStatus < 200 || httpStatus >= 300
  MESSAGE_UNKNOW_EXCEPTION: '未知异常', // 通常是前端脚本异常的提示

  // 与服务端约定的标准状态码
  STATE_CODE_SUCCESS: 101, // 业务操作成功状态
  STATE_CODE_FAILURE: 102, // 业务操作失败状态
  STATE_CODE_NO_LOGIN: 110, // 未登录

  MOBILE_REG: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/,

  // 本地缓存key
  STORAGE_KEY_USER_INFO: 'userinfo',
}
