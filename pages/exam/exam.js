// pages/createExam/createExam.js
import {
    $Message
} from '../../components/Iview/base/index'
import {
    getExam,
    submitExam
} from "./service"
import {
    deepClone
} from "../../utils/util.js"
const app = getApp()
let excrseInfo = {}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        target:false,
        tips:"确认提交？",
        isLoading: false,
        loaingString: null,
        userType: -1,
        urlParams: {},
        exercisesList: [{}],
        keyIndex: ["A", "B", "C", "D", "E"],
        currentIndex: 0,
        userInputKeyList: [],
        isCorrectUserInputKey:[],
        keyList: [], // 答案
        correctExerciseType: false
    },
    viewImage(e) {
        wx.previewImage({
            current: e.currentTarget.dataset.imgurl,
            urls: this.data.exercisesList[this.data.currentIndex].imgList
        })
    },
    keyInput(e) {
        this.setData({
            userInputKeyList: this.data.userInputKeyList.map((item, index) => {
                if (index === this.data.currentIndex) {
                    item.forEach((_item, _index) => {
                        if (_index === e.currentTarget.dataset.index) {
                            item[_index].keyValue = e.detail.value
                        }
                    })
                }
                return item
            })
        },this.iscorrectKey())
    },
    checkkeyChange(e){
        const _index = e.currentTarget.dataset.index
        this.setData({
            userInputKeyList:this.data.userInputKeyList.map((item,index) => {
                if (index === this.data.currentIndex) {
                    item[_index].trueKey = !item[_index].trueKey
                }
                return item
            })
        },this.iscorrectKey())
    },
    iscorrectKey(){
        const currentIndex = this.data.currentIndex;
        const list =  this.data.userInputKeyList[currentIndex]
        const that = this
        function foo(type) {
            that.setData({
                isCorrectUserInputKey:that.data.isCorrectUserInputKey.map((item,_index) => {
                  if(_index === currentIndex){
                      item = type
                  }   
                  return item
                })
            })
        }
        for (const index in list) {
            if (this.data.exercisesList[currentIndex].exercisesType === 0) {
                if (list[index].trueKey) {
                    foo(true);
                    return
                }
            }else{
                if (list[index].keyValue) {
                    foo(true);
                    return
                }
            }
        }
        foo(false)
    },
    nextExercises() {
        if (this.data.currentIndex === this.data.exercisesList.length - 1) {
            $Message({
                content:"已经事最后一题了",
                type:"warning"
            })
            return;
        }
        this.setData({
            currentIndex:this.data.currentIndex + 1
        })
    },
    numClick(e) {
        this.setData({
            currentIndex: e.currentTarget.dataset.index
        })
    },
    submit() {
        for (const item of this.data.isCorrectUserInputKey) {
            this.setData({
                tips:"确认提交？"
            })
            if(!item){
               this.setData(
                 {tips:"你仍有题目未作答，确认提交吗"},
                 this.setData({
                     target:true
                 })
               )
            }else{
                this.setData({
                    target:true
                })
            }
        }
    },
    modalOK(e){
        if (e.detail.confirm) {
            // 自动评分
            let exercisesScoreRecord = 0; // 统计得了多少分，一题一分
            let exercisesCorrectRecord = []; // 统计哪些题目对的哪些题目错的
            const exercisesList =  this.data.exercisesList
            const userInputKeyList =  this.data.userInputKeyList
            function socre(index,attr) {
                let flag = false
                    for (let _index = 0;  _index < exercisesList[index].keyList.length; _index++) {
                        if(exercisesList[index].keyList[_index][attr] !== userInputKeyList[index][_index][attr]){
                            break;
                        }
                        if (_index === exercisesList[index].keyList.length - 1) {
                            flag = true
                        }
                    }
                    if (flag) {
                        exercisesCorrectRecord.push(true);
                        exercisesScoreRecord += 1;
                    }else{
                        exercisesCorrectRecord.push(false);
                    }
            }
            for (let index =0 ; index < exercisesList.length; index ++) {
                if (exercisesList[index].exercisesType === 0) {
                    socre(index,'trueKey')
                }else{
                    socre(index,'keyValue')
                }
            }
            submitExam({...excrseInfo,exerciseId:excrseInfo._id,exercisesScoreRecord,exercisesCorrectRecord,userInputKeyList,userId:app.globalData.userInfo._id})
            app.globalData.helpNavigate = { from:"exam",status:"success" }
            wx.switchTab({
              url: '/pages/index/index',
            })
        }else{
            this.setData({
                target:false
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.from === 'examIndex') {
            getExam(options.id).then((res) => {
                const exerciseList = res.data.data.getExam.exerciseList.map((item) => {
                    item.imgList.forEach((_item, index) => {
                        item.imgList[index] = 'https://' + _item
                    })
                    return item
                })
                excrseInfo = {
                    ...res.data.data.getExam,
                    exerciseList
                }
                this.setData({
                    exercisesList: [...excrseInfo.exerciseList],
                    userInputKeyList: deepClone(exerciseList).map((item) => {
                        // 选择题
                        if (item.exercisesType === 0) {
                            item.keyList.forEach((_item, index) => {
                                item.keyList[index].trueKey = false
                            })
                            return item.keyList
                        }
                        // 填空题
                        if (item.exercisesType === 1) {
                            item.keyList.forEach((_item, index) => {
                                item.keyList[index].keyValue = ""
                            })
                            return item.keyList
                        }
                    }),
                    isCorrectUserInputKey:exerciseList.map(() => false)
                })
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setData({
            userType: app.globalData.userInfo.userType
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