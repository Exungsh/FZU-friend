// app.js
App({
  // onLaunch() {
  //   wx.cloud.init({
  //     env: 'cloud1-3gbbimin78182c5d'
  //   })
  //   const db = wx.cloud.database();
  //   const _ = db.command;
  //   var that = this;
  //   var openid = 'null';
  //   wx.cloud.callFunction({
  //     name: "getOpenid",
  //     success(res) {
  //       console.log('获取openid成功', res.result.openid);
  //       openid = res.result.openid;
  //       db.collection('user').where(_.or([
  //         {_id : openid},  
  //         {my_follow: _.all([openid])}   // 存放 需要的id
  //       ]))
  //       .get({
  //         success(res) {
  //           if (res.data.length != 0) {
  //             for(var i=0;i<res.data.length;++i) {
  //               if(res.data[i]._id==openid) {
  //                 that.globalData.my_id= openid
  //                 that.globalData.my_name= res.data[i].name
  //                 that.globalData.my_follow= res.data[i].my_follow
  //                 that.globalData.my_tags= res.data[i].tags
  //                 that.globalData.is_find= res.data[i].is_find
  //                 that.globalData.userInfo= res.data[i].intro
  //                 that.globalData.head_img= res.data[i].head_img
  //                 that.globalData.my_hmd= res.data[i].hmd
  //                 that.globalData.my_activities= res.data[i].activities
  //                 that.globalData.my_sex= res.data[i].sex
  //                 that.globalData.wx= res.data[i].wx
  //               }
  //               else {
  //                 that.globalData.my_fan.push(res.data[i]._id)
  //               }
  //             }
  //             for(var i=0;i<that.globalData.my_follow.length;++i) {
  //               for(var j=0;j<that.globalData.my_fan.length;++j) {
  //                 if(that.globalData.my_follow[i]==that.globalData.my_fan[j]) {
  //                   that.globalData.my_friend.push(that.globalData.my_follow[i])
  //                 }
  //               }
  //             }
  //             setTimeout(()=>{
  //               wx.switchTab({
  //                 url: '/pages/my/my',
  //               })
  //             },500)
  //           } 
  //           else {
  //             console.log('未匹配到相应openid',openid);
  //             WOSHIYUANHAO WOSHIDASHABI 我是袁豪 我是大傻逼 
  //             wx.switchTab({
  //               url: '/pages/index/index',
  //             })
  //           }
  //         }
  //       })
  //     },
  //     fail(err) {
  //       console.log('获取openid失败', err);
  //     }
  //   })
  // },


  // onLaunch() {
  //   wx.cloud.init({
  //     env: 'cloud1-3gbbimin78182c5d'
  //   })
  //   const db = wx.cloud.database();
  //   const _ = db.command;
  //   var that = this;
  //   var openid = 'null';
  //   wx.cloud.callFunction({
  //     name: "getOpenid",
  //     success(res) {
  //       console.log('获取openid成功', res.result.openid);
  //       openid = res.result.openid;
  //       db.collection('user').where(_.or([
  //         {_id : openid},  
  //         {my_follow: _.all([openid])}   // 存放 需要的id
  //       ]))
  //       .get({
  //         success(res) {
  //           if (res.data.length != 0) {
  //             new Promise(function (resolve, reject) {
  //               for(var i=0;i<res.data.length;++i) {
  //                 if(res.data[i]._id==openid) {
  //                   that.globalData.my_id= openid
  //                   that.globalData.my_name= res.data[i].name
  //                   that.globalData.my_follow= res.data[i].my_follow
  //                   that.globalData.my_tags= res.data[i].tags
  //                   that.globalData.is_find= res.data[i].is_find
  //                   that.globalData.userInfo= res.data[i].intro
  //                   that.globalData.head_img= res.data[i].head_img
  //                   that.globalData.my_hmd= res.data[i].hmd
  //                   that.globalData.my_activities= res.data[i].activities
  //                 }
  //                 else {
  //                   that.globalData.my_fan.push(res.data[i]._id)
  //                 }
  //               }
  //               resolve()
  //             })
  //             .then(function(){
  //               for(var i=0;i<that.globalData.my_follow.length;++i) {
  //                 for(var j=0;j<that.globalData.my_fan.length;++j) {
  //                   if(that.globalData.my_follow[i]==that.globalData.my_fan[j]) {
  //                     that.globalData.my_friend.push(that.globalData.my_follow[i])
  //                   }
  //                 }
  //               }
  //             })
  //             wx.switchTab({
  //               url: '/pages/my/my',
  //             })
  //           } 
  //           else {
  //             console.log('未匹配到相应openid');
  //             wx.switchTab({
  //               url: '/pages/index/index',
  //             })
  //           }
  //         }
  //       })
  //     },
  //     fail(err) {
  //       console.log('获取openid失败', err);
  //     }
  //   })
  // },

  async onLaunch() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database();
    const _ = db.command;
    var that = this;
    var openid = 'null';
    await wx.cloud.callFunction({
      name: "getOpenid"
    }).then((res)=>{
      console.log('获取openid成功', res.result);
      openid = res.result.openid;
    })
    
    var res = await db.collection('user').where(_.or([
      {_id : openid},  
      {my_follow: _.all([openid])}   // 存放 需要的id
    ])).get()

    if (res.data.length != 0) {
      async function wait_data(){
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
            that.globalData.my_sex= res.data[i].sex
          }
          else {
            that.globalData.my_fan.push(res.data[i]._id)
          }
        }
      }
      await wait_data()
      async function wait_friend(){
        for(var i=0;i<that.globalData.my_follow.length;++i) {
          for(var j=0;j<that.globalData.my_fan.length;++j) {
            if(that.globalData.my_follow[i]==that.globalData.my_fan[j]) {
              that.globalData.my_friend.push(that.globalData.my_follow[i])
            }
          }
        }
      }
      await wait_friend()
      wx.switchTab({
        url: '/pages/my/my',
      })
    } 
    else {
      that.globalData.my_id= openid
      await db.collection('user').add({
        data:{
          _id: openid,
          name: "未命名",
          my_follow: [],
          tags: ["读书"],
          is_find: true,
          intro: "空空如也",
          head_img: "",
          hmd: [],
          activities: [],
          sex: 1
        }
      })
      wx.switchTab({
        url: '/pages/my/my',
      })
    }
  },
  globalData: {
    activity_title:['all_sport','all_ch','all_entertainment'],
    userInfo: "空空如也",
    head_img: "",
    wx: '',
    my_sex: 1,
    my_id: "",
    my_name: "未命名",
    my_activities: {

    },
    my_friend: [

    ],
    my_follow: [

    ],
    my_fan: [

    ],
    my_hmd: [

    ],
    my_tags: [
      
    ],
    all_tags:[
        ['羽毛球','篮球','乒乓球','跑步','健身','排球','足球','网球','游泳'],
        ['烧烤','麻辣烫','奶茶','火锅','咖啡','日料','川菜','小吃','炸鸡','自助餐'], 
        ['电影','剧本杀','桌游','KTV','密室逃脱','live house','逛街']
    ],
    is_find: true
  }
})

