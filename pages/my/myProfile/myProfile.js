// pages/my/myProfile/myProfile.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    intro: '...',
    head_img: '',
    mytag: [],
    now_state:null,
    tag: [
      {value: 'sport', name: '运动'},
      {value: 'food', name: '吃喝'},
      {value: 'entertain', name: '娱乐'}
    ],
    tag_sport: [
      {value: 'badminton', name: '羽毛球'}, {value: 'basketball', name: '篮球'}, {value: 'table tennis', name: '乒乓球'}, {value: 'running', name: '跑步'}, {value: 'volleyball', name: '排球'}, {value: 'fitness', name: '健身'}, {value: 'football', name: '足球'}
    ],
    tag_food: [
      {value: 'barbecue', name: '烧烤'}, {value: 'malatang', name: '麻辣烫'}, {value: 'drinks', name: '饮品'}, {value: 'hot pot', name: '火锅'}, {value: 'Japanese cuisine', name: '日料'}, {value: 'Sichuan Cuisine', name: '川菜'}, {value: 'fried chicken', name: '炸鸡'}
    ],
    tag_entertain: [
      {value: 'games', name: '游戏'}, {value: 'movie', name: '电影'}, {value: 'script_murder', name: '剧本杀'}, {value: 'board_games', name: '桌游'}, {value: 'KTV', name: 'KTV'}, {value: 'room_escape', name: '密室逃脱'}, {value: 'live house', name: 'live house'}
    ]
  },

  getName: function(e) {
    this.setData({
      name: e.detail.value
    })
    console.log("昵称为： ", this.data.name)
  },

  comfire_name:function(e) {
    this.setData({
      name: e.detail.value
    })
    app.globalData.my_name= this.data.name
    console.log(app.globalData.my_name)
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('user').where({
      _id: app.globalData.my_id
    })
    .update({
      data: {
        name: _.set(this.data.name)
      }
    })
  },

  getIntro: function(e) {
    this.setData({
      intro: e.detail.value
    })
    console.log("简介为： ", this.data.intro)
  },

  comfire_intro: function(e) {
    this.setData({
      intro: e.detail.value
    })
    app.globalData.userInfo= this.data.intro
    console.log(app.globalData.userInfo)
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('user').where({
      _id: app.globalData.my_id
    })
    .update({
      data: {
        intro: _.set(this.data.intro)
      }
    })
  },

  chooseTag: function(e) {
    this.setData({
      mytag: e.detail.value
    })
    console.log("标签为： ", this.data.mytag)
  },

  // 弹窗事件相关
  popWindow(e){
    var that = this 
    that.setData({
      now_state:true
    })
    console.log(that.data.now_state);
 
  },
  //点击黑色背景触发的事件
  hideModal(e){
    //首先创建一个动画对象（让页面不在是一个“死页面”）
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    //animation.translateY(300)中的translate函数是表示在y轴上平移多少px，而后面紧接着的.step表示前面动画的完成，可以开始下一个动画了
    animation.translateY(300).step()
    this.setData({
      /*这里的export函数是导出动画队列，在外米的wxml中会用到该数据，同时export方法在调用完后会清掉前面的动画操作 */
      animationData: animation.export(),
    })
    /*这里的setTimeout是一个延时器，而它在这里延时了200ms，然后在执行动画 */
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        now_state: false,
      })
    }.bind(this), 200)
    var that = this
  },

  //选择标签事件
  radioChange_tag(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const tag = this.data.tag
    for (let i = 0, len = tag.length; i < len; ++i) {
      tag[i].checked = tag[i].value === e.detail.value
    }
    this.setData({
      tag
    })
  },

  radioChange_tag_sport(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const tag_sport = this.data.tag_sport
    for (let i = 0, len = tag_sport.length; i < len; ++i) {
      tag_sport[i].checked = tag_sport[i].value === e.detail.value
    }
    this.setData({
      tag_sport
    })
  },
  radioChange_tag_food(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const tag_food = this.data.tag_food
    for (let i = 0, len = tag_food.length; i < len; ++i) {
      tag_food[i].checked = tag_food[i].value === e.detail.value
    }
    this.setData({
      tag_food
    })
  },
  radioChange_tag_entertain(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const tag_entertain = this.data.tag_entertain
    for (let i = 0, len = tag_entertain.length; i < len; ++i) {
      tag_entertain[i].checked = tag_entertain[i].value === e.detail.value
    }
    this.setData({
      tag_entertain
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      name: app.globalData.my_name,
      intro: app.globalData.userInfo,
      head_img: app.globalData.head_img,
      mytag: app.globalData.my_tags
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