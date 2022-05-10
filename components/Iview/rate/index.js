Component({
    externalClasses: ['i-class'],
    // data:{
    //     starSize : [5,10,20,10,5]
    // },
    properties : {
        starSize:{
            type:Array,
            value:[20,40,60,40,20]
        },
        count : {
            type : Number,
            value : 5
        },
        value : {
            type : Number,
            value : 0
        },
        custom:{
            type:Boolean,
            value:false
        },
        disabled : {
            type : Boolean,
            value : false
        },
        size : {
            type : Number,
            value : 20
        },
        name : {
            type : String,
            value : ''
        }
    },
    data : {
        touchesStart : {
            pageX : 0
        }
    },
    methods : {
        handleClick(e){
            const data = this.data;
            if( data.disabled ){
                return;
            }
            const index = e.currentTarget.dataset.index;
            this.triggerEvent('change',{
                index : index + 1
            })
        },
        handleTouchMove(e){
            const data = this.data;
            if( data.disabled ){
                return;
            }
            if( !e.changedTouches[0] ){
                return;
            }
            const movePageX =  e.changedTouches[0].pageX;
            const space = movePageX - data.touchesStart.pageX;

            if( space <= 0 ){
                return;
            }
            let setIndex = Math.ceil( space/data.size );
            setIndex = setIndex  > data.count ? data.count : setIndex ;
            this.triggerEvent('change',{
                index : setIndex 
            })
        }
    },
    ready(){
       const className = '.i-rate';
        var query = wx.createSelectorQuery().in(this)
        query.select( className ).boundingClientRect((res)=>{
            this.data.touchesStart.pageX = res.left || 0;
        }).exec()
    }
});
