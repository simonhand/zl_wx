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
        navData: [{
                title: '基础',
                sub: [{
                        icon: 'cicon-calc1',
                        // name: 'navbar',
                        fontSize: 30,
                        title: '1-5加减法'
                    },
                    {
                        icon: 'cicon-calc2',
                        fontSize: 30,
                        title: '6-10加减法'
                    },
                    {
                        icon: 'cicon-calc3',
                        fontSize: 30,
                        title: '10以内加法'
                    },
                    {
                        icon: 'cicon-calc3',
                        fontSize: 30,
                        title: '10以内加法'
                    },
                    {
                        icon: 'cicon-calc3',
                        fontSize: 30,
                        title: '10以内加法'
                    },
                ]
            },
            {
                title: '进阶',
                sub: [{
                        icon: 'cicon-calc4',
                        fontSize: 30,
                        title: '30以内退位减法'
                    },
                    {
                        icon: 'cicon-calc5',
                        fontSize: 30,
                        title: '300以内加减法'
                    }
                ]
            },
            {
                title: '高级',
                sub: [{
                        icon: 'cicon-calc6',
                        fontSize: 30,
                        title: '100内加减'
                    },
                    {
                        icon: 'cicon-calc7',
                        fontSize: 30,
                        title: '表内乘法'
                    },
                    {
                        icon: 'cicon-calc8',
                        fontSize: 30,
                        title: '乘法加减'
                    },
                    {
                        icon: 'cicon-calc9',
                        fontSize: 24,
                        title: '100内混合加减'
                    },
                    {
                        icon: 'cicon-calc10',
                        fontSize: 30,
                        title: '表内除法'
                    },
                    {
                        icon: 'cicon-calc11',
                        fontSize: 30,
                        title: '混合运算'
                    }
                ]
            },
        ],
    },
    inputClick() {
        this.setData({
            needMoveTop: true,
        })
    },
    handleOk() {
        const count = this.data.calcCount;
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
        },() => {
            wx.navigateTo({
                url: '../calc/calc?calcType=' + calctype + "&count=" + count,
            })
            calctype = ''
        })
    },
    handleClose() {
        this.setData({
            modalVisible: false
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