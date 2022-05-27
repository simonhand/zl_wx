// pages/createNotify/createNotify.js
import { zlMessage } from "../../components/Iview/base/index"
import {
    uploadImg,
    uploadImgToCos
} from "../../utils/uploadImg"
import { createNotify } from "./service"
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgList: [], // 题干配图
        urlParams:undefined,
        textArea:"",
        bgVal:"",
        msgVal:"",
        isShow:false
    },
    viewImage(e) {
        wx.previewImage({
            current: e.currentTarget.dataset.url,
            urls: this.data.imgList
        })
    },
    ChooseImage() {
        uploadImg(this, "../imgCut/imgCut?from=createNotify&src=");
    },
    DelImg(e) {
        this.setData({
            imgList: this.data.imgList.filter((item) => item !== this.data.imgList[e.currentTarget.dataset.index])
        })
    },
    submit() {
        if (this.data.textArea === "") {
            zlMessage(this,{
                content:"通知内容不可为空",
                type:"warning"
            })
            return;
        }
        const promiseListImg = this.data.imgList.map(item => new Promise((reslove, reject) => {
            uploadImgToCos(item, res => {
                reslove(res.Location)
            })
        }))
        const newImgList = []
        Promise.all(promiseListImg).then((res) => {
            for (const iterator of res) {
                newImgList.push(iterator)
            }
            return createNotify({...this.data.urlParams,imgList:newImgList,textArea:this.data.textArea})
        }).then((res) => {
            app.globalData.helpNavigate = { from:"createNotify",status:"success",msg:this.data.urlParams.courseName }
            wx.switchTab({
                url: '../index/index',
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.from === 'index') {
            this.setData({
                urlParams: JSON.parse(options.course)
            }, () => {
                console.log(this.data.urlParams);
            })
        }
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