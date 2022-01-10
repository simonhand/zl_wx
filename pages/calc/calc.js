// pages/calc/calc.js
import { randomNum }  from "../../utils/random"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        selecedtNum: null,
        operand_1:null,
        operand_2:null,
        solvtion:null,
        userClickNum:null,
        solvtionString: '',
        userSolvtionString:'',
        solvtionLen:null,
        num_list: [1,2,3,4,5,6,7,8,9],  
    },

    numClick(e){
        const props = e.currentTarget.dataset;
        console.log("props",props);
        console.log("userClickNum",this.data.solvtionLen);
        // this.data.selecedtNum = props.index;
        if (props.num != "del") {
            this.setData({ 
                selecedtNum : props.index ,
                userSolvtionString : this.data.userSolvtionString + props.num,
            });
        }else{
            this.setData({
                selecedtNum : props.index ,
                userSolvtionString: this.data.userSolvtionString.substr(0,this.data.userSolvtionString.length - 1)
            })
        }
        setTimeout( () => {
            this.setData({            
                selecedtNum : null,
            })
        },100)
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
        this.setData({
            operand_1: randomNum(2),
            operand_2: randomNum(2),
        })
        this.setData({
            solvtion: this.data.operand_1 + this.data.operand_2,
            solvtionString: ( this.data.operand_1 + this.data.operand_2 ).toString(),
            solvtionLen:  ( this.data.operand_1 + this.data.operand_2 ).toString().length,
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