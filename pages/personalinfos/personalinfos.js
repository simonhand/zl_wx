// pages/myClass/myClass.js
import { updateUserInfo } from './service'
import { updateUserInfo as updateUserInfoStorage } from '../../utils/updateWxstorage'
import { uploadImg } from '../../utils/uploadImg'
import { $Message  } from '../../components/Iview/base/index'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: "",
        realName: "",
        nickName:"",
        age:"",
        grade:"",
        gender:"男",
        phone:"",
        userType:""
    },
    submit(){
        updateUserInfo({...this.data,_id:app.globalData.userInfo._id}).then((res) => {
            updateUserInfoStorage(res.data.data.updateUserInfomation);
            $Message({
                content:"保存成功",
                type:"success"
            })
            // setTimeout(()=> {
            //     wx.switchTab({
            //       url: '../profile/profile',
            //     })
            // },600)
        });
    },
    genderClick(){
        this.setData({
            gender:this.data.gender === "男"?"女":"男"
        })
    },
    userTypeClick(){
        this.setData({
            userType:this.data.userType === 0? 1:0
        })
    },
    avatarClick() {
        uploadImg(this,"../imgCut/imgCut?from=profile&src=");
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
            gender:app.globalData.userInfo?.gender,
            phone:app.globalData.userInfo?.phone,
            userType:app.globalData.userInfo?.userType
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