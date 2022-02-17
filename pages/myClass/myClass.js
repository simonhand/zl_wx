// pages/personalInfo/personalInfo.js
import { randomString } from '../../utils/random'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //小程序没有refs，所以只能用动态布尔值控制关闭
        userType:0,
        swiperout_list:[1,2,3,4,5,6,7,8,9],
        modalVisible:false,
        actions2: [{
            name: '删除',
            color: '#ed3f14'
        }],
        actions: [{
                name: '退出课程',
                color: '#fff',
                fontsize: '20',
                width: 100,
                icon: 'close',
                background: '#FF7F00'
            }
        ]
    },
    // 事件函数触发
    addClick(){
        this.setData({
            modalVisible:true
        })
    } ,
    handleOk(){
        this.setData({

        })
    },
    handleClose(){
        this.setData({
            modalVisible:false
        })
    },
    changeUserTypeClick(){
        console.log(randomString(6));
        const that = this
        this.setData({
            userType: that.data.userType === 0 ? 1 : 0
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