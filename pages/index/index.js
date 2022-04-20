import {
  getTeacherCourse
} from '../../commonservice/courseservice'
import {
  haveUserInfo
} from '../../utils/util'
import {
  getWxStorage
} from '../../utils/updateWxstorage'
import {
  $Message,
  $Toast
} from '../../components/Iview/base/index'
import {
  examIndex,
  getNotifyByUser
} from './services.js'
// index.js
// 获取应用实例
const app = getApp();
let selectedIndex = -1;
let queryCourse = [];
let fromBtn = ''
Page({
  data: {
    loading: false,
    motto: 'Hello World',
    userInfo: {},
    modelVisible: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    teacherCourseList: [],
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    hasUserInfo: false,
    deadLineDate: "截至时间",
    exerciseCount: 0,
    NotifyCount:0,
  },
  // 页面显示触发
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  // 事件处理函数
  handleNavigate() {
    wx.navigateTo({
      url: '/pages/readNotify/readNotify',
    })
  },
  calcClick() {
    wx.navigateTo({
      url: '../calcIndex/calcIndex',
    })
  },
  loginClick() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  timePickerOK(data) {
    console.log(data);
  },
  handleOpenModalToExam({
    detail
  }) {
    // console.log(detail);
    wx.navigateTo({
      url: '../examIndex/examIndex',
    })
  },
  handleOpenModal(e) {
    if (e.currentTarget.dataset.from === 'createNotify') {
      fromBtn = "createNotify"
    }
    if (e.currentTarget.dataset.from === 'createExam') {
      fromBtn = "createExam"
    }
    // 弹出Modal窗
    haveUserInfo() && getTeacherCourse(app.globalData.userInfo._id).then(
      (res) => {
        queryCourse = res.data.data.queryCourse
        this.setData({
          teacherCourseList: res.data.data.queryCourse.map((item) => [item.courseName]),
          modelVisible: true
        })
      }
    )
  },
  // 点击列表中的item触发
  selectItemClick(e) {
    selectedIndex = e.detail.index;
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleClose() {
    this.setData({
      modelVisible: false
    });
  },
  handleOk() {
    if (selectedIndex === -1) {
      $Message({
        content: "请选择课程",
        type: "warning"
      })
      return;
    }
    wx.navigateTo({
      // url:``
      url: `..${fromBtn=== 'createExam'?'/createExam/createExam':'/'+fromBtn+'/'+fromBtn}?from=index&course=` + JSON.stringify(queryCourse[selectedIndex]),
      // url:"../createExam/createExam?from=index&course=" + JSON.stringify(queryCourse[selectedIndex]),
      success: () => {
        this.setData({
          modelVisible: false
        })
      }
    })
    fromBtn = ''
  },
  onLoad(options) {

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow() {
    // 我愿称之为天坑 ！！！
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 // 数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，消息中心页面为1
      })
    }
    const that = this;
    // 请求有多少个测验未做
    // 这里之所以从缓存里拿数据，按理说全局变量userinfo数据是和缓存中同步的，但是从缓存中拿是异步的又因为这是首页这个时候直接从usereinfo拿是undefined
    getWxStorage('user').then((res) =>
      Promise.all([examIndex(res.data.course),getNotifyByUser(res.data)
      ])
    ).then((res) => {
      that.setData({
        exerciseCount: res[0].data.data.examIndex[0].exerciseCount,
        NotifyCount: res[1].data.data.getNotify[0].NotifyCount
      })
    })
    const helpNavigate = app.globalData.helpNavigate
    if (helpNavigate.status === "success") {
      if (helpNavigate.from === "exam") {
        $Toast({
          content: "测验已成功提交",
          type: "success"
        })
      }
      if (helpNavigate.from === "createExam") {
        $Toast({
          content: "测验已成功创建",
          type: "success"
        })
      }
      if (helpNavigate.from === "createNotify") {
        $Toast({
          content: `${helpNavigate.msg}的通知已成功创建`,
          type: "success"
        })
      }
      app.globalData.helpNavigate = {
        from: "",
        status: ""
      };
    }
  }
})