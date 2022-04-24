Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        visible:{
            type:Boolean,
            value:false
        },
        navBg: {
            type: String,
            value: 'bg-blur'
        },
        title: {
            type: String,
            value: ''
        },
        stopBack:{
            type:Boolean,
            value:false
        }
    },
    methods:{
        stopBack(){
            console.log("2222");
            this.triggerEvent("stopNavBack")
        }
    }
})