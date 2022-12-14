// pages/message/message.js
const app = getApp()
var big_tag_for_change = ''
var small_tag_for_change = ''
var activity_for_change = ''

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //是否弹出修改活动悬浮窗
    float_flag: 0,
    //修改内容暂存
    "name": "啥比微信小程序",
    "people_now": 1,
    "people_need": 11,
    "date": "2022-11-12",
    "time": " ",
    "place": "32#504",
    "intro": "一想到要起床上班，我你吗的这个火噌的一下冒起来了我这个火我真的噌的一下我这个火我真的噌的一下我这个火我真的噌的一下我这个火我真的噌的一下我这个火我真的噌的一下我这个火我真的噌的一下",
    //三点相关
    //发起者or参与者
    host_flag: "1",
    choice_host: ["修改活动", "解散活动", ],
    choice_participant: ["退出活动"],

    //活动相关
    activity_detail: {},
    msgList: [],
    active_list: []
  },
  bindor: async function (e) {
    // var choiceor = []
    wx.cloud.init();
    const db = wx.cloud.database();
    var con //host 
    const activity = e.currentTarget.dataset.activity
    var big_tag = e.currentTarget.dataset.big_tag
    var small_tag = e.currentTarget.dataset.small_tag

    activity_for_change = activity
    big_tag_for_change = big_tag
    small_tag_for_change = small_tag

    var that = this
    const _ = db.command
    var act_big = await db.collection(big_tag).doc(activity).get(); //大类里面的该活动数据
    var act_small = await db.collection(small_tag).where({
      time: act_big.data.time,
      date: act_big.data.date,
      host: act_big.data.host,
      intro: act_big.data.intro,
      name: act_big.data.name,
      place: act_big.data.place
    }).get(); //小类里面的该活动数据
    con = (act_big.data.host == app.globalData.my_id)
    console.log("con",con)
    if (con == true) {
      this.setData({
        choiceor: this.data.choice_host
      })
    } else if (con == false) {
      this.setData({
        choiceor: this.data.choice_participant
      })
    }
    wx.showActionSheet({
      itemList: this.data.choiceor,
      success: async function (res) {
        if (!res.cancel) {
          console.log("llll" + res.tapIndex) //这里是点击了那个按钮的下标
          //修改活动
          if (!res.tapIndex && con) {
            that.setData({
              float_flag: 1,
              'name': act_big.data.name,
              'date': act_big.data.date,
              'time': act_big.data.time,
              'place': act_big.data.place,
              'intro': act_big.data.intro,
              'people_need': act_big.data.people_need,
              'people_now': act_big.data.people_now,
            })
          }
          //解散活动
          else if (res.tapIndex) {
            console.log("触发解散活动")
            db.collection(big_tag).doc(activity).remove()
            db.collection(small_tag).where({
              time: act_big.data.time,
              date: act_big.data.date,
              host: act_big.data.host,
              intro: act_big.data.intro,
              name: act_big.data.name,
              place: act_big.data.place
            }).remove()
            //=================user↓等袁神=================
            db.collection('user').where({
              activities: _.all([activity])
            }).update({
              data: {
                activities: _.pull(activity)
              }
            });
            for (var i = 0; i < app.globalData.my_activities.length; ++i) {
              if (app.globalData.my_activities[i] == activity) {
                app.globalData.my_activities.splice(i, 1);
              }
            }
          wx.showToast({
            title: '解散成功',
            icon:"success"
          })
          that.onShow()
          }
          //退出活动
          else if (!res.tapIndex && !con) {
            console.log("触发退出活动")
            // act_big.data.
            // act_small.data.
            console.log('act_big.data.members', act_big.data.members)
            console.log('act_big.data.members.length', act_big.data.members.length)
            //四个for：删除四个属性中的值并存储在上面的四个变量
            for (var i = 0; i < act_big.data.members.length; i++) {
              if (act_big.data.members[i] == app.globalData.my_id) {
                act_big.data.members.splice(i, 1);
                break;
              }
            }
            console.log('act_small.data.members', act_small.data[0].members)
            console.log('act_small.data.members.length', act_small.data[0].members.length)
            for (var i = 0; i < act_small.data[0].members.length; i++) {
              if (act_small.data[0].members[i] == app.globalData.my_id) {
                act_small.data[0].members.splice(i, 1);
                break;
              }
            }
            for (var i = 0; i < act_big.data.people.length; i++) {
              if (act_big.data.people[i].id == app.globalData.my_id) {
                act_big.data.people.splice(i, 1);
                break;
              }
            }
            for (var i = 0; i < act_small.data[0].people.length; i++) {
              if (act_small.data[0].people[i].id == app.globalData.my_id) {
                act_small.data[0].people.splice(i, 1);
                break;
              }
            }
            const _ = db.command
            db.collection(big_tag).doc(activity).update({
              data: {
                members: act_big.data.members,
                people: act_big.data.people,
                people_cnt: _.inc(-1),
              }

            })
            db.collection(small_tag).where({
              time: act_big.data.time,
              date: act_big.data.date,
              host: act_big.data.host,
              intro: act_big.data.intro,
              name: act_big.data.name,
              place: act_big.data.place
            }).update({
              data: {
                members: act_small.data[0].members,
                people: act_small.data[0].people,
                people_cnt: _.inc(-1),
              }

            })
            //=================user↓等袁神=================
            db.collection('user').doc(app.globalData.my_id).update({
              data: {
                activities: _.pull(activity)
              }
            });
            for (var i = 0; i < app.globalData.my_activities.length; ++i) {
              if (app.globalData.my_activities[i] == activity) {
                app.globalData.my_activities.splice(i, 1);
              }
            }
            wx.showToast({
              title: '退出成功',
              icon:"success"
            })
          }
        }
      }
    })
  },

  //关闭悬浮窗
  closefloat() {
    this.setData({
      float_flag: 0
    })
  },

  //修改活动日期
  bindDateChange: function (e) {
    var that = this
    that.setData({
      'date': e.detail.value
    })
    console.log(that.data.date)
  },

  //修改活动时间
  bindTimeChange: function (e) {
    var that = this
    that.setData({
      'time': e.detail.value
    })
    console.log(that.data.time)
  },

  //修改活动地点
  bindPlaceChange: function (e) {
    var that = this
    that.setData({
      'place': e.detail.value
    })
    console.log(that.data.place)
  },
  bindIntroChange: function (e) {
    var that = this
    that.setData({
      'intro': e.detail.value
    })
    console.log(that.data.intro)
  },

  //确认修改
  float_confirm: async function (e) {
    var that = this
    wx.cloud.init();
    const db = wx.cloud.database();
    const _ = db.command
    var act_big = await db.collection(big_tag_for_change).doc(activity_for_change).get(); //大类里面的该活动数据
    db.collection(small_tag_for_change).where({
      time: act_big.data.time,
      date: act_big.data.date,
      host: act_big.data.host,
      intro: act_big.data.intro,
      name: act_big.data.name,
      place: act_big.data.place
    }).update({
      data:{
        date: that.data.date,
        time: that.data.time,
        place: that.data.place,
        intro: that.data.intro
      }
    })
    db.collection(big_tag_for_change).doc(activity_for_change).update({
      data:{
        date: that.data.date,
        time: that.data.time,
        place: that.data.place,
        intro: that.data.intro
      }
    })
    wx.showToast({
      title: '修改成功',
      icon:"success"
    })
    console.log("更改成功!")
    console.log(that.data.date)
    that.onShow()
    that.closefloat()
  },
  //跳转到对应活动留言板
  jumpToDetail: function (e) {
    console.log(e.currentTarget.dataset.form_kind,e.currentTarget.dataset.id);
    var form_kind = e.currentTarget.dataset.form_kind
    var active_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../comment/comment?form_kind=' + form_kind + '&active_id=' + active_id,
    })
  },
  // 活动信息查找
  async active_detail(active_id, id) {
    return new Promise(function (resolve, reject) {
      const db1 = wx.cloud.database().collection('all_sport')
      const db2 = wx.cloud.database().collection('all_ch')
      const db3 = wx.cloud.database().collection('all_entertainment')
      var msg = {}
      db1.doc(active_id).get().then(res => {
        msg.id = id
        msg.title = res.data.name
        msg.place = res.data.place
        msg.date = res.data.date
        msg.time = res.data.time
        msg.intro = res.data.intro
        msg.host = res.data.host,
          msg.members = res.data.members,
          msg.people_now = res.data.people_cnt,
          msg.people_need = res.data.people_need,
          msg.form_kind = 'all_sport'
        msg._id = res.data._id
        msg.big_tag = res.data.big_tag
        msg.small_tag = res.data.small_tag
        // console.log('all_sport表查找到活动', id);
        resolve(msg)
      }).catch(res => {})
      db2.doc(active_id).get().then(res => {
        msg.id = id
        msg.title = res.data.name
        msg.place = res.data.place
        msg.date = res.data.date
        msg.host = res.data.host
        msg.time = res.data.time
        msg.intro = res.data.intro
        msg.members = res.data.members,
          msg.people_now = res.data.people_cnt,
          msg.people_need = res.data.people_need,
          msg.form_kind = 'all_ch'
        msg._id = res.data._id
        msg.big_tag = res.data.big_tag
        msg.small_tag = res.data.small_tag
        // console.log('all_ch表查找到活动', id);
        resolve(msg)
      }).catch(res => {})
      db3.doc(active_id).get().then(res => {
        msg.id = id
        msg.title = res.data.name
        msg.place = res.data.place
        msg.date = res.data.date
        msg.host = res.data.host
        msg.time = res.data.time
        msg.intro = res.data.intro
        msg.members = res.data.members,
          msg.people_now = res.data.people_cnt,
          msg.people_need = res.data.people_need,
          msg.form_kind = 'all_entertainment'
        msg._id = res.data._id
        msg.big_tag = res.data.big_tag
        msg.small_tag = res.data.small_tag
        // console.log('all_entertainment表查找到活动', id);
        resolve(msg)
      }).catch(res => {})
    })
  },

  // 生命周期函数--监听页面加载
  async onLoad(options) {
    var active_list = app.globalData.my_activities
    this.data.active_list = active_list
    var openid = app.globalData.my_id
    var msglist = []
    var num = 0
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    // console.log(active_list);
    // for (var i = 0; i < active_list.length; i++) {
    //   var msg = {}
    //   msg = await this.active_detail(active_list[i], i)
    //   msglist.push(msg)
    // }
    for(var i=0;i<app.globalData.activity_title.length;++i){
      await db.collection(app.globalData.activity_title[i]).where({
        _id:_.in(app.globalData.my_activities)
        // members:_.all([openid])
      }).get().then((res)=>{
        for(var j=0;j<res.data.length;++j,++num){
          var msg={
            'id' : num,
            'title' : res.data[j].name,  
            'place' : res.data[j].place,
            'date' : res.data[j].date,
            'time' : res.data[j].time,
            'intro' : res.data[j].intro,
            'host' : res.data[j].host,
            'members' : res.data[j].members,
            'people_now' : res.data[j].people_cnt,
            'people_need' : res.data[j].people_need,
            'form_kind' : app.globalData.activity_title[i],
            '_id' : res.data[j]._id,
            'big_tag' : res.data[j].big_tag,
            'small_tag' : res.data[j].small_tag
          }
          if(openid==msg.host){
            msg.host="1"
          }
          else{
            msg.host="0"
          }
          console.log(msg)
          msglist.push(msg)
        }
      })
    }
    console.log('sglist',msglist.length)
    // for (var i = 0; i < msglist.length; i++) {
    //   if (openid == msglist[i].host) {
    //     msglist[i].host = '1'
    //   } else {
    //     msglist[i].host = '0'
    //   }
    // }
    var that=this
    // setTimeout(()=>{
    //   that.setData({
    //     msgList: msglist
    //   })
    // },500)
    this.setData({
      msgList: msglist
    })
    // console.log(this.data.msgList);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    var active_list = app.globalData.my_activities
    this.data.active_list = active_list
    var openid = app.globalData.my_id
    var msglist = []
    var num = 0
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    // console.log(active_list);
    // for (var i = 0; i < active_list.length; i++) {
    //   var msg = {}
    //   msg = await this.active_detail(active_list[i], i)
    //   msglist.push(msg)
    // }
    for(var i=0;i<app.globalData.activity_title.length;++i){
      await db.collection(app.globalData.activity_title[i]).where({
        _id:_.in(app.globalData.my_activities)
        // members:_.all([openid])
      }).get().then((res)=>{
        for(var j=0;j<res.data.length;++j,++num){
          var msg={
            'id' : num,
            'title' : res.data[j].name,  
            'place' : res.data[j].place,
            'date' : res.data[j].date,
            'time' : res.data[j].time,
            'intro' : res.data[j].intro,
            'host' : res.data[j].host,
            'members' : res.data[j].members,
            'people_now' : res.data[j].people_cnt,
            'people_need' : res.data[j].people_need,
            'form_kind' : app.globalData.activity_title[i],
            '_id' : res.data[j]._id,
            'big_tag' : res.data[j].big_tag,
            'small_tag' : res.data[j].small_tag
          }
          if(openid==msg.host){
            msg.host="1"
          }
          else{
            msg.host="0"
          }
          console.log(msg)
          msglist.push(msg)
        }
      })
    }
    console.log('sglist',msglist.length)
    // for (var i = 0; i < msglist.length; i++) {
    //   if (openid == msglist[i].host) {
    //     msglist[i].host = '1'
    //   } else {
    //     msglist[i].host = '0'
    //   }
    // }
    var that=this
    // setTimeout(()=>{
    //   that.setData({
    //     msgList: msglist
    //   })
    // },500)
    this.setData({
      msgList: msglist
    })
    // console.log(this.data.msgList);





    // var active_list = app.globalData.my_activities
    // this.data.active_list = active_list
    // var openid = app.globalData.my_id
    // var msglist = []
    // // console.log(active_list);
    // for (var i = 0; i < active_list.length; i++) {
    //   var msg = {}
    //   msg = await this.active_detail(active_list[i], i)
    //   msglist.push(msg)
    // }
    // for (var i = 0; i < msglist.length; i++) {
    //   if (openid == msglist[i].host) {
    //     msglist[i].host = '1'
    //   } else {
    //     msglist[i].host = '0'
    //   }
    // }
    // this.setData({
    //   msgList: msglist
    // })
    // console.log(this.data.msgList);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})