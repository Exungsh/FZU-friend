// pages/my/my.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "Exungsh", 
    intro: '...',
    friendnumble: 51,
    follownumble: 48,
    followednumble: 104,
    switchAllChecked: true,
    head_img: "",
    wx_account: ''
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
  onShow() {
    this.setData({
      name: app.globalData.my_name,
      intro: app.globalData.userInfo,
      friendnumble: app.globalData.my_friend.length,
      follownumble: app.globalData.my_follow.length,
      followednumble: app.globalData.my_fan.length,
      switchAllChecked: app.globalData.is_find,
      head_img: app.globalData.head_img,
      wx: app.globalData.wx
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
  onPullDownRefresh() {

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