// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database();
    const _ = db.command;
    var that = this;
    var openid = 'null';
    wx.cloud.callFunction({
      name: "getOpenid",
      success(res) {
        console.log('获取openid成功', res.result.openid);
        openid = res.result.openid;
        db.collection('user').where(_.or([
          {_id : openid},  
          {my_follow: _.all([openid])}   // 存放 需要的id
        ]))
        .get({
          success(res) {
            if (res.data.length != 0) {
              new Promise(function (resolve, reject) {
                for(var i=0;i<res.data.length;++i) {
                  if(res.data[i]._id==openid) {
                    that.globalData.my_id= openid
                    that.globalData.my_name= res.data[i].name
                    that.globalData.my_follow= res.data[i].my_follow
                    that.globalData.my_tags= res.data[i].tags
                    that.globalData.is_find= res.data[i].is_find
                    that.globalData.userInfo= res.data[i].intro
                    that.globalData.head_img= res.data[i].head_img
                    that.globalData.my_hmd= res.data[i].hmd
                    that.globalData.my_activities= res.data[i].activities
                  }
                  else {
                    that.globalData.my_fan.push(res.data[i]._id)
                  }
                }
                resolve()
              })
              .then(function(){
                for(var i=0;i<that.globalData.my_follow.length;++i) {
                  for(var j=0;j<that.globalData.my_fan.length;++j) {
                    if(that.globalData.my_follow[i]==that.globalData.my_fan[j]) {
                      that.globalData.my_friend.push(that.globalData.my_follow[i])
                    }
                  }
                }
              })
              wx.switchTab({
                url: '/pages/my/my',
              })
            } 
            else {
              console.log('未匹配到相应openid');
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          }
        })
      },
      fail(err) {
        console.log('获取openid失败', err);
      }
    })
  },
  globalData: {
    userInfo: "null",
    head_img: "",
    my_id: "asfsdfrwefsgfd",
    my_name: "hh",
    my_activities: {

    },
    my_friend: [

    ],
    my_follow: [
      // 'asfdsf',
      // 'e707b2f7636b52a1009314ae3a51bad9'
    ],
    my_fan: [

    ],
    my_hmd: [
      'e707b2f7636b52a1009314ae3a51bad9'
    ],
    my_tags: [
      '读书',
      '游戏'
    ],
    is_find: true
  }
})

