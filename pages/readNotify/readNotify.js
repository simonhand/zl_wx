// pages/readNotify/readNotify.js
import {
    getNotifyByUser,
    readNotify
} from "./services"
import {
    zlDecodeList
} from "../../utils/util"
import {
    formateDate
} from "../../utils/zlFormatDate"
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        notifyList: [],
        target:false,
        clickItem:{},
        actions: [{
            name: '已读',
            color: '#fff',
            fontsize: '20',
            width: 100,
            icon: 'message_fill',
            background: '#FF7F00'
        }],
    },
    // 事件监听函数
    swipeoutClick(e) {
        readNotify(app.globalData.userInfo._id, this.data.notifyList[e?.currentTarget.dataset.index || this.data.clickItem.index]._id).then((res) => {
            // 代表成功已读消息
            if (res.data.data.readNotify._id) {
                this.setData({
                    notifyList: this.data.notifyList.filter((item) =>
                        {
                            return item._id !== res.data.data.readNotify._id
                        }
                    )
                })
            }

        })
    },
    cardClick(e){
        this.setData({
            target:true,
            clickItem:{...this.data.notifyList[e.currentTarget.dataset.index],index:e.currentTarget.dataset.index}
        })
    },
    viewImage(e) {
        console.log(e.currentTarget.dataset.url);
        wx.previewImage({
            current: e.currentTarget.dataset.url,
            urls: this.data.clickItem.imgList
        })
    },
    modalConfirm(e){
        console.log(e);
        if (e.detail.confirm) {
            this.swipeoutClick()
        }
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
                item.imgList = zlDecodeList(item.imgList).map(_item => "https://" + _item);
                const date = new Date(Number(item.meta.createdAt));
                item.meta.createdAt = formateDate.call(date, "MM-dd hh:mm")
                return item;
            })
            this.setData({
                notifyList: realNotifyLsit
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