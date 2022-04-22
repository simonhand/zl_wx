// pages/calc/calc.js
import {
    randomNum,
    randomNumBetween
} from "../../utils/random"
import {
    randomKey
} from './util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentWindowClicked: false,
        // selecedtNum: null,
        // operand_1: null,
        // operand_2: null,
        // solvtion: null,
        // userClickNum: null,
        // solvtionString: '',
        // userSolvtionString: '',
        // score: 0,
        // num_of_pre: 1,
        // solvtionLen: null,
        // num_list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        // symbol: null,
        // symbolType: [{
        //         type: "add",
        //         url: "../../assets/calc/add.png"
        //     },
        //     {
        //         type: "subtract",
        //         url: "../../assets/calc/subtract.png"
        //     },
        //     {
        //         type: "multiply",
        //         url: "../../assets/calc/multiply.png"
        //     },
        //     {
        //         type: "divide",
        //         url: "../../assets/calc/divide.png"
        //     },
        // ],
    },
    currentWindowClick() {
        this.setData({
            currentWindowClicked: !this.data.currentWindowClicked
        })
        setTimeout(() => {
            this.setData({
                currentWindowClicked: !this.data.currentWindowClicked
            })
        },1000)
    },
    numClick(e) {
        const props = e.currentTarget.dataset;
        console.log("userClickNum", this.data.solvtionLen);
        // this.data.selecedtNum = props.index;
        if (props.num != "del") {
            this.setData({
                selecedtNum: props.index,
                userSolvtionString: this.data.userSolvtionString + props.num,
            });
        } else {
            this.setData({
                selecedtNum: props.index,
                userSolvtionString: this.data.userSolvtionString.substr(0, this.data.userSolvtionString.length - 1)
            })
        }
        if (this.data.solvtionLen === this.data.userSolvtionString.length) {
            if (this.data.userSolvtionString === this.data.solvtionString) {
                this.setData({
                    score: this.data.score + 1,
                    userSolvtionString: '',
                })
            } else {
                this.setData({
                    userSolvtionString: '',
                })
            }
            const {
                solvtion
            } = randomKey(this);
            this.setData({
                num_of_pre: this.data.num_of_pre + 1,
                solvtion,
                solvtionString: solvtion.toString(),
                solvtionLen: solvtion.toString().length,
            })
        }
        setTimeout(() => {
            this.setData({
                selecedtNum: null,
            })
        }, 100)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const {
            solvtion
        } = randomKey(this);
        this.setData({
            solvtion,
            solvtionString: solvtion.toString(),
            solvtionLen: solvtion.toString().length,
        })
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