// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "请选择日期",
    time: "请选择时间",
    limit: [
      {value: 'noLimit', name: '无限制'},
      {value: 'onlyMale', name: '只限男生'},
      {value: 'onlyFemale', name: '只限女生'}
    ],
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

  },
  bindDateChange(e) {
    let date = e.detail.value;
    this.setData({
      date
    })
  },
  bindTimeChange(e) {
    let time = e.detail.value;
    this.setData({
      time
    })
  },
  radioChange_limit(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const limit = this.data.limit
    for (let i = 0, len = limit.length; i < len; ++i) {
      limit[i].checked = limit[i].value === e.detail.value
    }
    this.setData({
      limit
    })
  },
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
  formSubmit(e) {
    wx.request({
      url: 'url',
      method: 'GET',
      date: e.detail.value,
      success: (res) => {
        console.log("success");
      },
      fail: (res) => {
        console.log("fail");
      }
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})