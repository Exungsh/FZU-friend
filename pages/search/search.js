// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: "",
    favor: ["羽毛球", "原神", "袁神", "LOLM"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'url',
      method: 'GET',
      // data: id,
      success: (res) => {
        console.log("success");
      },
      fail: (res) => {
        console.log("fail");
      }
    })
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

  },
  getInputValue(e) {
    const value = e.detail.value;
    this.setData({
      search: value
    });
  },
  toSearch_result() {
    wx.redirectTo({
      url: '/pages/search_result/search_result?search=' + this.data.search
    })
  },
  favor_tap(e) {
    console.log(e);
    const search = e.currentTarget.dataset.value;
    this.setData({
      search
    });
    this.toSearch_result();
  }
})