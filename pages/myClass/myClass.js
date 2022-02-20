// pages/personalInfo/personalInfo.js
import {
    randomString
} from '../../utils/random'
import { createClass,getTeacherCourse } from './service'
import { $Message  } from '../../components/Iview/base/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //小程序没有refs，所以只能用动态布尔值控制关闭
        userType: 0,
        inputIndex: "-1",
        swiperout_list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        modalVisible: false,
        invitationCode:"",
        teacherName: "", // 创建课程教师名称
        className:"",  // 创建课程名称
        courseList:[],
        actions2: [{
            name: '删除',
            color: '#ed3f14'
        }],
        actions: [{
            name: '退出课程',
            color: '#fff',
            fontsize: '20',
            width: 100,
            icon: 'close',
            background: '#FF7F00'
        }]
    },
     // input事件函数
    // 事件函数触发
    copyClick(e) {
        const that = this
        const index = e.currentTarget.dataset.index;
        wx.setClipboardData({
          data: that.data.courseList[index].invitationCode,
        })
    },
    inputClick: function (e) {
        const props = e.currentTarget.dataset;
        this.setData({
            inputIndex: props.index,
        })
    },
    addClick() {
        this.setData({
            modalVisible: true
        })
    },
    handleOk() {
        // userType === 0代表老师反之是学生
        if (this.data.userType) {
            // 学生端的处理
            
            console.log(this.data.invitationCode);
        }else{
            // 教师端的处理
            const user = getApp().globalData.userInfo;
            const palyLoad = {
                createrAvatarUrl:user.avatarUrl,
                createrId:user._id,
                courseName:this.data.className,
                teacherName:this.data.teacherName,
                invitationCode:randomString(6)
            }
            createClass(palyLoad,this).then((value) => {
                // console.log(value);
                this.setData({
                    modalVisible: false,
                    teacherName:"",
                    className:"",
                    inputIndex:"-1",
                    courseList:[...this.data.courseList, {...value.data.data.createCourse,students:[]}]
                })
                $Message ({
                    content:"课程创建成功",
                    type:"success"
                })
            }).catch( (error) => {
                console.log(error);
                $Message ({
                    content:"课程创建失败",
                    type:"error"
                })
            });;
        }
    },
    handleClose() {
        this.setData({
            modalVisible: false,
            inputIndex:"-1"
        })
    },
    changeUserTypeClick() {
        console.log(randomString(6));
        const that = this
        this.setData({
            userType: that.data.userType === 0 ? 1 : 0
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
        getTeacherCourse(getApp().globalData.userInfo ._id).then(
            ( res ) => {
               this.setData({
                   courseList:[...res.data.data.queryCourse]
               })

            }
        )
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