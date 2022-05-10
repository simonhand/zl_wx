// pages/createExam/createExam.js
import {
    uploadImg,
    uploadImgToCos
} from "../../utils/uploadImg"
import {
    zlMessage
} from '../../components/Iview/base/index'
import {
    createExerciseRequset
} from "./service"
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading:false,
        loaingString: null,
        userType: -1,
        urlParams: {},
        exercisesList: [{}],
        keyIndex: ["A", "B", "C", "D", "E"],
        currentIndex: 0,
        exercisesIndex: "", // 题目的唯一标识符
        textArea: "", // 题干
        imgList: [], // 题干配图
        exercisesType: 0, // 0 代表选择题， 1 代表填空题
        keyList: [], // 答案
        correctExerciseType: false,
        bgVal:"",
        msgVal:"",
        isShow:false
    },
    ocrClick() {
        uploadImg(this, "../imgCut/imgCut?from=createExam&src=");
    },
    ChooseImage() {
        uploadImg(this, "../imgCut/imgCut?from=createExam1&src=");
    },
    DelImg(e) {
        this.setData({
            imgList: this.data.imgList.filter((item) => item !== this.data.imgList[e.currentTarget.dataset.index])
        })
    },
    viewImage(e) {
        wx.previewImage({
            current: e.currentTarget.dataset.url,
            urls: this.data.imgList
        })
    },
    typeChange(e) {
        this.setData({
            exercisesType: e.detail
        })
        this.checkExercise();
    },
    addKey() {
        const _keylist = this.data.keyList;
        this.setData({
            keyList: [..._keylist, {
                keyIndex: (+new Date()).toString(),
                keyValue: "",
                trueKey: false,
            }]
        })
        this.checkExercise();
    },
    delKey(e) {
        const _index = e.currentTarget.dataset.index
        this.setData({
            keyList: this.data.keyList.filter((item) =>
                item.keyIndex !== this.data.keyList[_index].keyIndex
            )
        })
        this.checkExercise();
    },
    keyInput(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            keyList: this.data.keyList.map((item) => {
                if (this.data.keyList.indexOf(item) === index) {
                    item.keyValue = e.detail.value.toString()
                }
                return item
            })
        })
        this.checkExercise();
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
        this.checkExercise();
    },
    nextExercises(from = 'next') {
        const that = this;
        const index = this.data.currentIndex;
        const newExercisesList = this.data.exercisesList.map((item, index) => {
            if (index === that.data.currentIndex) {
                item.iscorrectExerciseType = that.isCorrectExercise(that)
                item.textArea = that.data.textArea;
                item.imgList = that.data.imgList;
                item.keyList = that.data.keyList;
                item.exercisesType = that.data.exercisesType;
                item.exercisesIndex = item?.exercisesIndex || (+new Date()).toString()
            }
            return item;
        })
        // 这个下一题是创建下一题 并保存当前的题目
        const date = +new Date();
        if (from !== "submit") {
            this.setData({
                // 保存当前题目
                exercisesList: newExercisesList,
                // 创建下一题
                currentIndex: this.data.currentIndex + 1,
                textArea: this.data?.exercisesList[index + 1]?.textArea || "",
                imgList: this.data?.exercisesList[index + 1]?.imgList || [],
                keyList: this.data?.exercisesList[index + 1]?.keyList || [],
                exercisesType: this?.data.exercisesList[index + 1]?.exercisesType || 0,
                exercisesIndex: this?.data.exercisesList[index + 1]?.exercisesIndex || date.toString(),
            })
        }
        if (index === this.data.exercisesList.length - 1 && from !== 'submit') {
            this.setData({
                exercisesList: [...this.data.exercisesList, {}]
            })
        }
    },
    numClick(e) {
        const preExercises = this;
        // 先保存当前的题目 再跳转
        this.setData({
            exercisesList: this.data.exercisesList.map((item, index) => {
                if (index === this.data.currentIndex) {
                    item.textArea = preExercises.data.textArea;
                    item.imgList = preExercises.data.imgList;
                    item.keyList = preExercises.data.keyList;
                    item.exercisesType = preExercises.data.exercisesType;
                    item.iscorrectExerciseType = preExercises.isCorrectExercise(preExercises);
                }
                return item
            })
        })
        const index = e.currentTarget.dataset.index;
        const currentExercises = this.data.exercisesList[index];
        this.setData({
            exercisesIndex: currentExercises?.exercisesIndex,
            exercisesType: currentExercises?.exercisesType,
            currentIndex: index,
            textArea: currentExercises.textArea || "",
            imgList: currentExercises?.imgList || "",
            keyList: currentExercises?.keyList || ""
        })
    },
    submit() {
        this.nextExercises('submit')
        for (const iterator of this.data.exercisesList) {
            if (!iterator.iscorrectExerciseType) {
                $zlMessage(this,{
                    content: "存在不符合规则的题目",
                    type: "wraning"
                })
                return
            }
        }
        // console.log("exercisesList", JSON.parse(JSON.stringify(this.data.exercisesList)));
        const allImgList = [];
        this.data.exercisesList.forEach(item => {
            for (const iterator of item.imgList) {
                allImgList.push(iterator)
            }
        })
        const promisListImg = allImgList.map(item => new Promise((reslove, reject) => {
            uploadImgToCos(item, res => {
                reslove(res.Location)
            })
        }))
        this.setData({
            isLoading:true,
            loaingString:"正在创建测验"
        })
        Promise.all(promisListImg).then((res) => {
            // console.log("res这个搞完就睡觉",res);
            const newExercisesList = this.data.exercisesList.map(item => {
                const newImgList = item.imgList.map(_item => {
                    for (const iterator of res) {
                        if ( iterator.split('/').pop() === _item.split('/').pop()) {
                            return iterator
                        } 
                    }
                })
                return {...item,imgList:newImgList}
            })
            // console.log("newExercisesList",newExercisesList);
            createExerciseRequset({...this.data.urlParams,course_id:this.data.urlParams._id,exerciseList:newExercisesList});
            this.setData({
                isLoading:false,
                loaingString:null
            })
            app.globalData.helpNavigate = { from:"createExam",status:"success"}
            wx.switchTab({
              url: '../index/index',
            })
        }).catch((error) => {
            $zlMessage({
                content:"创建失败" + error,
                type:"error"
            })
        })
        
    },
    checkExercise(){
        this.setData({
            exercisesList:this.data.exercisesList.map((item,index) => {
                if (index === this.data.currentIndex) {
                    item.iscorrectExerciseType = this.isCorrectExercise(this)
                }
                return item
            })
        })
    },
    isCorrectExercise(obj = undefined) {
        const that = obj || this
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
                urlParams: {...JSON.parse(options.course),exerciseName:options.exerciseName}
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