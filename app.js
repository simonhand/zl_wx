// app.js
import { colorUI } from './config/ColorUI'
import { colorUISdk } from './config/mp-sdk'
App({
  colorUI,//挂载到app上
  colorUISdk,
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
  },
})
