// app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch() {
    const that = this;
    // 展示本地存储能力
    // 小程序启动后设置全局变量
    wx.getStorage({
      key:"user",
      encryptL:true,
      success(res){
        that.globalData.userInfo = res.data;
      },
      fail(){
        console.log("无用户缓存");
      }
    })
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
})
