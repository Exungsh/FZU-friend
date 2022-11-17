// pages/my/myFriends/myFriends.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fanlist:[]
  },
  async follow(e) {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var num=e.currentTarget.dataset.num
    var that=this
    if(this.data.fanlist[num].in_follow==1) {//取关
      this.data.fanlist[num].in_follow*=-1
      async function del_follow() {
        //删除关注
        for(var i=0;i<app.globalData.my_follow.length;++i) {
          if(app.globalData.my_follow[i]==that.data.fanlist[num].id) {
            app.globalData.my_follow.splice(i,1)
          }
        }
        //删除朋友
        for(var i=0;i<app.globalData.my_friend.length;++i) {
          if(app.globalData.my_friend[i]==that.data.fanlist[num].id) {
            app.globalData.my_friend.splice(i,1)
          }
        }
      }
      await del_follow()
      db.collection("user").where({
        _id: app.globalData.my_id
      })
      .update({
        data: {
          my_follow: _.set(app.globalData.my_follow)
        }
      })
    }
    else {
      this.data.fanlist[num].in_follow*=-1
      async function join_follow() {
        app.globalData.my_follow.push(that.data.fanlist[num].id)
        for(var i=0;i<app.globalData.my_fan.length;++i) {
          if(that.data.fanlist[num].id==app.globalData.my_fan[i]) {
            for(var j=0;j<app.globalData.my_friend.length;++j) {
              if(that.data.fanlist[num].id==app.globalData.my_friend[j]) {
                app.globalData.my_friend.splice(j,1)
              }
            }
            app.globalData.my_friend.push(that.data.fanlist[num].id)
          }
        }
      }
      await join_follow()
      db.collection("user").where({
        _id: app.globalData.my_id
      })
      .update({
        data: {
          my_follow: _.set(app.globalData.my_follow)
        }
      })
    }
    var array = this.data.fanlist
    this.setData({
      fanlist: array
    })
    // console.log(this.data.friendlist[num].in_friend)
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
    var array = []
    var that = this;
    var res1=db.collection('user').where({
      _id:_.in(app.globalData.my_fan).and(_.in(app.globalData.my_friend))
    }).get().then(
      (res)=>{
        for(var i=0;i<res.data.length;++i){
          var fan={
            "num": i,
            "id": res.data[i]._id,
            "head": res.data[i].head_img,
            "name": res.data[i].name,
            "intro": res.data[i].intro,
            "friend_tag": res.data[i].tags,
            "sex": res.data[i].sex,
            "in_follow": 1
          }
          array.push(fan)
        }
      }
    )
    var res2=db.collection('user').where({
      _id:_.in(app.globalData.my_fan).and(_.nin(app.globalData.my_friend))
    }).get().then(
      (res)=>{
        for(var i=0;i<res.data.length;++i){
          var fan={
            "num": i,
            "id": res.data[i]._id,
            "head": res.data[i].head_img,
            "name": res.data[i].name,
            "intro": res.data[i].intro,
            "friend_tag": res.data[i].tags,
            "sex": res.data[i].sex,
            "in_follow": -1
          }
          array.push(fan)
        }
      }
    )
    await res1
    await res2
    console.log(array)
    that.setData({
      fanlist: array
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