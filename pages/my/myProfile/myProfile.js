// pages/my/myProfile/myProfile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    info: '',
    src: '',
    nickName: '',
    intro: '...',
    mytag_sport: [],
    mytag_food: [],
    mytag_entertain: [],
    now_state:null,
    tag: [
      {value: 'sport', name: '运动'},
      {value: 'food', name: '吃喝'},
      {value: 'entertain', name: '娱乐'}
    ],
    tag_sport: [
      {value: 'badminton', name: '羽毛球'}, {value: 'basketball', name: '篮球'}, {value: 'table tennis', name: '乒乓球'}, {value: 'running', name: '跑步'}, {value: 'fitness', name: '健身'},{value: 'volleyball', name: '排球'}, {value: 'football', name: '足球'},  {value: 'tennis', name: '网球'}, {value: 'swimming', name: '游泳'}, {value: 'others', name: '其他'}
    ],
    tag_food: [
      {value: 'barbecue', name: '烧烤'}, {value: 'malatang', name: '麻辣烫'}, {value: 'milk tea', name: '奶茶'}, {value: 'hot pot', name: '火锅'}, {value: 'coffee', name: '咖啡'}, {value: 'Japanese cuisine', name: '日料'}, {value: 'Sichuan Cuisine', name: '川菜'}, {value: 'snack', name: '小吃'}, {value: 'fried chicken', name: '炸鸡'}, {value: 'buffet', name: '自助餐'}, {value: 'others', name: '其他'}
    ],
    tag_entertain: [
       {value: 'movie', name: '电影'}, {value: 'The script to kill', name: '剧本杀'}, {value: 'role-playing games', name: '桌游'}, {value: 'KTV', name: 'KTV'}, {value: 'Secret room escape', name: '密室逃脱'}, {value: 'live house', name: 'live house'}, 
       {value: 'shopping', name: '逛街'}, {value: 'others', name: '其他'}
    ]
  },

  getName: function(e) {
    this.setData({
      name: e.detail.value
    })
    console.log("昵称为： ", this.data.name)
  },

  getIntro: function(e) {
    this.setData({
      intro: e.detail.value
    })
    console.log("简介为： ", this.data.intro)
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

  checkboxChange_tag_sport(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    const value = e.detail.value;
    let mytag_sport = [];
    const tag_sport = this.data.tag_sport;
    for (let i = 0, len = value.length; i < len; ++i) {
      for (let j = 0, len2 = tag_sport.length; j < len2; ++j) {
        if (value[i] == tag_sport[j].value) {
          mytag_sport.push(tag_sport[j].name);
          break;
        }
        else continue;
      }
    }
    this.setData({
      mytag_sport
    })
  },
  checkboxChange_tag_food(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    const value = e.detail.value;
    let mytag_food = [];
    const tag_food = this.data.tag_food;
    for (let i = 0, len = value.length; i < len; ++i) {
      for (let j = 0, len2 = tag_food.length; j < len2; ++j) {
        if (value[i] == tag_food[j].value) {
          mytag_food.push(tag_food[j].name);
          break;
        }
        else continue;
      }
    }
    this.setData({
      mytag_food
    })
  },
  checkboxChange_tag_entertain(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    const value = e.detail.value;
    let mytag_entertain = [];
    const tag_entertain = this.data.tag_entertain;
    for (let i = 0, len = value.length; i < len; ++i) {
      for (let j = 0, len2 = tag_entertain.length; j < len2; ++j) {
        if (value[i] == tag_entertain[j].value) {
          mytag_entertain.push(tag_entertain[j].name);
          break;
        }
        else continue;
      }
    }
    this.setData({
      mytag_entertain
    })
  },
  getMyInfor: function() {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        let userInfo = res.userInfo;
        // console.log(userInfo);
        console.log(this.data.nickName)
        this.setData({
          hasUserInfo: true,
          info: userInfo,
          src: userInfo.avatarUrl,
          nickName: userInfo.nickName
        })
        console.log(this.data.nickName)
      },
      fail: function() {
        console.log("fail");
      } 
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