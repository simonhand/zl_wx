Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#9382da",
    list:[
      {
        "pagePath":"../index/index",
        "iconPath": "../assets/tabbar/home/home.png",
        "selectedIconPath": "../assets/tabbar/home/home_selected.png",
        "text": "首页"
      },
      {
        "pagePath": "../logs/logs",
        "iconPath": "../assets/tabbar/record/record.png",
        "selectedIconPath": "../assets/tabbar/record/record_selected.png",
        "text": "记录"
      },
      {
        "pagePath": "../profile/profile",
        "iconPath": "../assets/tabbar/profile/profile.png",
        "selectedIconPath": "../assets/tabbar/profile/profile_selected.png",
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
      console.log("e",data);
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