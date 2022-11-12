// pages//friend.js
const app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data:{
    myactivitylist:[
      {
        "id": "0",
        "name": "entertain0",
        "head": "",
        "date": "2022-11-09",
        "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
      },
      {
        "id": "0",
        "name": "entertain0",
        "head": "",
        "date": "2022-11-09",
        "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
      },
      {
        "id": "0",
        "name": "entertain0",
        "head": "",
        "date": "2022-11-09",
        "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
      }
    ]
  },
  test() {
    console("hello")
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
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var activitiy_id=Object.keys(app.globalData.my_activities)
    var activitiy_table=Object.values(app.globalData.my_activities)
    var array = []
    var that = this
    // console.log(activitiy_table)
    new Promise(function(resolve,reject) {})
    .then((resolve,reject)=>{
      for(var i=0;i<activitiy_id.length;++i) {
        db.collection(activitiy_table[i]).where({
          _id: activitiy_id[i]
        }).get().then(
          (res)=>{
            var activity={
              "id": res.data[0]._id,
              "name": res.data[0].name,
              "head": res.data[0].headimage,
              "date": "res.data[0].date",
              "intro": res.data[0].intro
            }
            array.push(activity)
          }
        )
      }
    })
    .then((resolve,reject)=>{
      // console.log(array)
      that.setData({
        myactivitylist:array
      })
      console.log(that.data.myactivitylist)
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