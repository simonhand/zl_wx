Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#9382da",
    list:[
      {
          "pagePath": "../index/index",
          "iconPath": "../static/tab_icon/custom.png",
          "selectedIconPath": "/static/tab_icon/custom_cur.png",
          "text": "首页"
      },
      {
          "pagePath": "../logs/logs",
          "iconPath": "../static/tab_icon/tpl.png",
          "selectedIconPath": "/static/tab_icon/tpl_cur.png",
          "text": "记录"
      },
      {
          "pagePath": "../profile/profile",
          "iconPath": "../static/tab_icon/my.png",
          "selectedIconPath": "/static/tab_icon/my_cur.png",
          "text": "我的"
      }
  ]
  },
  attached() {
  },
  methods: {
      switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path
      const that = this;
      if (data.index === 2) {
         wx.getStorage({
          key:"user",
          encryptL:true,
          success(res){
            wx.switchTab({url})
            that.setData({
              selected: data.index
            })
          },
          fail(){
            wx.navigateTo({
              url: '../login/login',
            })
          }
        })    
      }else{
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      }
    }
  }
})