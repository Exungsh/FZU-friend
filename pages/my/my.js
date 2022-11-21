// pages/my/my.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "", 
    intro: '',
    friendnumble: 0,
    follownumble: 0,
    followednumble: 0,
    switchAllChecked: true,
    head_img: "",
    wx_account: '',
    is_fzu: false
  },

  //swich开关
  switchChange: function (e){
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database();
    const _ = db.command
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    app.globalData.is_find=e.detail.value
    db.collection('user').where({
      _id: app.globalData.my_id
    })
    .update({
      data: {
        is_find: _.set(app.globalData.is_find)
        // my_follow: _.set(app.globalData.my_follow)
      }
    })
  },

  //获取微信号
  getNumble: function (e) {
    this.setData({
      numble: e.detail.value
    })
    console.log(this.data.numble);
  },
  comfire_wx: function (e) {
    this.setData({
      wx_account: e.detail.value
    })
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('user').where({
      _id: app.globalData.my_id
    })
    .update({
      data: {
        wx: _.set(this.data.wx_account)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var a_friend=[]
    var a_fan=[]
    async function wait_ff(){
      var countResult = await db.collection('user').where({
        my_follow: _.all([app.globalData.my_id])
      }).count()
      var total = Math.ceil(countResult.total/20)
      for(var i=0;i<total;++i) {
        var res = await db.collection('user').where(
          {my_follow: _.all([app.globalData.my_id])}
        ).skip(i*20).limit(20).get()
        for(var j=0;j<res.data.length;++j) {
          a_fan.push(res.data[j]._id)
          for(var k=0,l=j;k<app.globalData.my_follow.length;++k){
            if(app.globalData.my_follow[k]==res.data[l]._id) {
              a_friend.push(res.data[l]._id)
            }
          }
        }     
      }
    }
    await wait_ff()
    app.globalData.my_fan=a_fan
    app.globalData.my_friend=a_friend
    this.setData({
      name: app.globalData.my_name,
      intro: app.globalData.userInfo,
      friendnumble: app.globalData.my_friend.length,
      follownumble: app.globalData.my_follow.length,
      followednumble: app.globalData.my_fan.length,
      switchAllChecked: app.globalData.is_find,
      head_img: app.globalData.head_img,
      wx_account: app.globalData.wx,
      is_fzu: app.globalData.is_fzu
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var a_friend=[]
    var a_fan=[]
    async function wait_ff(){
      var countResult = await db.collection('user').where({
        my_follow: _.all([app.globalData.my_id])
      }).count()
      var total = Math.ceil(countResult.total/20)
      for(var i=0;i<total;++i) {
        var res = await db.collection('user').where(
          {my_follow: _.all([app.globalData.my_id])}
        ).skip(i*20).limit(20).get()
        for(var j=0;j<res.data.length;++j) {
          a_fan.push(res.data[j]._id)
          for(var k=0,l=j;k<app.globalData.my_follow.length;++k){
            if(app.globalData.my_follow[k]==res.data[l]._id) {
              a_friend.push(res.data[l]._id)
            }
          }
        }     
      }
    }
    await wait_ff()
    app.globalData.my_fan=a_fan
    app.globalData.my_friend=a_friend
    this.setData({
      name: app.globalData.my_name,
      intro: app.globalData.userInfo,
      friendnumble: app.globalData.my_friend.length,
      follownumble: app.globalData.my_follow.length,
      followednumble: app.globalData.my_fan.length,
      switchAllChecked: app.globalData.is_find,
      head_img: app.globalData.head_img,
      wx_account: app.globalData.wx,
      is_fzu: app.globalData.is_fzu
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})