// pages/calc/calc.js
import {
    level1,
    boo
} from './util'
import {
    debounce,
    throttle
} from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentWindowClicked: false,
        currentIndex: 0,
        calcList: [],
        useranswer: "",
    },
    timer: 1,
    userInput(e) {
        if (this.timer)
            clearTimeout(this.timeout);
            this.timer = setTimeout(() => {
            this._userInput(e);
        }, 600);
        // this.$apply();
        // throttle(this._userInput(e),1000)
    },
    _userInput(e) {
        console.log("+++++++", e);
        if (e.detail.value.length === this.data.calcList[this.data.currentIndex].answer.length) {
            this.setData({
                calcList: this.data.calcList.map((item, index) => {
                    if (index === this.data.currentIndex) {
                        item.useranswer = e.detail.value
                    }
                    return item
                })
            })
            this.currentWindowClick();
        }
    },
    currentWindowClick() {
        this.setData({
            currentWindowClicked: !this.data.currentWindowClicked,
            useranswer: ""
        })
        setTimeout(() => {
            this.setData({
                currentWindowClicked: !this.data.currentWindowClicked,
                currentIndex: this.data.currentIndex + 1
            })
        }, 1000)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        let realCalcList = [];
        for (let index = 0; index < 20; index++) {
            realCalcList.push(level1.level_1());
        }
        this.setData({
            calcList: realCalcList
        })
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