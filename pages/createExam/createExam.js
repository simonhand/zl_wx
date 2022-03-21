// pages/createExam/createExam.js
import {
    uploadImg,
    uploadImgToCos
} from "../../utils/uploadImg"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        urlParams: {},
        exercisesList: [],
        keyIndex: ["A", "B", "C", "D", "E"],
        currentIndex: 0,
        textArea: "", // 题干
        imgList: [], // 题干配图
        exercisesType: 0, // 0 代表选择题， 1 代表填空题
        keyList: [], // 答案
        correctExerciseType:false
    },
    ocrClick() {
        uploadImg(this, "../imgCut/imgCut?from=createExam&src=");
    },
    ChooseImage() {
        uploadImg(this, "../imgCut/imgCut?from=createExam1&src=");
        // uploadImg(this, "", true, (type) => {
        //     wx.chooseImage({
        //         count: 1,
        //         sizeType: ['original', 'compressed'],
        //         sourceType: [type],
        //         success: function (res) {
        //             var tempFilePaths = res.tempFilePaths;
        //             that.setData({
        //                 imgList: [...that.data.imgList, tempFilePaths[0]]
        //             })
        //         }
        //     })
        // })
    },
    DelImg(e) {
        this.setData({
            imgList: this.data.imgList.filter((item) => item !== this.data.imgList[e.currentTarget.dataset.index])
        })
    },
    typeChange(e) {
        this.setData({
            exercisesType: e.detail
        })
    },
    addKey() {
        const _keylist = this.data.keyList;
        this.setData({
            keyList: [..._keylist, {
                keyIndex: +new Date(),
                keyValue: "",
                trueKey: false,
            }]
        })
    },
    delKey(e) {
        const _index = e.currentTarget.dataset.index
        this.setData({
            keyList: this.data.keyList.filter((item) =>
                item.keyIndex !== this.data.keyList[_index].keyIndex
            )
        })
    },
    keyInput(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            keyList: this.data.keyList.map((item) => {
                if (this.data.keyList.indexOf(item) === index) {
                    item.keyValue = e.detail.value
                }
                return item
            })
        })
    },
    checkkeyChange(e) {
        const _index = e.currentTarget.dataset.index
        this.setData({
            keyList: this.data.keyList.map((item) => {
                if (this.data.keyList.indexOf(item) === _index) {
                    item.trueKey = !item.trueKey
                }
                return item
            })
        })
    },
    nextExercises() {
        let _nextExercises = this.data.exercisesList[this.data.currentIndex + 1]
        if (this.data.currentIndex < this.data.exercisesList.length) {
            // 这里要分清楚长度关系
        }else{
            this.setData({
                exercisesList: [...this.data.exercisesList, {
                    imgList: this.data.imgList,
                    exercisesType: this.data.exercisesType,
                    keyList: this.data.keyList,
                    textArea: this.data.textArea,
                    iscorrectExerciseType:this.isCorrectExercise(this)
                }],
                currentIndex: this.data.currentIndex + 1,
                textArea: _nextExercises?.textArea || "", // 题干
                imgList: _nextExercises?.imgList || "", // 题干配图
                exercisesType: _nextExercises?.exercisesList || 0, // 0 代表选择题， 1 代表填空题
                keyList: _nextExercises?._keylist || "",
                iscorrectExerciseType: _nextExercises?.iscorrectExerciseType || false
            })
        }
    },
    submit() {
        this.data.exercisesList.forEach((item) => {
            console.log("item", item);
            for (const iterator of item.imgList) {
                uploadImgToCos(iterator, (res) => {
                    console.log(res);
                })
            }
        })
    },
    numClick(e) {
        const index = e.currentTarget.dataset.index;
        const currentExercises = this.data.exercisesList[index];        
        this.setData({
            exercisesType: currentExercises?.exercisesType ,
            currentIndex: index,
            textArea: currentExercises?.textArea || "",
            imgList: currentExercises?.imgList || "",
            keyList: currentExercises?.keyList || ""
        })
    },
    isCorrectExercise(obj = undefined) {
        const that =  obj || this
        // 题干必填  配图选填 选择题选项必填答案必填 填空题答案必填
        if (that.data.textArea && that.data.keyList.length) {
            if (that.data.exercisesType === 0) {
                for (const item of that.data.keyList) {
                    if (item.trueKey) {
                        return true
                    }
                }
            } else {
                return true
            }
            return false
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.from === 'index') {
            this.setData({
                urlParams: JSON.parse(options.course)
            }, () => {
                console.log(this.data.urlParams);
            })
        }
        // if (options.from === 'imgCut') {
        //     console.log("decodeURI(options.ocrData)",decodeURI(options.ocrData));
        //     ocrData =JSON.parse(decodeURI(options.ocrData))
        //     this.setData({
        //         textArea:ocrData.items.reduce((pre,item) => pre + item.text,""),
        //     },() => {console.log(
        //         this.data.textArea
        //     );})
        // }
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