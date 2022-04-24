// pages/calcIndex/calcIndex.js
import {
    $Message
} from '../../components/Iview/base/index'
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
        navData: [{
            title: '基础',
            sub: [{
                    icon: 'cicon-level_11',
                    // name: 'navbar',
                    fontSize: 30,
                    title: '5以内的加法'
                },
                {
                    icon: 'cicon-level_12',
                    fontSize: 30,
                    title: '5以内的减法'
                },
                {
                    icon: 'cicon-level_13',
                    fontSize: 30,
                    title: '6-10的加法'
                },
                {
                    icon: 'cicon-level_14',
                    fontSize: 30,
                    title: '6-10的减法'
                },
                {
                    icon: 'cicon-level_15',
                    fontSize: 30,
                    title: '10以内的连加'
                },
                {
                    icon: 'cicon-level_16',
                    fontSize: 30,
                    title: '10以内的连减'
                },
                {
                    icon: 'cicon-level_1_1',
                    fontSize: 30,
                    title: '综合训练'
                }
            ]
        },
        {
            title: '进阶',
            sub: [{
                    icon: 'cicon-level_21',
                    fontSize: 30,
                    title: '两位数的加法'
                },
                {
                    icon: 'cicon-level_22',
                    fontSize: 30,
                    title: '两位数的减法'
                },
                {
                    icon: 'cicon-level_23',
                    fontSize: 30,
                    title: '9以内的乘法'
                },
                {
                    icon: 'cicon-level_24',
                    fontSize: 30,
                    title: '9以内的除法'
                },
                {
                    icon: 'cicon-level_25',
                    fontSize: 30,
                    title: '乘法加法混合'
                },
                {
                    icon: 'cicon-level_26',
                    fontSize: 30,
                    title: '乘法减法混合'
                },
                {
                    icon: 'cicon-level_27',
                    fontSize: 30,
                    title: '除法加法混合'
                },
                {
                    icon: 'cicon-level_28',
                    fontSize: 30,
                    title: '除法减法混合'
                },
                {
                    icon: 'cicon-level_2_1',
                    fontSize: 30,
                    title: '综合练习'
                }
            ]
        },
        {
            title: '高级',
            sub: [{
                    icon: 'cicon-level_31',
                    fontSize: 30,
                    title: '两位数除一位数'
                },
                {
                    icon: 'cicon-level_32',
                    fontSize: 30,
                    title: '三位数除一位数'
                },
                {
                    icon: 'cicon-level_33',
                    fontSize: 30,
                    title: '四位数除一位数'
                },
                {
                    icon: 'cicon-level_34',
                    fontSize: 30,
                    title: '两位数乘两位数'
                },
                {
                    icon: 'cicon-level_35',
                    fontSize: 30,
                    title: '三位数减法'
                },
                {
                    icon: 'cicon-level_36',
                    fontSize: 30,
                    title: '三位数加法'
                },
                {
                    icon: 'cicon-level_3_1',
                    fontSize: 30,
                    title: '综合练习'
                }
            ]
        },
    ],
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