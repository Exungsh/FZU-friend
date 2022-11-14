// pages/my/myFriends/myFriends.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendlist:[]
  },
  async follow(e) {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var num=e.currentTarget.dataset.num
    var that=this
    if(this.data.friendlist[num].in_friend==1) {//取关
      this.data.friendlist[num].in_friend*=-1
      async function del_friend() {
        //删除关注
        for(var i=0;i<app.globalData.my_follow.length;++i) {
          if(app.globalData.my_follow[i]==that.data.friendlist[num].id) {
            app.globalData.my_follow.splice(i,1)
          }
        }
        //删除朋友
        for(var i=0;i<app.globalData.my_friend.length;++i) {
          if(app.globalData.my_friend[i]==that.data.friendlist[num].id) {
            app.globalData.my_friend.splice(i,1)
          }
        }
      }
      await del_friend()
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
      this.data.friendlist[num].in_friend*=-1
      async function join_friend() {
        app.globalData.my_follow.push(that.data.friendlist[num].id)
        app.globalData.my_friend.push(that.data.friendlist[num].id)
      }
      await join_friend()
      db.collection("user").where({
        _id: app.globalData.my_id
      })
      .update({
        data: {
          my_follow: _.set(app.globalData.my_follow)
        }
      })
    }
    var array = this.data.friendlist
    this.setData({
      friendlist: array
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
  onShow() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var array = []
    var that = this;
    db.collection('user').where({
      _id:_.in(app.globalData.my_friend)
    }).get().then(
      (res)=>{
        for(var i=0;i<res.data.length;++i){
          var friend={
            "num": i,
            "id": res.data[i]._id,
            "head": res.data[i].head_img,
            "name": res.data[i].name,
            "intro": res.data[i].intro,
            "friend_tag": res.data[i].tags,
            "sex": res.data[i].sex,
            "in_friend": 1
          }
          array.push(friend)
        }
      }
    ).then(()=>{
      that.setData({
        friendlist: array
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