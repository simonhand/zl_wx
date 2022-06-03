// logs.js
import {
    zlMessage,
} from '../../components/Iview/base/index'
import {
    calcType
} from '../../config/secret'
import {
    zlDecodeList
} from "../../utils/util"
import {
    formateDate
} from "../../utils/zlFormatDate"
import {
    getTabTotal,
    getExerciseRecord,
    getNotifyRecord,
    getCalcRecord,
    deleteCalcRecord,
    getDoneExerciseStudents,
    getReadNotifyStudents,
    
} from './services'
const app = getApp()
Page({
    data: {
        userType:-1,
        tabIndex: 0,
        modalVisible: false,
        teacherModalVisible:false,
        scrollUpdateing: false,
        recordList: [
            [],
            [],
            []
        ],
        haveMoreData: true,
        tabTotal: {},
        clickItem: {},
        isLoading: false,
        isGetMoreData: false,
        actions: [{
            name: '删除记录',
            color: '#fff',
            fontsize: '20',
            width: 100,
            icon: 'delete',
            background: '#FF7F00'
        }],
        doneExerciseStudents:[],
        readNotifyStudents:[],
        bgVal:"",
        msgVal:"",
        isShow:false
    },
    modalConfirm() {
        this.setData({
            modalVisible: false,
            teacherModalVisible:false
        })
    },
    cardClick(e) {
        if (this.data.userType===0) {
            if (this.data.tabIndex === 0) {
                this.setData({
                    teacherModalVisible:true
                });
                getDoneExerciseStudents(this.data.recordList[0][e.currentTarget.dataset.index].course_id,this.data.recordList[0][e.currentTarget.dataset.index]._id).then((res) => {
                    if (res.errMsg!=="request:ok") {
                        zlMessage(this,{content:"网络请求错误",type:"error"})
                        return
                    }
                    this.setData({
                        doneExerciseStudents:res.data.data.getDoneExerciseStudents
                    })
                })
            }
            if (this.data.tabIndex === 1) {
                this.setData({
                    teacherModalVisible:true
                });
                getReadNotifyStudents(this.data.recordList[1][e.currentTarget.dataset.index]._id).then((res) => {
                    if (res.errMsg!=="request:ok") {
                        zlMessage(this,{content:"网络请求错误",type:"error"})
                        return
                    }
                   this.setData({
                       readNotifyStudents:res.data.data.getReadNotifyStudents
                   })
                })
            }
            return
        }
        if (this.data.tabIndex === 0) {
            wx.navigateTo({
                url: "../exam/exam?from=record&exerciseId=" + this.data.recordList[0][e.currentTarget.dataset.index].exerciseId
            })
        }
        if (this.data.tabIndex === 1) {
            this.setData({
                modalVisible: true,
                clickItem: {
                    ...this.data.recordList[1][e.currentTarget.dataset.index]
                }
            })
        }
        if (this.data.tabIndex === 2) {
            this.setData({
                modalVisible: true,
                clickItem: {
                    ...this.data.recordList[2][e.currentTarget.dataset.index]
                }
            })
        }
    },
    // 删除记录点击了
    swipeoutClick(e) {
        deleteCalcRecord(this.data.recordList[2][e.currentTarget.dataset.index]._id).then((item) => {
            if (item.errMsg !== "request:ok") {
                $Message({
                    content: item.errMsg,
                    type: "error"
                })
                return
            }
            const temp_recordList = this.data.recordList;
            temp_recordList[2] = temp_recordList[2].filter((_item) =>
                _item._id !== item.data.data.deleteCalcRecord._id
            )
            this.setData({
                tabTotal:{...this.data.tabTotal,calcCount:this.data.tabTotal.calcCount - 1},
                recordList: temp_recordList
            })
        })
    },
    tabChange(e) {
        this.setData({
            tabIndex: e.detail.index,
            isLoading: !this.data.recordList[e.detail.index] ? true : false,
        })
        if (this.data.recordList[e.detail.index].length === 0) {
            if (e.detail.index === 1) {
                this.pageGetNotify();
            }
            if (e.detail.index === 2) {
                this.pageGetCalc();
            }
        }
    },
    scrolltolower() {
        // 上拉加载更多
        this.setData({
            isGetMoreData: true
        })
        if (this.data.recordList[this.data.tabIndex].length === Object.values(this.data.tabTotal)[this.data.tabIndex]) {
            this.setData({
                haveMoreData: false,
            }, () => {
                setTimeout(() => {
                    this.setData({
                        isGetMoreData: false,
                        haveMoreData: true
                    })
                }, 1000)
            })
            return;
        }
        try {
            switch (this.data.tabIndex) {
                case 0:
                    this.pageGetExercise('getMore')
                    break;
                case 1:
                    this.pageGetNotify('getMore')
                    break;
                case 2:
                    this.pageGetCalc('getMore')
                    break;
                default:
                    break;
            }
        } catch (error) {
            $Message({
                content: error,
                type: "error"
            })
            console.log("下拉出现的错误", error);
        }
    },
    scrolltoupper() {
        // 下拉更新更多
        const timer = setTimeout(function () {
            $Message({
                content: "更新失败",
                type: "error"
            })
            that.setData({
                scrollUpdateing: false,
            })
        }, 8000);
        if (this.data.tabIndex === 0) {
            this.recordList = [
                [], this.data.recordList[1], this.data.recordList[2]
            ]
            this.pageGetExercise('update', timer);
        }
        if (this.data.tabIndex === 1) {
            this.recordList = [this.data.recordList[0],
                [], this.data.recordList[2]
            ]
            this.pageGetNotify('update', timer);
        }
        if (this.data.tabIndex === 2) {
            this.recordList = [this.data.recordList[0], this.data.recordList[1],
                []
            ]
            this.pageGetCalc('update', timer);
        }
        const that = this;
    },
    pageGetExercise(from, timer) {
        const userId = app.globalData.userInfo._id
        getExerciseRecord(userId, from === 'getMore' ? this.data.recordList[0].length : 0,app.globalData.userInfo.userType).then((item) => {
            let realExerciseRecord
            if (from === 'update') {
                realExerciseRecord = item.data.data.getExerciseRecord.map((item) => {
                    const date =new Date(Number(item.meta.createdAt));
                    item.meta.createdAt = formateDate.call(date,"yyyy-MM-dd")
                    return {
                        ...item,
                        starRate:this.data.userType? Math.round(Number(item.exercisesScoreRecord) / item.exercisesCorrectRecord.length * 5):0
                    }
                });
                clearTimeout(timer);
                this.setData({
                    scrollUpdateing: false,
                });
            } else {
                realExerciseRecord = this.data.recordList[0].concat(...item.data.data.getExerciseRecord.map((item) => {
                    const date =new Date(Number(item.meta.createdAt));
                    item.meta.createdAt = formateDate.call(date,"yyyy-MM-dd")
                    return {
                        ...item,
                        starRate:this.data.userType? Math.round(Number(item.exercisesScoreRecord) / item.exercisesCorrectRecord.length * 5):0
                    }
                }))
            }
            if (from === 'getMore') {
                this.setData({
                    isGetMoreData: false
                })
            }
            this.data.recordList[0] = realExerciseRecord
            const realRecordList = this.data.recordList
            this.setData({
                recordList: realRecordList
            })
        })
    },
    pageGetCalc(from, timer) {
        const userId = app.globalData.userInfo._id;
        getCalcRecord(userId, from === 'getMore' ? this.data.recordList[2].length : 0).then((res) => {
            let realCalcRecordList = res.data.data.getCalcRecord.map((item) => {
                item.calcList = zlDecodeList(item.calcList);
                item.timer = zlDecodeList(item.timer);
                item.rate = Math.round((item.score / item.calcCount) * 5);
                const calcTypeList = item.calcType.split('_');
                if (calcTypeList.length === 2) {
                    item.icon = calcType[calcTypeList[1].charAt(0) - 1].sub[calcTypeList[1].charAt(1) - 1].icon;
                    item.title = calcType[calcTypeList[1].charAt(0) - 1].sub[calcTypeList[1].charAt(1) - 1].title;
                    item.fontSize = calcType[calcTypeList[1].charAt(0) - 1].sub[calcTypeList[1].charAt(1) - 1].fontSize;
                }
                if (calcTypeList.length === 3) {
                    item.icon = calcType[calcTypeList[1].charAt(0) - 1].sub[calcTypeList[2].charAt(0) - 1].icon;
                    item.title = calcType[calcTypeList[1].charAt(0) - 1].sub[calcTypeList[2].charAt(0) - 1].title;
                    item.fontSize = calcType[calcTypeList[1].charAt(0) - 1].sub[calcTypeList[2].charAt(0) - 1].fontSize;
                }
                return item
            })
            if (from === 'update') {
                this.data.recordList[2] = realCalcRecordList;
                clearTimeout(timer);
                this.setData({
                    scrollUpdateing: false,
                })
            } else {
                this.data.recordList[2] = this.data.recordList[2].concat(realCalcRecordList)
            }
            if (from === 'getMore') {
                this.setData({
                    isGetMoreData: false
                })
            }
            const realrecordList = this.data.recordList
            this.setData({
                isLoading: false,
                recordList: realrecordList,
            })
        })
    },
    pageGetNotify(from, timer) {
        const userId = app.globalData.userInfo._id;
        const course = app.globalData.userInfo.course;
        getNotifyRecord(userId, course, from === 'getMore' ? this.data.recordList[1].length : 0,app.globalData.userInfo.userType).then((res) => {
            const realNotifyrecordList = res.data.data.getNotify.map((item) => {
                item.imgList = zlDecodeList(item.imgList).map(_item => "https://" + _item);
                const date = new Date(Number(item.meta.createdAt));
                item.meta.createdAt = formateDate.call(date, "MM-dd hh:mm")
                return item;
            })
            if (from === 'update') {
                this.data.recordList[1] = realNotifyrecordList;
                clearTimeout(timer);
                this.setData({
                    scrollUpdateing: false,
                })
            } else {
                this.data.recordList[1] = this.data.recordList[1].concat(realNotifyrecordList)
            }
            if (from === 'getMore') {
                this.setData({
                    isGetMoreData: false
                })
            }
            const realrecordList = this.data.recordList
            this.setData({
                recordList: realrecordList,
                isLoading: false
            })
        })
    },
    viewImage(e) {
        wx.previewImage({
            current: e.currentTarget.dataset.url,
            urls: this.data.clickItem.imgList
        })
    },
    // 页面显示触发
    onShow() {
        const userId = app.globalData.userInfo._id
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }
        // 请求tab框上的数量
        getTabTotal(userId,app.globalData.userInfo.userType).then((res) => {
            this.setData({
                userType:app.globalData.userInfo.userType,
                tabTotal: res.data.data.getTabTotal,
                userType:app.globalData.userInfo.userType
            })
        })
        // 请求测验记录
    },
    onReady() {
        this.pageGetExercise()
    },
    onLoad() {

    },
})