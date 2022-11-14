// pages/publish/publish.js
Page({
  data: {
    date: "请选择日期",
    time: "请选择时间",
    limit: [{
        value: 'noLimit',
        name: '无限制'
      },
      {
        value: 'onlyMale',
        name: '只限男生'
      },
      {
        value: 'onlyFemale',
        name: '只限女生'
      }
    ],
    tag: [{
        value: 'all_sport',
        name: '运动'
      },
      {
        value: 'all_ch',
        name: '吃喝'
      },
      {
        value: 'all_entertainment',
        name: '娱乐'
      }
    ],
    tag_sport: [{
      value: 'Badminton',
      name: '羽毛球'
    }, {
      value: 'Basketball',
      name: '篮球'
    }, {
      value: 'Table_Tennis',
      name: '乒乓球'
    }, {
      value: 'Running',
      name: '跑步'
    }, {
      value: 'Volleyball',
      name: '排球'
    }, {
      value: 'Fitness',
      name: '健身'
    }, {
      value: 'Soccer',
      name: '足球'
    }, {
      value: 'other_movement',
      name: '其他'
    }],
    tag_food: [{
      value: 'Barbecue',
      name: '烧烤'
    }, {
      value: 'malatang',
      name: '麻辣烫'
    }, {
      value: 'drinks',
      name: '饮品'
    }, {
      value: 'hot_pot',
      name: '火锅'
    }, {
      value: 'Japanese_cuisine',
      name: '日料'
    }, {
      value: 'Sichuan_cuisine',
      name: '川菜'
    }, {
      value: 'fried_chicken',
      name: '炸鸡'
    }, {
      value: 'other_ch',
      name: '其他'
    }],
    tag_entertain: [{
        value: 'Games',
        name: '游戏'
      }, {
        value: 'movies',
        name: '电影'
      }, {
        value: 'script_murder',
        name: '剧本杀'
      }, {
        value: 'board_games',
        name: '桌游'
      }, {
        value: 'KTV',
        name: 'KTV'
      }, {
        value: 'room_escape',
        name: '密室逃脱'
      }, {
        value: 'live_house',
        name: 'live house'
      },
      {
        value: 'other_entertainment',
        name: '其他'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
  async formSubmit(e) {
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
    wx.cloud.init();
    const db = wx.cloud.database();
    console.log('名', e.detail.value.big_tag);
    var app = getApp();
    var insert_data = {
        name: e.detail.value.name,
        head: "",
        date: e.detail.value.date,
        intro: e.detail.value.detail,
        people: [{
          "id": app.globalData.my_id,
          "name": app.globalData.my_name,
          "gender": "1",
          "head": app.globalData.head_img,
        }],
        members:[app.globalData.my_id],
        people_cnt: 1,
        people_need: e.detail.value.joinNum,
        place: e.detail.value.place
    }
    //插入大类
    await db.collection(e.detail.value.big_tag).add({
      data: insert_data
    })
    //插入小类
    await db.collection(e.detail.value.small_tag).add({
      data: insert_data
    })
  },
  publish() {
    setTimeout(() => {
      wx.navigateBack({})
    }, 100);

  }
})