// pages/my/myFriends/myFriends.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now:1,
    total:0,
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
    console.log("123");
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

    var a_friend=[]
    var a_fan=[]
    //可以添加更新friend和fan


    var countResult = db.collection('user').where({
      _id:_.in(app.globalData.my_fan)
    }).count()
    db.collection('user').where({
      _id:_.in(app.globalData.my_fan)
    }).skip(0).limit(app.globalData.max_limit).get().then(
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
            "in_follow": -1,
            "is_fzu": res.data[i].is_fzu
          }
          array.push(fan)
          for(var j=0,k=i;j<app.globalData.my_friend.length;++j){
            if(array[k].id==app.globalData.my_friend[j]) {
              array[k].in_follow=1
            }
          }
        }
      }
    ).then(()=>{
      that.setData({
        fanlist: array,
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
      _id:_.in(app.globalData.my_fan)
    }).count()
    db.collection('user').where({
      _id:_.in(app.globalData.my_fan)
    }).skip(0).limit(app.globalData.max_limit).get().then(
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
            "in_follow": -1,
            "is_fzu": res.data[i].is_fzu
          }
          array.push(fan)
          for(var j=0,k=i;j<app.globalData.my_friend.length;++j){
            if(array[k].id==app.globalData.my_friend[j]) {
              array[k].in_follow=1
            }
          }
        }
      }
    ).then(()=>{
      that.setData({
        fanlist: array,
        total: countResult.total,
        now: 1
      })
    })
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },app.globalData.refresh_time)
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
    var array = this.data.fanlist
    if(this.data.now*app.globalData.max_limit>this.data.total){
      
      return 
    }
    else {
      db.collection('user').where({
        _id:_.in(app.globalData.my_fan)
      }).skip(this.data.now*app.globalData.max_limit).limit(app.globalData.max_limit).get().then(
        (res)=>{
          for(var i=0;i<res.data.length;++i){
            var fan={
              "num": this.data.now*app.globalData.max_limit+i,
              "id": res.data[i]._id,
              "head": res.data[i].head_img,
              "name": res.data[i].name,
              "intro": res.data[i].intro,
              "friend_tag": res.data[i].tags,
              "sex": res.data[i].sex,
              "in_follow": -1,
              "is_fzu": res.data[i].is_fzu
            }
            array.push(fan)
            for(var j=0,k=this.data.now*app.globalData.max_limit+i;j<app.globalData.my_friend.length;++j){
              if(array[k].id==app.globalData.my_friend[j]) {
                array[k].in_follow=1
              }
            }
          }
        }
      ).then(()=>{
        this.data.now++;
        this.setData({
          fanlist:array
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