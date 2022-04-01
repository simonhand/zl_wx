// pages/examIndex/examIndex.js
import {
    examIndex
} from './service'
import { formateDate } from "../../utils/zlFormatDate"
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 33, 33],
        examList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        examIndex(app.globalData.userInfo.course).then((res) => {
            console.log("111111", res);
            this.setData({
                examList: res.data.data.examIndex.map((item) => {
                    const date =new Date(Number(item.meta.createdAt));
                    item.meta.createdAt = formateDate.call(date,"yyyy-MM-dd hh:mm:ss")
                    return item
                })
            })
        })
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
        // 开始请求数据啦

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