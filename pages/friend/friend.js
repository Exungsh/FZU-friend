// pages/friend/friend.js

const app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    now1:0,
    total1:0,
    now2:0,
    total2:0,
    flag: -1,
    is_friend: false,
    recent_id:[],
    datalist1: [],
    datalist2: [],
    friendlist: []
  },

  async follow(e) {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var that= this
    var _id=e.currentTarget.dataset._id
    var num=e.currentTarget.dataset.num
    if(this.data.flag==-1) {
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

    async function change_follow() {
      if(that.data.friendlist[num].follow==-1){
        for(var i=0;i<app.globalData.my_follow.length;++i) {
          if(app.globalData.my_follow[i]==_id) {
            app.globalData.my_follow.splice(i,1)
          }
        }
      }
      else{
        app.globalData.my_follow.push(_id)
      }
    }
    await change_follow()
    // console.log(app.globalData.my_follow)
    db.collection('user').where({
      _id: app.globalData.my_id
    })
    .update({
      data: {
        my_follow: _.set(app.globalData.my_follow)
      }
    })
  },

  async update_recommend() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    const $ = db.command.aggregate
    var that=this
    let my_tag=app.globalData.my_tags
    var array=[]
    var countResult = await db.collection('user').where({
      _id:_.neq(app.globalData.my_id).and(_.nin(app.globalData.my_hmd)).and(_.nin(app.globalData.my_follow)),
      is_find:_.eq(true),
      tags: _.all([my_tag[0]]).or(_.all([my_tag[1]])).or(_.all([my_tag[2]])).or(_.all([my_tag[3]])).or(_.all([my_tag[4]])).or(_.all([my_tag[5]]))
    }).count()
    var total=countResult.total
    var res_rec = await db.collection('user').where({
      _id:_.neq(app.globalData.my_id).and(_.nin(app.globalData.my_hmd)).and(_.nin(app.globalData.my_follow)),
      is_find:_.eq(true),
      tags: _.all([my_tag[0]]).or(_.all([my_tag[1]])).or(_.all([my_tag[2]])).or(_.all([my_tag[3]])).or(_.all([my_tag[4]])).or(_.all([my_tag[5]]))
    }).skip(0).limit(app.globalData.max_limit).get().then((res)=>{
      for(var j=0;j<res.data.length;++j) {
        var friend= {
          'id': res.data[j]._id,
          'name': res.data[j].name,
          'intro': res.data[j].intro,
          'friend_tag': res.data[j].tags,
          'head': res.data[j].head_img,
          'num':j,
          "sex": res.data[j].sex,
          'follow':-1,
          "is_fzu": res.data[j].is_fzu
        }
        array.push(friend)
      }
    })
    that.setData({
      datalist1: array,
      now1: 1,
      total1: total
    })
  },

  recommend() {
    this.data.flag=-1
    this.setData({
      friendlist: this.data.datalist1,
      nav1bgc: "#f0f9f6",
      nav1color: "#588c7e",
      nav2bgc: "#588c7e",
      nav2color: "#f0f9f6",
    })
  },

  async update_recent() {
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
    async function wait_recent(){
      for(var i=app.globalData.activity_title.length-1;i>=0;--i){
        await db.collection(app.globalData.activity_title[i]).where({
          _id: _.in(app.globalData.my_activities)
        })
        .get().then((res)=>{
          for(var j=0;j<res.data.length;++j){
            recent_id.push.apply(recent_id,res.data[j].members)
          }
        })
      }
    }
    await wait_recent()
    var countResult = await db.collection('user').where({
      _id:_.neq(app.globalData.my_id).and(_.nin(app.globalData.my_hmd)).and(_.nin(app.globalData.my_follow)).and(_.in(recent_id)),
      is_find:_.eq(true)
    }).count()
    var total=countResult.total
    var res_rec = await db.collection('user').where({
      _id:_.neq(app.globalData.my_id).and(_.nin(app.globalData.my_hmd)).and(_.nin(app.globalData.my_follow)).and(_.in(recent_id)),
      is_find:_.eq(true)
    }).skip(0).limit(app.globalData.max_limit).get().then((res)=>{
      for(var j=0;j<res.data.length;++j) {
        var friend= {
          'id': res.data[j]._id,
          'name': res.data[j].name,
          'intro': res.data[j].intro,
          'friend_tag': res.data[j].tags,
          'head': res.data[j].head_img,
          'num':j,
          "sex": res.data[j].sex,
          'follow':-1,
          "is_fzu": res.data[j].is_fzu
        }
        array.push(friend)
      }
    })
    this.setData({
      recent_id: recent_id,
      datalist2: array,
      now2: 1,
      total2: total
    })
  },

  recent() {
    this.data.flag=1
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
  async onLoad(options) {
    // await this.update_recommend()
    // this.recommend()
    // await this.update_recent()
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
  async onShow() {
    this.update_recent()
    await this.update_recommend()
    this.recommend()
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
    if(this.data.flag==-1){
      this.update_recent()
      await this.update_recommend()
      this.recommend()
    }
    else{
      this.update_recommend()
      await this.update_recent()
      this.recent()
    }
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
    var that=this
    var my_tag=app.globalData.my_tags
    if(this.data.flag==-1){
      var array = this.data.datalist1
      if(this.data.now1*app.globalData.max_limit>this.data.total1){
        
        return 
      }
      else{
        db.collection('user').where({
          _id:_.neq(app.globalData.my_id).and(_.nin(app.globalData.my_hmd)).and(_.nin(app.globalData.my_follow)),
          is_find:_.eq(true),
          tags: _.all([my_tag[0]]).or(_.all([my_tag[1]])).or(_.all([my_tag[2]])).or(_.all([my_tag[3]])).or(_.all([my_tag[4]])).or(_.all([my_tag[5]]))
        }).skip(this.data.now1*app.globalData.max_limit).limit(app.globalData.max_limit).get().then(
          (res)=>{
            for(var i=0;i<res.data.length;++i){
              var friend={
                'id': res.data[i]._id,
                'name': res.data[i].name,
                'intro': res.data[i].intro,
                'friend_tag': res.data[i].tags,
                'head': res.data[i].head_img,
                'num': that.data.now1*app.globalData.max_limit+i,
                "sex": res.data[i].sex,
                'follow':-1,
                "is_fzu": res.data[i].is_fzu
              }
              array.push(friend)
            }
          }
        ).then(()=>{
          this.data.now1++;
          this.setData({
            datalist1:array,
            friendlist:array
          })
        })
      }
    }
    else{
      var array = this.data.datalist2
      if(this.data.now2*app.globalData.max_limit>this.data.total2){
        
        return 
      }
      else{
        db.collection('user').where({
          _id:_.neq(app.globalData.my_id).and(_.nin(app.globalData.my_hmd)).and(_.nin(app.globalData.my_follow)).and(_.in(this.data.recent_id)),
          is_find:_.eq(true)
        }).skip(this.data.now2*app.globalData.max_limit).limit(app.globalData.max_limit).get().then(
          (res)=>{
            for(var i=0;i<res.data.length;++i){
              var friend={
                'id': res.data[i]._id,
                'name': res.data[i].name,
                'intro': res.data[i].intro,
                'friend_tag': res.data[i].tags,
                'head': res.data[i].head_img,
                'num': that.data.now2*app.globalData.max_limit+i,
                "sex": res.data[i].sex,
                'follow':-1,
                "is_fzu": res.data[i].is_fzu
              }
              array.push(friend)
            }
          }
        ).then(()=>{
          this.data.now2++;
          this.setData({
            datalist2:array,
            friendlist:array
          })
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    
  }
})