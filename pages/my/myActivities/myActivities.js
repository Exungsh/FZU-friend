// pages//friend.js
const app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data:{
    myactivitylist:[]
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
  // onShow() {
  //   wx.cloud.init({
  //     env: 'cloud1-3gbbimin78182c5d'
  //   })
  //   const db = wx.cloud.database()
  //   const _ = db.command
  //   var activitiy_id=Object.keys(app.globalData.my_activities)
  //   var activitiy_table=Object.values(app.globalData.my_activities)
  //   var array = []
  //   var that = this
  //   // console.log(activitiy_table)
  //   new Promise(function(resolve,reject) {
  //     for(var i=0;i<activitiy_id.length;++i) {
  //       db.collection(activitiy_table[i]).where({
  //         _id: activitiy_id[i]
  //       }).get().then(
  //         (res)=>{
  //           var activity={
  //             "id": res.data[0]._id,
  //             "name": res.data[0].name,
  //             "head": res.data[0].headimage,
  //             "date": "res.data[0].date",
  //             "intro": res.data[0].intro
  //           }
  //           array.push(activity)
  //         }
  //       )
  //     }
  //     // while(array.length!=activitiy_id.length){
  //     //   console.log(array.length)
  //     setTimeout(() => {
  //       // resolve()
  //     }, 1000);
  //   })
  //   .then((resolve,reject)=>{
  //     that.setData({
  //       myactivitylist:array
  //     })
  //     console.log(array)
  //     // setTimeout(() => {
  //     //   console.log(array)
        
  //     // }, 0);
  //     // console.log(that.data.myactivitylist)
  //   })
  // },


  async onShow() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var array = []
    var that = this
    // console.log(activitiy_table)
    async function hh() {
      for(var i=0;i<app.globalData.activity_title.length;++i){
        await db.collection(app.globalData.activity_title[i]).where({
          _id: _.in(app.globalData.my_activities)
        }).get().then((res)=>{
          for(var j=0;j<res.data.length;++j){
            var activity = {
              "id": res.data[j]._id,
              "name": res.data[j].name,
              "head": res.data[j].headimage,
              "date": res.data[j].date,
              "intro": res.data[j].intro
            }
            array.push(activity)
          }
        })
      }
    }
    await hh()
    console.log(array)
    that.setData({
      myactivitylist:array
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