// logs.js
const util = require('../../utils/util.js')
import {
    $Toast
} from '../../components/Iview/base/index'
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
    getCalcRecord
} from './services'
const app = getApp()
Page({
    data: {
        logs: [],
        tabIndex: 0,
        modalVisible:false,
        recordList: [],
        tabTotal: {},
        clickItem:{},
        isLoading: false,
        actions: [{
            name: '删除记录',
            color: '#fff',
            fontsize: '20',
            width: 100,
            icon: 'delete',
            background: '#FF7F00'
        }],
    },
    modalConfirm(){
        this.setData({
            modalVisible:false
        })
    },
    cardClick(e){
        if (this.data.tabIndex === 1) {
            this.setData({
                modalVisible:true,
                clickItem:{...this.data.recordList[1][e.currentTarget.dataset.index]}
            })
        }
    },
    // 删除记录点击了
    swipeoutClick(e){
        console.log(e);
    },
    tabChange(e) {
        this.setData({
            tabIndex: e.detail.index,
            isLoading: !this.data.recordList[e.detail.index] ? true : false,
        })
        if (!this.data.recordList[e.detail.index]) {
            if (e.detail.index === 1) {
                this.pageGetNotify()
            }
        }
    },
    scrolltolower() {
        console.log("触底了");

    },
    pageGetNotify() {
        const userId = app.globalData.userInfo._id;
        const course = app.globalData.userInfo.course;
        getNotifyRecord(userId, course).then((res) => {
            this.setData({
                recordList: [...this.data.recordList, res.data.data.getNotify.map((item) => {
                    item.imgList = zlDecodeList(item.imgList).map(_item => "https://" + _item);
                    const date = new Date(Number(item.meta.createdAt));
                    item.meta.createdAt = formateDate.call(date, "MM-dd hh:mm")
                    return item;
                })],
                isLoading: false
            })
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
        getTabTotal(userId).then((res) => {
            this.setData({
                tabTotal: res.data.data.getTabTotal
            })
        })
    },
    onLoad() {
        const userId = app.globalData.userInfo._id
        getExerciseRecord(userId).then((item) => {
            this.setData({
                recordList: [item.data.data.getExerciseRecord.map((item) => {
                    return {
                        ...item,
                        starRate: Math.round(Number(item.exercisesScoreRecord) / item.exercisesCorrectRecord.length) * 5
                    }
                })]
            })
            console.log(item);
        })
    },

})