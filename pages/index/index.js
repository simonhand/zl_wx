import {
    getTeacherCourse
} from '../../commonservice/courseservice'
import {
    haveUserInfo
} from '../../utils/util'
import {
    getWxStorage
} from '../../utils/updateWxstorage'
import {
    $Message,
    $Toast
} from '../../components/Iview/base/index'
import {
    examIndex,
    getNotifyByUser
} from './services.js'
// index.js
// 获取应用实例
const app = getApp();
let selectedIndex = -1;
let queryCourse = [];
Page({
    data: {
        fromBtn:'',
        swiperList: [{
                img: "/static/img/welcome.gif"
            },
            {
                img: "https://static-1305980897.cos.ap-nanjing.myqcloud.com/calc.gif"
            }
        ],
        loading: false,
        userInfo: {},
        userType:-1,
        modelVisible: false,
        canIUseGetUserProfile: false,
        teacherCourseList: [],
        hasUserInfo: false,
        exerciseName:"",
        inputIndex:-1,
        exerciseCount: 0,
        NotifyCount: 0,
        navData: [
            [{
                icon: 'cicon-level_23',
                fontSize: 30,
                title: '创建小测验'
            }, {
                icon: 'cicon-level_22',
                fontSize: 30,
                title: '创建通知'
            }, {
                icon: 'cicon-level_21',
                fontSize: 30,
                title: '我的课程'
            }],
            [{
                    icon: 'cicon-level_11',
                    fontSize: 30,
                    title: '口算'
                },
                {
                    icon: 'cicon-level_12',
                    fontSize: 30,
                    title: '我的课程'
                }
            ]
        ],
        myNotify: {
            icon: 'cicon-level_13',
            fontSize: 30,
            title: '我的通知'
        },
        myExam:{
            icon: 'cicon-level_14',
            fontSize: 30,
            title: '我的测验'
        }
    },
    // 页面显示触发
    onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            })
        }
    },
    // 事件处理函数
    swiperClick(e){
        if (e.detail === 1) {
            this.calcClick();
        }
    },
    inputClick(){
        this.setData({
            inputIndex:1
        })
    },
    itemCLick(e) {
        // 未登录
        if (this.data.userType === -1) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
            return
        }
        switch (e.currentTarget.dataset.navdataindex) {
            case 0:
                if (this.data.userType) {
                    $Message({
                        content:"您目前是学生身份,如需更换，请在个人中心修改",
                        type:"warning"
                    }) 
                    return 
                }
                switch (e.currentTarget.dataset.itemindex) {
                    case 0:
                        this.handleOpenModal("createExam");
                        break;
                    case 1:
                        this.handleOpenModal("createNotify");
                        break;
                    case 2:
                        wx.navigateTo({
                            url: "/pages/myclass/myclass"
                        })
                        break;
                    default:
                        $Message({
                            content: "未知选项"
                        })
                        break;
                }
                break;
            case 1:
                if (!this.data.userType) {
                    $Message({
                        content:"您目前是教师身份,如需更换，请在个人中心修改",
                        type:"warning"
                    }) 
                    return 
                }
                switch (e.currentTarget.dataset.itemindex) {
                    case 0:
                        this.calcClick();
                        break;
                    case 1:
                        wx.navigateTo({
                            url: "/pages/myclass/myclass"
                        })
                        break;
                    case 3:
                        this.handleNavigate();
                        break;
                    case 4:
                        this.handleOpenModalToExam();
                        break;
                    default:
                        $Message({
                            content: "未知选项"
                        })
                        break;
                }
                break;
            default:
                break;
        }
    },
    handleNavigate() {
        wx.navigateTo({
            url: '/pages/readNotify/readNotify',
        })
    },
    calcClick() {
        wx.navigateTo({
            url: '../calcIndex/calcIndex',
        })
    },
    loginClick() {
        wx.navigateTo({
            url: '../login/login',
        })
    },
    bindViewTap() {
        wx.navigateTo({
            url: '../home/home'
        })
    },
    handleOpenModalToExam() {
        wx.navigateTo({
            url: '../examIndex/examIndex',
        })
    },
    handleOpenModal(type) {
        if (type === 'createNotify') {
            this.setData({
                fromBtn:"createNotify"
            })
        }
        if (type === 'createExam') {
            this.setData({
                fromBtn:"createExam"
            })
        }
        // 弹出Modal窗
        haveUserInfo() && getTeacherCourse(app.globalData.userInfo._id).then(
            (res) => {
                queryCourse = res.data.data.queryCourse
                this.setData({
                    teacherCourseList: res.data.data.queryCourse.map((item) => [item.courseName]),
                    modelVisible: true
                })
            }
        )
    },
    // 点击列表中的item触发
    selectItemClick(e) {
        selectedIndex = e.detail.index;
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        console.log(e)
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    handleClose() {
        this.setData({
            modelVisible: false,
            inputIndex:-1
        });
    },
    handleOk() {
        if (selectedIndex === -1) {
            $Message({
                content: "请选择对应课程",
                type: "warning"
            })
            return;
        }
        if (this.data.exerciseName === '' && this.data.fromBtn === 'createExam') {
            $Message({
                content:"请输入测试名称",
                type:"warning"
            })
            return;
        }
        wx.navigateTo({
            // url:``
            url: `..${this.data.fromBtn=== 'createExam'?'/createExam/createExam':'/'+this.data.fromBtn+'/'+this.data.fromBtn}?from=index&course=` + JSON.stringify(queryCourse[selectedIndex]) + `&exerciseName=${this.data.exerciseName}`,
            // url:"../createExam/createExam?from=index&course=" + JSON.stringify(queryCourse[selectedIndex]),
            success: () => {
                this.setData({
                    modelVisible: false
                })
            }
        })
        // this.setData({
        //     fromBtn:""
        // })
    },
    onLoad(options) {
    
    },
    onShow() {
        // 我愿称之为天坑 ！！！
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0 // 数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，消息中心页面为1
            })
        }
        const that = this;
        // 请求有多少个测验未做
        // 这里之所以从缓存里拿数据，按理说全局变量userinfo数据是和缓存中同步的，但是从缓存中拿是异步的又因为这是首页这个时候直接从usereinfo拿是undefined
        getWxStorage('user').then((res) => {
            console.log(res.data.userType);
            this.setData({
                userType:res.data.userType
            },() => {
                console.log("我更新了usertype",this.data.userType);
            })
            return Promise.all([examIndex(res.data.course, res.data._id), getNotifyByUser(res.data)])
        }).catch((e) => {
            that.setData({
                exerciseCount: 0,
                NotifyCount: 0,
                userType: -1
            })
        }).then((res) => {
            that.setData({
                exerciseCount: res[0].data.data.examIndex[0].exerciseCount,
                NotifyCount: res[1].data.data.getNotify[0].NotifyCount
            })
        })
        const helpNavigate = app.globalData.helpNavigate
        if (helpNavigate.status === "success") {
            if (helpNavigate.from === "exam") {
                $Toast({
                    content: "测验已成功提交",
                    type: "success"
                })
            }
            if (helpNavigate.from === "createExam") {
                $Toast({
                    content: "测验已成功创建",
                    type: "success"
                })
            }
            if (helpNavigate.from === "createNotify") {
                $Toast({
                    content: `${helpNavigate.msg}的通知已成功创建`,
                    type: "success"
                })
            }
            app.globalData.helpNavigate = {
                from: "",
                status: ""
            };
        }
    }
})