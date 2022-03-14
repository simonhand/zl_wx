// components/zl-switch.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        checkvalue:{
            type:Boolean,
            value:false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        bodyclick(){
            this.setData({
                checkvalue:!this.data.checkvalue
            })
        },
    }
})
