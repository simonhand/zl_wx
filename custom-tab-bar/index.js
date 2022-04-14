import {
  haveUserInfo
} from '../utils/util'
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#9382da",
    list: [{
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
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path
      if (!haveUserInfo()) {
        wx.navigateTo({
          url: '../login/login',
        })
        return
      }
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})