Component({
    options: {
        addGlobalClass: true
    },
    properties: {
        colorName:{
            type:String,
            value:"random"
        },
        disableCustomColor:{
            type:Boolean,
            value:false,
        },
        height:{
            type:String,
            value:"auto"
        },
        fontSize:{
            type:Number,
            value:30,
        },
        data: {
            type: Object,
            optionalTypes: Array,
            value: {}
        }
    },
    lifetimes: {
        attached() {
            this.setData({
                colorName: this.getColor()
            });
        }
    },
    methods:{
        //随机生成库内颜色名
        getColor() {
            let colorArr = ['yellow', 'orange', 'red', 'pink', 'mauve', 'purple', 'blue', 'cyan', 'green', 'olive', 'brown'];
            return colorArr[Math.floor(Math.random() * colorArr.length)]
        }
    },
})