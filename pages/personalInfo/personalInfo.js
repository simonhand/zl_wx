// pages/personalInfo/personalInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible2: false,
        //小程序没有refs，所以只能用动态布尔值控制关闭
        toggle: false,
        toggle2: false,
        actions2: [{
            name: '删除',
            color: '#ed3f14'
        }],
        actions: [{
                name: '退出',
                color: '#fff',
                fontsize: '20',
                width: 100,
                icon: 'like',
                background: '#FF7F00'
            }
        ]
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