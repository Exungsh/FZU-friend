// pages/my/my.js
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
    account:''
  },

  //swich开关
  switchChange: function (e){
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },

  //获取微信号
  getNumble: function (e) {
    this.setData({
      numble: e.detail.value
    })
    console.log(this.data.numble);
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