Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        lableList:{
            type:Array,
            value:["label1","label2"]
        },
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        extra: {
            type: String,
            value: ''
        }
    }
});
