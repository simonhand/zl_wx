// pages/myClass/myClass.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: null,
        realName: null,
        nickName:null,
        age:null,
        grade:null,
        gender:"男",
        phone:null
    },
    submit(){
        console.log(this.data);
    },
    genderClick(){
        this.setData({
            gender:this.data.gender === "男"?"女":"男"
        })
    },
    avatarClick() {
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
        this.setData({
            avatarUrl: app.globalData.userInfo?.avatarUrl,
            realName: app.globalData.userInfo?.realName,
            nickName:app.globalData.userInfo?.nickName,
            age:app.globalData.userInfo?.age,
            grade:app.globalData.userInfo?.grade,
            gender:"男",
            phone:app.globalData.userInfo?.phone
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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