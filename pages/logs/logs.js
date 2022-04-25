// logs.js
const util = require('../../utils/util.js')
import { $Toast } from '../../components/Iview/base/index'
import { getTabTotal } from './services'
const app = getApp()
Page({
  data: {
    logs: [],
    tabIndex:0,
    recordList:[],
    tabTotal:{},
    isLoading:false,
    actions: [{
      name: '删除记录',
      color: '#fff',
      fontsize: '20',
      width: 100,
      icon: 'delete',
      background: '#FF7F00'
  }],
  },
  tabChange(e){
    this.setData({
      tabIndex:e.detail.index,
    })
  },
  scrolltolower(){
    console.log("触底了");
    // this.setData({
    //   recordList:this.data.recordList + 5
    // })
  },
  // 页面显示触发
  onShow(){
    const userId = app.globalData.userInfo._id
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    // 请求tab框上的数量
    getTabTotal(userId).then((res) => {
      this.setData({
        tabTotal:res.data.data.getTabTotal
      })
      console.log(res);
    })
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
