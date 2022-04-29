// logs.js
const util = require('../../utils/util.js')
import { calcType } from '../../config/secret'
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
        recordList: [-1,-1,-1],
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
        if (this.data.tabIndex === 2) {
            this.setData({
                modalVisible:true,
                clickItem:{...this.data.recordList[2][e.currentTarget.dataset.index]}
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
                this.pageGetNotify();
            }
            if (e.detail.index === 2) {
                this.pageGetCalc();
            }
        }
    },
    scrolltolower() {
        console.log("触底了");
    },
    pageGetCalc(){
        const userId = app.globalData.userInfo._id;
        getCalcRecord(userId).then((res) => {
            this.data.recordList[2] = res.data.data.getCalcRecord.map((item) => {
                item.calcList = zlDecodeList(item.calcList);
                item.timer = zlDecodeList(item.timer);
                item.rate = Math.round((item.score / item.calcCount) * 5);
                const calcTypeList = item.calcType.split('_');
                if (calcTypeList.length === 2) {
                    item.icon = calcType[calcTypeList[1].charAt(0)-1].sub[calcTypeList[1].charAt(1)-1].icon;
                    item.title = calcType[calcTypeList[1].charAt(0)-1].sub[calcTypeList[1].charAt(1)-1].title;
                    item.fontSize = calcType[calcTypeList[1].charAt(0)-1].sub[calcTypeList[1].charAt(1)-1].fontSize;
                }
                if (calcTypeList.length === 3) {
                    item.icon = calcType[calcTypeList[1].charAt(0)-1].sub[calcTypeList[2].charAt(0)-1].icon;
                    item.title = calcType[calcTypeList[1].charAt(0)-1].sub[calcTypeList[2].charAt(0)-1].title;
                    item.fontSize = calcType[calcTypeList[1].charAt(0)-1].sub[calcTypeList[2].charAt(0)-1].fontSize;
                }
                return item
            })
            const realrecordList = this.data.recordList
            this.setData({
                isLoading:false,
                recordList:realrecordList,
            })
        })
    },
    pageGetNotify() {
        const userId = app.globalData.userInfo._id;
        const course = app.globalData.userInfo.course;
        getNotifyRecord(userId, course).then((res) => {
            this.setData({
               
            })
            this.data.recordList[1] =  res.data.data.getNotify.map((item) => {
                item.imgList = zlDecodeList(item.imgList).map(_item => "https://" + _item);
                const date = new Date(Number(item.meta.createdAt));
                item.meta.createdAt = formateDate.call(date, "MM-dd hh:mm")
                return item;
            })
            const realrecordList = this.data.recordList
            this.setData({
                recordList:realrecordList,
                isLoading: false
            })
        })
    },
    viewImage(e) {
        console.log(e.currentTarget.dataset.url);
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