// pages/my/myFriends/myFriends.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now:1,
    total:0,
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
  async onShow() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var array = []
    var that = this;

    var a_friend=[]
    var a_fan=[]
    //可以添加更新friend和fan


    var countResult = db.collection('user').where({
      _id:_.in(app.globalData.my_friend)
    }).count()
    db.collection('user').where({
      _id:_.in(app.globalData.my_friend)
    }).skip(0).limit(app.globalData.max_limit).get().then(
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
            "in_friend": 1,
            "is_fzu": res.data[i].is_fzu
          }
          array.push(friend)
        }
      }
    ).then(()=>{
      that.setData({
        friendlist: array,
        total: countResult.total,
        now: 1
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
  async onPullDownRefresh() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var array = []
    var that = this;

    var a_friend=[]
    var a_fan=[]
    async function wait_ff(){
      var countResult = await db.collection('user').where({
        my_follow: _.all([app.globalData.my_id])
      }).count()
      var total = Math.ceil(countResult.total/20)
      for(var i=0;i<total;++i) {
        var res = await db.collection('user').where(
          {my_follow: _.all([app.globalData.my_id])}
        ).skip(i*20).limit(20).get()
        for(var j=0;j<res.data.length;++j) {
          a_fan.push(res.data[j]._id)
          for(var k=0,l=j;k<app.globalData.my_follow.length;++k){
            if(app.globalData.my_follow[k]==res.data[l]._id) {
              a_friend.push(res.data[l]._id)
            }
          }
        }     
      }
    }
    await wait_ff()
    app.globalData.my_fan=a_fan
    app.globalData.my_friend=a_friend
    var countResult = db.collection('user').where({
      _id:_.in(app.globalData.my_friend)
    }).count()
    db.collection('user').where({
      _id:_.in(app.globalData.my_friend)
    }).skip(0).limit(app.globalData.max_limit).get().then(
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
            "in_friend": 1,
            "is_fzu": res.data[i].is_fzu
          }
          array.push(friend)
        }
      }
    ).then(()=>{
      that.setData({
        friendlist: array,
        total: countResult.total,
        now: 1
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var array = this.data.friendlist
    if(this.data.now*app.globalData.max_limit>this.data.total){
      
      return 
    }
    else {
      db.collection('user').where({
        _id:_.in(app.globalData.my_friend)
      }).skip(this.data.now*app.globalData.max_limit).limit(app.globalData.max_limit).get().then(
        (res)=>{
          for(var i=0;i<res.data.length;++i){
            var friend={
              "num": this.data.now*app.globalData.max_limit+i,
              "id": res.data[i]._id,
              "head": res.data[i].head_img,
              "name": res.data[i].name,
              "intro": res.data[i].intro,
              "friend_tag": res.data[i].tags,
              "sex": res.data[i].sex,
              "in_follow": 1,
              "is_fzu": res.data[i].is_fzu
            }
            array.push(friend)
          }
        }
      ).then(()=>{
        this.data.now++;
        this.setData({
          friendlist:array
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})