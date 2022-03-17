// components/zl-select/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        classes:{
            type:Array,
            value: ['消费账户', '平台返利账户', '微信钱包',"1237612","战斗给"], 
            // value: ['未获取相关班级'], 
        },
        index:{
            type:Number,
            value:0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectDatas: ['消费账户', '平台返利账户', '微信钱包'], //下拉列表的数据
    },

    /**
     * 组件的方法列表
     */
    methods: {
          // 点击下拉显示框
        selectTaps() {
            this.setData({
            shows: !this.data.shows,
            });
        },
        // 点击下拉列表
        optionTaps(e) {
            let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
            this.setData({
            indexs: Indexs,
            shows: !this.data.shows
            });
            this.triggerEvent("selectItemClick",{
                index:Indexs,
            })
        }
    }
})
