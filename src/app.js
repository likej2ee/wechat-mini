let constants = require('./constants/constants.js')

App({
  constants: constants,

  // 全局数据对象
  globalData: {
    defaultHeader: { // 默认的apiHeader参数
      'content-type': 'application/x-www-form-urlencoded',
      'sid': '', // 会话id
    },
    appConfig: { // 基础配置
      service: 'https://weis.yidianchina.com/api/' // 接口前缀
    },
    appInfo: {
      language: '', // 微信设置的语言
      model: '', // 手机型号
      system: '', // 操作系统版本
      version: '', // 微信版本号
      SDKVersion: '' // 客户端基础库版本
    },
    userInfo: { // 用户信息，需持久化
      sid: '',
      unionId: '',
      openId: '',
    },
    isEnteredLoginPage: false // 标记上一个页面进入过登录页面
  },

  // 生命周期函数--监听小程序初始化 onLaunch
  onLaunch(options) {
    wx.getSystemInfo({
      success: res => {
        this.globalData.appInfo.language = res.language
        this.globalData.appInfo.model = res.model
        this.globalData.appInfo.system = res.system
        this.globalData.appInfo.version = res.version
        this.globalData.appInfo.SDKVersion = res.SDKVersion
      }
    })
  },

  // 生命周期函数--监听小程序显示 不知道为啥每次新加载会触发onShow两次
  onShow(options) {
    // this.restoreUserInfo()
    // this.getUserInfo(user => {
    //   console.log('user', user);
    // })
  },

  /**
   * 还原用户
   */
  restoreUserInfo() {
    let userInfoCache = wx.getStorageSync(this.constants.STORAGE_KEY_USER_INFO)
    if (userInfoCache) {
      this.globalData.userInfo = userInfoCache
      this.globalData.defaultHeader.sid = this.globalData.userInfo.sid
    }
  },

  /**
   * 持久化用户信息并更新对应全局变量
   */
  storageUserInfo(user) {
    let userInfo = Object.assign(this.globalData.userInfo, user)
    wx.setStorageSync(this.constants.STORAGE_KEY_USER_INFO, userInfo)
    this.globalData.defaultHeader.sid = userInfo.sid
  },

  // 重置用户默认值
  clearUserInfo: function() {
    wx.removeStorageSync(this.constants.STORAGE_KEY_USER_INFO)
    this.globalData.userInfo = { unionId: '' }
    this.globalData.defaultHeader.sid = ''
  },

  /**
   * 获取联合登录信息
   */
  getUserInfo(cb) {
    if (this.checkUser()) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          console.log(res);
          res.userInfo.unionId = 'xxx' // 伪代码，应该使用wx.login获取code，然后再通过服务器处理获得带有unionid标识的用户信息
          this.storageUserInfo(res.userInfo)
          typeof cb == "function" && cb(this.globalData.userInfo)
        }
      })
    }
  },

  /**
   * 根据变量标记验证用户身份
   */
  checkUser() {
    let isLogined = false;
    if (this.globalData.userInfo.unionId !== '') {
      isLogined = true
    }
    return isLogined;
  },

  /**
   * 验证用户是否已登录
   */
  checkLogin() {
    let isLogined = this.checkUser();
    if (!isLogined) {
      if (this.globalData.isEnteredLoginPage) {
        this.globalData.isEnteredLoginPage = false;
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.navigateTo({
          url: '/pages/passport/login/login',
        })
      }
    } else {
      this.globalData.isEnteredLoginPage = false;
    }
    return isLogined;
  }
})
