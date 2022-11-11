// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    my_id: "asfsdfrwefsgfd",
    my_name: "hh",
    my_activities:{
      '1': 'Running',
      '2': 'adasdsasd'
    },
    my_friends:[
      // 'asfdsf',
      // 'e707b2f7636b52a1009314ae3a51bad9'
    ],
    my_hmd:[
      '4e37263e636bbc0400bdea537a50c661',
      'asdasdasff'
    ],
    my_tags:[
      '读书',
      '游戏'
    ],
    is_find: true
  }
})
