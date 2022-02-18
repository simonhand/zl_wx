// components/zl-input/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        inputIndex: "",
        lable:"",
        inputNumIndex: -1,
        content:"",
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
            this.triggerEvent("inputClick")
        },
    }
})
