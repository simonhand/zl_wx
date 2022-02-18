// logs.js
const util = require('../../utils/util.js')
import { $Toast } from '../../components/Iview/base/index'
Page({
  data: {
    logs: [],
    userInputIndex:""
  },

  setStorge:function (e) {
    wx.setStorage({
      key:'zhangle',
      encrypt:true,
      data:{
        name:'zhangle',
        age:21
      }
    })
  },
  getStorge:function(params) {
    wx.getStorage({
      key:'zhangle',
      encryptL:true,
      success(res){
        console.log(res);
        $Toast({
          content:res.data.name
        })
      }
    })
  },
  getUserStorge:function(params) {
    wx.getStorage({
      key:"user",
      encryptL:true,
      success(res){
        console.log(res);
        $Toast({
          content:res.data
        })
      },
      fail(){
        console.log("无用户缓存");
      }
    })
  },
  // 页面显示触发
  onShow(){
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },
  inputClick(e){
    const props = e.currentTarget.dataset;
    this.setData({
      userInputIndex: props.index,
  })
  }
})
