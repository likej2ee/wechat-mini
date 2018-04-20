let app = getApp()

/**
 * 默认的错误处理器
 */
var defaultErrorHandler = {

  /**
   * 处理请求被中止
   */
  abort: function() {
    wx.showToast({
      title: app.constants.MESSAGE_ABORT_REQUEST,
      duration: 2000
    })
  },

  /**
   * 处理网络异常
   */
  network: function() {
    wx.showToast({
      title: app.constants.MESSAGE_NETWORK_ANOMALY,
      duration: 2000
    })
  },

  /**
   * 处理 http 服务器异常
   */
  http: function(httpStatus) {
    if (httpStatus === 400) {
      wx.showToast({
        title: app.constants.MESSAGE_INVALID_PARAMS,
        duration: 2000
      })
    } else if (httpStatus === 404) {
      wx.showToast({
        title: app.constants.MESSAGE_INVALID_REQUEST,
        duration: 2000
      })
    } else if (httpStatus === 413) {
      wx.showToast({
        title: app.constants.MESSAGE_IMAGE_ENTITY_TOO_LARGE,
        duration: 2000
      })
    } else {
      wx.showToast({
        title: app.constants.MESSAGE_SERVICE_EXCEPTION,
        duration: 2000
      })
    }
  },

  /**
   * 用户未登录，弹出登录窗
   */
  noLogin: function(data) {
    wx.navigateTo({
      url: '/pages/passport/login/login',
    })
  },

  /**
   * 处理其他业务失败
   */
  other: function(data) {
    var message = data.message ? data.message : app.constants.MESSAGE_MAP[data.stateCode];
    wx.showToast({
      title: message
    })
  }
};

/**
 * 根据错误类型响应错误处理，调用对应的处理器，并返回处理器返回的结果。
 */
function errorResponse(response, errorHandler) {
  let httpStatus = response.statusCode
  let data = response.data || {}
  if (typeof httpStatus === 'undefined') {
    // 具体会显示微信返回的错误状态信息
    wx.showToast({
      title: response.errmsg,
      duration: 2000
    })
  } else if (httpStatus === 0) {
    // 处理网络异常
    return errorHandler.network();
  } else if (httpStatus < 200 || httpStatus > 300) {
    // 处理 http 服务器异常
    return errorHandler.http(httpStatus);
  } else if (data.stateCode === app.constants.STATE_CODE_NO_LOGIN) {
    // 用户未登录，弹出登录窗
    return errorHandler.noLogin(data);
  } else {
    return errorHandler.other(data);
  }
}

export default function(errorHandlerExtension) {
  let errorHandler = Object.assign(defaultErrorHandler, errorHandlerExtension, {})
  return function(response) {
    errorResponse(response, errorHandler)
  }
}
