// pages/readNotify/readNotify.js
import { getNotifyByUser } from "./services"
import { zlDecodeList } from "../../utils/util"
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        notifyList:[],
        actions: [{
            name: '已读',
            color: '#fff',
            fontsize: '20',
            width: 100,
            icon: 'message_fill',
            background: '#FF7F00'
        }],
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
        getNotifyByUser(app.globalData.userInfo).then((res) => {
            const realNotifyLsit = res.data.data.getNotify.map((item) => {
                item.imgList = zlDecodeList(item.imgList);
                return item;
            })
            this.setData({
                notifyList:realNotifyLsit
            });
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