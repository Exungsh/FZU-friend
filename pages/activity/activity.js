// pages/message/message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否弹出修改活动悬浮窗
    float_flag: 0,
    //修改内容暂存
    date: '',
    time: '',
    place: '',
    //三点相关
    //发起者or参与者
    host_flag: "1",
    choice_host: ["修改活动", "解散活动", ],
    choice_participant: ["退出活动"],

    //活动相关
    activity_detail: {},
    msgList: [],
    active_list:[]
  },
   bindor:function(e) {
    var choiceor = []
    var con = e.currentTarget.id
    var that = this
    if(con == 1) {
      this.setData({
        choiceor: this.data.choice_host
      })
    }

    else if(con == 0) {
      this.setData({
        choiceor: this.data.choice_participant
      })
    }
    wx.showActionSheet({
      itemList: this.data.choiceor,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)//这里是点击了那个按钮的下标
          //修改活动
          if(!res.tapIndex && con){
            that.setData({
              float_flag: 1,
              'date': that.data.activity_detail.date,
              'time': that.data.activity_detail.time,
              'place': that.data.activity_detail.place
            })
          }
          //解散活动
          else if(res.tapIndex){
            console.log("触发解散活动")
          }
          //退出活动
          else if(!res.tapIndex && !con){
            console.log("触发退出活动")
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

  //确认修改
  float_confirm: function (e) {
    var that = this
    
    console.log("更改成功!")
    console.log(that.data.date)
    that.closefloat()
  },
  //跳转到对应活动留言板
  jumpToDetail: function (e) {
    console.log(e.currentTarget.dataset.id);
    var form_kind = this.data.msgList[e.currentTarget.dataset.id].form_kind
    var active_id = this.data.active_list[e.currentTarget.dataset.id]
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
        console.log('all_sport表查找到活动', id);
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
        console.log('all_ch表查找到活动', id);
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
        console.log('all_entertainment表查找到活动', id);
        resolve(msg)
      }).catch(res => {})
    })
  },

 // 生命周期函数--监听页面加载
 async onLoad (options) {
  var active_list = app.globalData.my_activities
  this.data.active_list = active_list
  var openid = app.globalData.my_id
  var msglist = []
  console.log(active_list);
  for (var i = 0; i < active_list.length; i++) {
    var msg = {}
    msg = await this.active_detail(active_list[i],i)
    msglist.push(msg)
  }
  for(var i = 0; i<msglist.length;i++){
    if(openid == msglist[i].host){
      msglist[i].host = '1'
    }
    else{
      msglist[i].host = '0'
    }
  }
  this.setData({
    msgList: msglist
  })
  console.log(this.data.msgList);
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
    console.log(active_list);
    for (var i = 0; i < active_list.length; i++) {
      var msg = {}
      msg =  await this.active_detail(active_list[i],i)
      msglist.push(msg)
    }
    for(var i = 0; i<msglist.length;i++){
      if(openid == msglist[i].host){
        msglist[i].host = '1'
      }
      else{
        msglist[i].host = '0'
      }
    }
    this.setData({
      msgList: msglist
    })
    console.log(this.data.msgList);
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