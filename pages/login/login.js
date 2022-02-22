// pages/login/login.js
import { $Message  } from '../../components/Iview/base/index'
import { isNullObj } from '../../utils/util'
import { loginUser, registerUser,checkUser } from "./servies.js";
const {baseUrl} = require('../../config/network')
const app = getApp();
let hasRegister = false;
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
        registerpwdAgain:"",
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
        hasRegister = false
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
    registeUsernameClick:async function (v) {
        const userInputName = v.detail.value;
        console.log("------",userInputName);
        const checkedUser =await checkUser({ userInputName });
        if (!!checkedUser) {
            hasRegister = true;
            $Message ({
                content:"用户名已注册",
                type:"error"
            })
        }
    },

    // 事件监听函数
    cardClick: function () {
        this.setData({
            flag:!this.data.flag
        })
    },
    inputClick:function (e) {
        const props = e.currentTarget.dataset;
        this.setData({
            inputIndex: props.index,
        })
    },
    loginClick:function(e) {
        if (!(this.data.loginuname && this.data.loginpwd)) {
            $Message ({
                type:'warning',
                content:'用户名或密码不可为空'
            })
            return;
        }
        loginUser({loginuname:this.data.loginuname,loginpwd:this.data.loginpwd});
    },

    registeClick:function() {
        if (hasRegister) {
                $Message ({
                    type:'error',
                    content:'该用户名已被注册'
                })
                return;
            }
        if (!(this.data.registeruname && this.data.registerpwd
        )) {
            $Message ({
                type:'warning',
                content:'注册用户名或密码不可为空'
            })
            return;
        }
        if (this.data.registerpwdAgain !== this.data.registerpwd ) {
            $Message ({
                type:"warning",
                content:"两次输入密码不一致"
            });
            return;
        }
        registerUser({registeruname:this.data.registeruname,registerpwd:this.data.registerpwd,hasRegister});
    },

    wechatloginClick:function(params) {
       const wxLogin = new Promise((resolve,reject) => {
        wx.login({
            success(res) {
               wx.request({
                 url: 'https://api.weixin.qq.com/sns/jscode2session',
                 data:{
                   //小程序唯一标识
                   appid: '',
                   //小程序的 app secret
                   secret: '',
                   grant_type: 'authorization_code',
                   js_code: res.code
                 },
                 method:"GET",
                 success(res){
                   resolve(res)
                 },
                 fail(error){
                    reject(error)
                 }
               })
            },
          }) 
       })
       const wxGetUserPrpfile = new Promise((resolve,reject) => {
        wx.getUserProfile({
            desc: '是否授权微信信息登录学小易',
            success(res){
                resolve(res);
            },
            fail(error){
               reject(error)
            }
          })
       })
      Promise.all([wxLogin,wxGetUserPrpfile]).then(async (res) => {
        console.log(res);
        const openId = res[0].data.openid;
        const user ={ openid:res[0].data.openid, ...res[1].userInfo }
        const _checkUser =await checkUser({userOpenId:openId});
        console.log("_checkUser",_checkUser);
        // user为空是第一次登录进行注册
        if (isNullObj(_checkUser)) {
            console.log("执行了");
            registerUser({...user,hasRegister:false,isWxUser:true});
            $Message({
                content:"注册成功",
                type:"success"
              });
        }else{
            // 这里说明不是第一次登录
            wx.setStorage({
                key:"user",
                data:_checkUser,
                encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
            })
            app.globalData.userInfo = _checkUser;
        }
        wx.switchTab({
          url: '../index/index',
        })
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