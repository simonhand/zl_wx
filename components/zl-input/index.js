// components/zl-input/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        inputIndex: {
            type:Number,
            value:""
        },
        lable: {
            type:String,
            value:""
        },
        inputNumIndex: {
            type:Number,
            value:-1
        },
        content:{
            type:String,
            value:""
        },
        inputValue:{
            type:String,
            value:""
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
        inputClick:function (e) {
            this.triggerEvent("inputClick");
        },
        getInputValue:function (e) {
            this.triggerEvent("getInputValue");
        },
    }
})
