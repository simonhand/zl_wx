// pages/login/login.js
import { $Toast } from '../../components/Iview/base/index'
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
        registerpwd:"",
        registerpwdAgain:""
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
    registerUnameInput:function (v) {
      
        this.setData({
            registeruname:v.detail.value
        })
    },
    registerPwdInputAgain:function (v) {
        this.setData({
            registerpwdAgain:v.detail.value
        })
    },
    registerpwdInput:function(v) {
        this.setData({
            registerpwd:v.detail.value
        })
    },

    // 事件监听函数
    // cardClick: () => {
    //     this.setData({
    //         flag:!flag,
    //     })
    // },
    cardClick: function () {
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
        if (!(this.data.loginuname && this.data.loginpwd)) {
            $Toast({
                type:'warning',
                content:'用户名或密码不可为空'
            })
            return;
        }
        const payload = JSON.stringify({
            query:`
            query loginuser {
                loginuser(uname:"${this.data.loginuname}",pwd:"${this.data.loginpwd}"){
                 uname
                 pwd
                 classNo
                 _id
                }
              }
            `
          })
          zlrequest(payload,"POST").then((res) => {
              const userInfo = res.data.data.loginuser;
              if (!userInfo) {
                  // 登录失败的处理
                $Toast({
                    type:'error',
                    content:"用户名或密码错误",
                    mask: false
                })
                return;
              }
              // 登录成功后缓存用户数据
              wx.setStorage({
                  key:"user",
                  data:userInfo,
                  encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
              })
              wx.switchTab({
                url: '../../pages/index/index',
              })
          })
    },

    registeClick:function() {
        if (!(this.data.registeruname && this.data.registerpwd
        )) {
            $Toast({
                type:'warning',
                content:'注册用户名或密码不可为空'
            })
            return;
        }
        if (this.data.registerpwdAgain !== this.data.registerpwd ) {
            $Toast({
                type:"warning",
                content:"两次输入密码不一致"
            });
            return;
        }
        const payload = JSON.stringify({
            query:`
            mutation {
                setUser(post:{
                  uname: "${this.data.registeruname}",
                  pwd:"${this.data.registerpwd}",
                }){
                    uname,
                    pwd,
                    _id,
                }
              }
            `
          })
          zlrequest(payload,"POST").then((res) => {
              const userInfo = res.data.data.setUser;
              console.log("register",userInfo);
              // 注册成功后缓存用户数据
              wx.setStorage({
                  key:"user",
                  data:userInfo,
                  encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
              })
              $Toast({
                  type:"success",
                  content:'注册成功'
              })
              setTimeout(()=> {
                wx.switchTab({
                    url: '../../pages/index/index',
                  })
              },500) 
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