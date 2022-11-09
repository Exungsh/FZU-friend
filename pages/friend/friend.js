// pages/friend/friend.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datalist: [
      [{
        'id': 0,
        'name': 'girl0',
        'intro': 'intro0',
        'friend_tag': ['0_tag1', '0_tag2', '0_tag3']
      }, {
        'id': 1,
        'name': 'girl1',
        'intro': 'intro1',
        'friend_tag': ['1_tag1', '1_tag2', '1_tag3']
      }],
      [{
        'id': 0,
        'name': 'boy0',
        'intro': 'intro0',
        'friend_tag': ['0_tag1', '0_tag2', '0_tag3']
      }]
    ],
    friendlist:[]
  },
  recommend() {
    this.setData({
      friendlist: this.data.datalist[0],
      nav1bgc: "#f0f9f6",
      nav1color: "#588c7e",
      nav2bgc: "#588c7e",
      nav2color: "#f0f9f6",
    })
  },
  recent() {
    this.setData({
      friendlist: this.data.datalist[1],
      nav1color: "#f0f9f6",
      nav1bgc: "#588c7e",
      nav2bgc: "#f0f9f6",
      nav2color: "#588c7e",
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
    this.setData({
      friendlist: this.data.datalist[0],
      nav1bgc: "#f0f9f6",
      nav1color: "#588c7e",
      nav2bgc: "#588c7e",
      nav2color: "#f0f9f6",
    })
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