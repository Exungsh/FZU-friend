// pages/friend/friend.js

const app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: -1,
    is_friend: false,
    datalist1: [],
    datalist2: [],
    friendlist: []
  },
  is_myfriend(_id) {
    this.is_friend=false
    for(var i=0;i<app.globalData.my_follow.length;++i) {
      if(_id==app.globalData.my_follow[i]) {
        this.is_friend=true
        app.globalData.my_follow.splice(i,1)
      }
    }
  },
  follow(e) {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var _id=e.currentTarget.dataset._id
    var num=e.currentTarget.dataset.num
    console.log(num)
    if(this.data.flag==1) {
      this.data.datalist1[num].follow*=-1
      this.setData({
        friendlist: this.data.datalist1,
        nav1bgc: "#f0f9f6",
        nav1color: "#588c7e",
        nav2bgc: "#588c7e",
        nav2color: "#f0f9f6",
      })
      if(this.data.datalist1[num].follow==1){
        wx.showToast({
          title: '已关注',
          icon: 'success',
          duration: 1000
        })
      }
      else{
        wx.showToast({
          title: '已取消关注',
          icon: 'success',
          duration: 1000
        })
      }
      for(var i=0;i<this.data.datalist2.length;++i) {
        if(_id==this.data.datalist2[i].id) {
          this.data.datalist2[i].follow=this.data.datalist1[num].follow
        }
      }
    }
    else {
      this.data.datalist2[num].follow*=-1
      console.log(this.data.datalist2[num].follow)
      this.setData({
        friendlist: this.data.datalist2,
        nav1color: "#f0f9f6",
        nav1bgc: "#588c7e",
        nav2bgc: "#f0f9f6",
        nav2color: "#588c7e",
      })
      if(this.data.datalist2[num].follow==1){
        wx.showToast({
          title: '已关注',
          icon: 'success',
          duration: 1000
        })
      }
      else{
        wx.showToast({
          title: '已取消关注',
          icon: 'success',
          duration: 1000
        })
      }
      for(var i=0;i<this.data.datalist1.length;++i) {
        if(_id==this.data.datalist1[i].id) {
          this.data.datalist1[i].follow=this.data.datalist2[num].follow
        }
      }
    }
    this.is_myfriend(_id)
    setTimeout(()=>{
      if(this.is_friend==false) {
        app.globalData.my_follow.push(_id)
      }
    },200)
    setTimeout(()=>{
      db.collection('user').where({
        _id: app.globalData.my_id
      })
      .update({
        data: {
          my_follow: _.set(app.globalData.my_follow)
        }
      })
    },500)
  },
  update_recommend() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    const $ = db.command.aggregate
    let my_tag=app.globalData.my_tags
    var array=[]

    db.collection('user').where({
      _id:_.neq(app.globalData.my_id).and(_.nin(app.globalData.my_hmd)).and(_.nin(app.globalData.my_follow)),
      isfind:_.eq(true),
      friend_tag: _.all([my_tag[0]]).or(_.all([my_tag[1]])).or(_.all([my_tag[2]])).or(_.all([my_tag[3]])).or(_.all([my_tag[4]])).or(_.all([my_tag[5]]))
    })
    .get({
      success: function(res) {
        for(var j=0;j<res.data.length;++j) {
          var friend= {
            'id': res.data[j]._id,
            'name': res.data[j].name,
            'intro': res.data[j].intro,
            'friend_tag': res.data[j].tags,
            'head': res.data[j].head_img,
            'num':j,
            'follow':-1
          }
          array.push(friend)
        }
      }
    })
    setTimeout(()=>{
      this.setData({
        datalist1: array,
        nav1bgc: "#f0f9f6",
        nav1color: "#588c7e",
        nav2bgc: "#588c7e",
        nav2color: "#f0f9f6",
      })
    },500)
  },
  recommend() {
    this.data.flag*=-1
    this.setData({
      friendlist: this.data.datalist1,
      nav1bgc: "#f0f9f6",
      nav1color: "#588c7e",
      nav2bgc: "#588c7e",
      nav2color: "#f0f9f6",
    })
  },
  update_recent() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    const $ = db.command.aggregate
    let my_tag=app.globalData.my_tags
    var activitiy_id=Object.keys(app.globalData.my_activities)
    var activitiy_table=Object.values(app.globalData.my_activities)
    var recent_id=[]
    var array=[]
    
    for(var i=0;i<activitiy_id.length;++i){
      db.collection(activitiy_table[i]).where({
        _id: activitiy_id[i]
      })
      .get({
        success:(res)=>{
          recent_id.push.apply(recent_id,Object.keys(res.data[0].members[0]))
        }
      })
    }
    setTimeout(()=>{
      db.collection('user').where({
        _id:_.neq(app.globalData.my_id).and(_.nin(app.globalData.my_hmd)).and(_.nin(app.globalData.my_follow)).and(_.in(recent_id)),
        isfind:_.eq(true)
      })
      .get({
        success:(res)=>{
          for(var j=0;j<res.data.length;++j) {
            var friend= {
              'id': res.data[j]._id,
              'name': res.data[j].name,
              'intro': res.data[j].intro,
              'friend_tag': res.data[j].tags,
              'head': res.data[j].head_img,
              'num':j,
              'follow':-1
            }
            array.push(friend)
          }
        }
      })
    },500)
    setTimeout(()=>{
      this.setData({
        datalist2: array
      })
    },1000)
  },
  recent() {
    this.data.flag*=-1
    this.setData({
      friendlist: this.data.datalist2,
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
    this.update_recommend()
    this.update_recent()
    setTimeout(()=>{
      this.recommend()
    },500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // this.recommend();
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