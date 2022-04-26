// logs.js
const util = require('../../utils/util.js')
import { $Toast } from '../../components/Iview/base/index'
import { getTabTotal ,getExerciseRecord} from './services'
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
    })
  },
  onLoad() {
    const userId = app.globalData.userInfo._id
    getExerciseRecord(userId).then((item) => {
        this.setData({
            recordList:[[...item.data.data.getExerciseRecord]]
        })
        console.log(item);
    })
  },

})
