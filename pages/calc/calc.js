// pages/calc/calc.js
import {
    level,
    audio
} from './util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hour:0,
        minute:0,
        second:0,
        openVoice:true,
        currentWindowClicked: false,
        currentIndex: 0,
        calcList: [],
        progressCount:0,
        useranswer: "",
        isMoreOperation:false,
        count:0,
        score:0,
    },
    // 防抖用的
    timer: 1,
    // 取消定时器用的
    timer1:undefined,
    setVoice(){
        this.setData({
            openVoice:!this.data.openVoice
        })
    },
    userInput(e) {
        if (this.timer)
            clearTimeout(this.timeout);
            this.timer = setTimeout(() => {
            this._userInput(e);
        }, 600);
    },
    _userInput(e) {
        if (e.detail.value.length === this.data.calcList[this.data.currentIndex].answer.length) {
            this.setData({
                calcList: this.data.calcList.map((item, index) => {
                    if (index === this.data.currentIndex) {
                        item.useranswer = e.detail.value
                    }
                    return item
                })
            })
            // 这是最后一题了
            if (this.data.currentIndex+1 === Number(this.data.count)) {
                clearInterval(this.timer1);
                this.setData({
                    progressCount:((this.data.currentIndex+1) / this.data.count).toFixed(2)
                })
                return;
            }
            this.currentWindowClick();
        }
    },
    currentWindowClick() {
        this.setData({
            progressCount:((this.data.currentIndex+1) / this.data.count).toFixed(2),
            currentWindowClicked: !this.data.currentWindowClicked,
            isMoreOperation:this.data.calcList[this.data.currentIndex + 1].string.length > 8?true:false,
            useranswer: ""
        })
        setTimeout(() => {
            // 正确答题加分
            if (this.data.calcList[this.data.currentIndex].answer === this.data.calcList[this.data.currentIndex].useranswer) {
                this.setData({
                    score:this.data.score + 1
                })
                if (this.data.openVoice) {
                    audio.correctAudio.play();
                }
            }else{
                if (this.data.openVoice) {
                    audio.errorAudio.play();
                }
            }
            this.setData({
                currentWindowClicked: !this.data.currentWindowClicked,
                currentIndex: this.data.currentIndex + 1,
            })
        }, 1000)
    },
    // 生成对应数量对应类型的题目
    createCalcList:function ({calcType,count}) {
        const typeList = calcType.split('_');
        let realCalcList = []
        // 常规训练
        if (typeList.length === 2) {
            for (let index = 0; index < count; index++) {
                realCalcList.push(level[`level${typeList[1].charAt(0)}`][`level_${typeList[1].charAt(1)}`]());
            }
        }
        // 综合训练
        if (typeList.length === 3) {
            const args = {}
            // 基础的综合训练
            if (typeList[1] === '1') {
                args.level = 1
                args.levelCount = 5
            }
            // 进阶的综合训练
            if (typeList[1] === '2') {
                args.level = 2
                args.levelCount = 7
            }
            // 高级的综合训练
            if (typeList[1] === '3') {
                args.level = 3
                args.levelCount = 5
            }
            for (let index = 0; index < count; index++) {
                realCalcList.push(level[`level${args.level}`][`level_${Math.round(Math.random()*args.levelCount)+1}`]());
            }
        }
        return realCalcList
    },
    Interval(){
        this.timer1 = setInterval(() => {
            this.setData({
                second:this.data.second + 1
            },() => {
                if (this.data.second === 60) {
                    this.setData({
                        second:0,
                        minute:this.data.minute + 1
                    },() => {
                        if (this.data.hour === 60) {
                            this.setData({
                                minute:0,
                                hour:this.data.hour + 1
                            })
                        }
                    })
                }
            })
        },1000)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       const realCalcList = this.createCalcList(options)
        this.setData({
            count:Number(options.count),
            calcList: realCalcList,
            isMoreOperation:realCalcList[0].string.length > 8?true:false
        })
       this.Interval()
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