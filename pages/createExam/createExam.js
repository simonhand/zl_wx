// pages/createExam/createExam.js
import {
    uploadImg
} from "../../utils/uploadImg"
let ocrData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        urlParams: {},
        exercisesList:[],
        currentExercises:{},
        textArea:"",
        imgList:[],
        exercisesType:0,
        keyList:[],
        keyIndex:["A","B","C","D","E"],
        currentIndex:0,
    },
    ocrClick() {
        uploadImg(this, "../imgCut/imgCut?from=createExam&src=");
    },
    ChooseImage(){
        const that = this
        uploadImg(this,"",true, (type) => {
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: [type],
                success: function (res) {
                  var tempFilePaths = res.tempFilePaths;
                  that.setData({
                      imgList:[...that.data.imgList,tempFilePaths]
                  })
                }
              })
        })
    },
    DelImg(e){
        this.setData({
            imgList:this.data.imgList.filter((item) => item !== this.data.imgList[e.currentTarget.dataset.index])
        })
    },
    typeChange(e){
        this.setData({
            exercisesType:e.detail
        })
    },
    addKey(){
        const _keylist = this.data.keyList;
        this.setData({
            keyList:[..._keylist,{ index: _keylist.length , keyIndex: this.data.keyList[_keylist.length], keyValue:"" } ]
        })
    },
    delKey(e){
        console.log(e);
        this.setData({
            keyList:this.data.keyList.filter((item) => item.index !== this.data.keyList[e.currentTarget.dataset.index].index)
        })
    },
    keyInput(e){
        const index = e.currentTarget.dataset.index
        this.setData({
            keyList: this.data.keyList.map((item) => {
                if (item.index === index) {
                    item.keyValue = e.detail.value
                }
                return item
            })
        })
    },
    nextExercises(){
        this.setData({
            exercisesList:[...this.data.exercisesList,{ imgList:this.data.imgList, }]
        })
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