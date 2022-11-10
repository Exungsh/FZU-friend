// pages/search_result/search_result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: "",
    result: [{"id": 1, "img": "/icon/huodongxiangqu_1.png", "aName": "哈哈哈", "time": "2022-11-11 12:00", "introduce":"快来玩呀！！！！！！！！！"}, {"id": 2, "img": "/icon/huodongxiangqu_1.png", "aName": "哈哈哈", "time": "2022-11-11 12:00", "introduce":"快来玩呀！！！！！！！！！"}, {"id": 3, "img": "/icon/huodongxiangqu_1.png", "aName": "哈哈哈", "time": "2022-11-11 12:00", "introduce":"快来玩呀！！！！！！！！！"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.search, this.data.search);
    const search = options.search;
    this.setData({
      search
    });
    // console.log(options.search, this.data.search);
    // this.setData(search, options.search);
    wx.request({
      url: 'url',
      method: 'GET',
      data: this.search,
      success: (res) => {
        this.setData(result, res);
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
  toSearch() {
    wx.redirectTo({
      url: '/pages/search/search',
    })
  }
})