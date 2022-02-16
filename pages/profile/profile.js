// pages/profile/profile.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    avatar:"",
    modalVisible: false,
    actions: [{
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14',
        loading: false
      }
    ]
  },

  // 事件监听函数
  // 跳转函数
  MyclassClick(){
    wx.navigateTo({
      url: '../myclass/myclass',
    })
  },
  PersonalInfoClick(){
    wx.navigateTo({
      url: '../personalinfos/personalinfos',
    })
  },
  // modal窗取消函数
  handleCloseModal() {
    this.setData({
      modalVisible: false
    });
  },
  handleOKModal() {
    this.logouting();
  },
  // 登出登出函数
  logout() {
    this.setData({
      modalVisible: true
    })
  },
  logouting() {
    wx.removeStorage({
      key: 'user',
      success(res) {
        console.log(res);
      }
    });
    wx.switchTab({
      url: '../index/index',
    })
    this.setData({
      modalVisible:false
    })
  },
  //点击上传头像方法
  showAction() {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths;
        wx.navigateTo({
          url: "../avatarCut/avatarCut?src=" + tempFilePaths
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // const that = this
    // wx.getStorage({
    //   key: "user",
    //   encryptL: true,
    //   success(res) {
    //     that.setData({
    //       user: res.data
    //     })
    //   },
    //   fail() {
    //     console.log("无用户缓存");
    //   }
    // })
    this.setData({
      user:app.globalData.userInfo,
      avatar:app.globalData.userInfo.avatarUrl
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})