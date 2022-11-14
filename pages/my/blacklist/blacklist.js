// pages//friend.js
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data:{
    blacklist:[]
  },
  async intohmd(e) {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var num=e.currentTarget.dataset.num
    var that=this
    if(this.data.blacklist[num].in_hmd==1) {
      this.data.blacklist[num].in_hmd=0
      async function del_hmd() {
        for(var i=0;i<app.globalData.my_hmd.length;++i) {
          if(app.globalData.my_hmd[i]==that.data.blacklist[num].id) {
            app.globalData.my_hmd.splice(i,1)
          }
        }
      }
      await del_hmd()
      db.collection("user").where({
        _id: app.globalData.my_id
      })
      .update({
        data: {
          hmd: _.set(app.globalData.my_hmd)
        }
      })
    }
    else {
      this.data.blacklist[num].in_hmd=1
      async function join_hmd() {
        app.globalData.my_hmd.push(that.data.blacklist[num].id)
      }
      await join_hmd()
      db.collection("user").where({
        _id: app.globalData.my_id
      })
      .update({
        data: {
          hmd: _.set(app.globalData.my_hmd)
        }
      })
    }
    var array = this.data.blacklist
    this.setData({
      blacklist: array
    })
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
    var array = []
    var that = this;
    db.collection('user').where({
      _id:_.in(app.globalData.my_hmd)
    }).get().then(
      (res)=>{
        for(var i=0;i<res.data.length;++i){
          var hmd={
            "num": i,
            "id": res.data[i]._id,
            "head": res.data[i].head_img,
            "name": res.data[i].name,
            "intro": res.data[i].intro,
            "friend_tag": res.data[i].tags,
            "sex": res.data[i].sex,
            "in_hmd": 1
          }
          array.push(hmd)
        }
      }
    ).then(()=>{
      // console.log("wuyu")
      that.setData({
        blacklist: array
      })
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