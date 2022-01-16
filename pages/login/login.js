// pages/login/login.js
import { baseUrl} from '../../config/network'
import {zlrequest } from '../../utils/zlGraphql'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: true,
        inputIndex: null,
        loginuname:"",
        loginpwd:"",
        registeruname:"",
        registerpwd:""
    },
    // input事件
    unameInput:function(v) {
        this.setData({
            loginuname:v.detail.value
        })
    },
    pwdInput:function(v) {
        this.setData({
            loginpwd:v.detail.value
        })
    },

    // 事件监听函数
    // cardClick: () => {
    //     this.setData({
    //         flag:!flag,
    //     })
    // },
    cardClick: function () {
        console.log("->>>>>>",this.data.flag);
        this.setData({
            flag:!this.data.flag
        })
    },
    inputClick:function (e) {
        const props = e.currentTarget.dataset;
        console.log("props",props.index);
        this.setData({
            inputIndex: props.index,
        })
    },
    loginClick:function(e) {
        console.log(this.data.loginuname+this.data.loginpwd);
        const payload = JSON.stringify({
            query:`
            query loginuser {
                loginuser(uname:"${this.data.loginuname}",pwd:"${this.data.loginpwd}"){
                 uname
                 pwd
                 classNo
                }
              }
            `
          })
          zlrequest(payload,"POST").then((res) => {
              console.log("res------",res);
          })
        //  wx.request({
        //    url: baseUrl,
        //    method: 'POST',
        //    data:payload,
        //    header:{
        //     "Content-Type": "application/json"
        //   },
        //   success(res) {
        //     console.log(
        //         "loginres",res
        //     );
        //   }
        //  })
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
        // const query = wx.createSelectorQuery();
        // query.selectAll('input');
        // query.exec((res)=> {
        //     res.map()
        // })
        // console.log("query",query);
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