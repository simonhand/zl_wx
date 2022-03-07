// pages/personalInfo/personalInfo.js
import {
    randomString
} from '../../utils/random'
import {
    addCourse,
    createClass,
    getTeacherCourse,
    getStudentCourse,
    deleteCourse,
} from './service'
import {
    $Message
} from '../../components/Iview/base/index'
import {
    updateUserInfo
} from '../../utils/updateWxstorage'

const app = getApp();

let swipeoutIndex;
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
        tipVisible: false,
        invitationCode: "",
        studentsCourseList: [],
        courseList: [],
        teacherName: "", // 创建课程教师名称
        className: "", // 创建课程名称
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
        }],
        actions5: [{
                name: '取消'
            },
            {
                name: '删除',
                color: '#ed3f14',
                loading: false
            }
        ]
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
        const user = app.globalData.userInfo;
        // userType === 0代表老师反之是学生
        if (this.data.userType) {
            // 学生端的处理
            // 先检测该学生是否添加过该课程
            for (const iterator of app.globalData.userInfo.course) {
                if (iterator.invitationCode === this.data.invitationCode) {
                    $Message({
                        content: "该课程已被添加",
                        type: "error"
                    });
                    return;
                }
            }
            addCourse({
                _id: user._id,
                invitationCode: this.data.invitationCode
            }).then(
                (value) => {
                    if (!value.data.data.addCourse) {
                        $Message({
                            content: "该课程不存在",
                            type: "error"
                        })
                        return
                    }
                    this.setData({
                        studentsCourseList: [...this.data.studentsCourseList, {
                            ...value.data.data.addCourse
                        }],
                        modalVisible: false
                    })
                    app.globalData.userInfo.course.push({
                        invitationCode: value.data.data.addCourse.invitationCode
                    });
                    updateUserInfo(app.globalData.userInfo);
                    $Message({
                        content: "添加成功",
                        type: "success"
                    })
                }
            ).catch((e) => {
                console.log("error", e);
                $Message({
                    content: "添加失败",
                    type: "error"
                })
            })
        } else {
            // 教师端的处理

            const palyLoad = {
                createrAvatarUrl: user.avatarUrl,
                createrId: user._id,
                courseName: this.data.className,
                teacherName: this.data.teacherName,
                invitationCode: randomString(6)
            }
            createClass(palyLoad, this).then((value) => {
                console.log(value);
                // console.log(value);
                this.setData({
                    modalVisible: false,
                    teacherName: "",
                    className: "",
                    inputIndex: "-1",
                    courseList: [...this.data.courseList, {
                        ...value.data.data.createCourse,
                        students: []
                    }]
                })
                $Message({
                    content: "课程创建成功",
                    type: "success"
                })
            }).catch((error) => {
                console.log(error);
                $Message({
                    content: "课程创建失败",
                    type: "error"
                })
            });;
        }
    },
    handleClose() {
        this.setData({
            modalVisible: false,
            inputIndex: "-1"
        })
    },
    // 退出课程确认
    handleOk1() {
        let checkCourse = this.data.userType === 1 ? this.data.studentsCourseList[swipeoutIndex] : this.data.courseList[swipeoutIndex];
        deleteCourse(app.globalData.userInfo._id, this.data.userType, checkCourse._id, checkCourse.invitationCode).then(
            (res) => {
                if (this.data.userType) {
                    // 学生端退课处理
                    this.setData({
                        tipVisible: false,
                        studentsCourseList: this.data.studentsCourseList.filter((item) => item._id !== checkCourse._id)
                    })
                    app.globalData.userInfo.course = this.data.studentsCourseList
                    updateUserInfo(app.globalData.userInfo)
                    $Message({
                        content: "退出成功",
                        type: "success"
                    })
                }else{
                    this.setData({
                        tipVisible: false,
                        courseList: this.data.courseList.filter((item) => item._id !== checkCourse._id)
                    })
                    $Message({
                        content: "退出成功",
                        type: "success"
                    })
                }
            }
        ).catch((e) => {
            console.log("error", e);
            $Message({
                content: "出现错误",
                type: "error"
            })
        })
    },
    handleClose1() {
        this.setData({
            tipVisible: false
        })
    },
    changeUserTypeClick() {
        console.log(randomString(6));
        const that = this
        this.setData({
            userType: that.data.userType === 0 ? 1 : 0
        })
    },
    swipeoutClick(e) {
        this.setData({
            tipVisible: true,
        })
        swipeoutIndex = e.currentTarget.dataset.index
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

        if (this.data.userType) {
            // 学生角色处理方法
            getStudentCourse(app.globalData.userInfo._id).then((res) => {
                console.log(res);
                this.setData({
                    studentsCourseList: res.data.data.queryStudentCourse
                })
            })
        } else {
            // 教师处理方法
            getTeacherCourse(app.globalData.userInfo._id).then(
                (res) => {
                    this.setData({
                        courseList: [...res.data.data.queryCourse]
                    })
                }
            )
        }
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