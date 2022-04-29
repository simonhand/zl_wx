// pages/calcIndex/calcIndex.js
import {
    $Message
} from '../../components/Iview/base/index'
import {calcType} from '../../config/secret'
const app = getApp()
let calctype = '';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        calcCount: "",
        modalVisible: false,
        needMoveTop: false,
        inputIndex:-1,
        navData: calcType
    },
    inputClick() {
        this.setData({
            needMoveTop: true,
            inputIndex:1
        })
    },
    handleOk() {
        const count = this.data.calcCount;
        console.log(Number(count));
        if (!count || !Number(count)) {
            $Message({
                content:"输入不合法",
                type:"error"
            });
            return
        }
        if (count > 50) {
            $Message({
                content:"题目数量不能超过50哦",
                type:"warning"
            });
            return
        }
        this.setData({
            calcCount: "",
            modalVisible: false,
            needMoveTop: false,
            inputIndex:-1
        },() => {
            wx.navigateTo({
                url: '../calc/calc?calcType=' + calctype + "&count=" + count,
            })
            calctype = ''
        })
    },
    handleClose() {
        this.setData({
            modalVisible: false,
            inputIndex:-1
        })
    },
    itemCLick(e) {
        calctype =  e.currentTarget.dataset.calctype
        this.setData({
            modalVisible: true
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
        console.log(app.globalData.userInfo);
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