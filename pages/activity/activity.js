// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否弹出修改活动悬浮窗
    float_flag: 0,
    //修改内容暂存
    date: '',
    time: '',
    place: '',
    //三点相关
    //发起者or参与者
    host_flag: "1",
    choice_host: ["修改活动", "解散活动", ],
    choice_participant: ["退出活动"],

    //活动相关
    activity_detail: {
      "name": "啥比微信小程序",
      "people_now": 9,
      "people_need": 11,
      "date": "2022-11-12",
      "time": "11:35",
      "place": "32#504",
      "intro": "一想到要起床上班，我你吗的这个火噌的一下冒起来了我这个火我真的噌的一下我这个火我真的噌的一下我这个火我真的噌的一下我这个火我真的噌的一下我这个火我真的噌的一下我这个火我真的噌的一下",
      people: [{
          "id": "0",
          "name": "people0",
          "gender": "1",
          "head": ""
        },
        {
          "id": "1",
          "name": "people1",
          "gender": "1",
          "head": ""
        },
        {
          "id": "0",
          "name": "people0",
          "gender": "1",
          "head": ""
        },
        {
          "id": "0",
          "name": "people0",
          "gender": "1",
          "head": ""
        },
        {
          "id": "0",
          "name": "people0",
          "gender": "1",
          "head": ""
        },
        {
          "id": "0",
          "name": "people0",
          "gender": "1",
          "head": ""
        },
        {
          "id": "0",
          "name": "people0",
          "gender": "1",
          "head": ""
        },
        {
          "id": "0",
          "name": "people0",
          "gender": "1",
          "head": ""
        },
        {
          "id": "0",
          "name": "people0",
          "gender": "1",
          "head": ""
        }
      ]
    },
    msgList: [{
        id: '1',
        title: "活动 111",
        date: "2017-12-12",
        time: "44:44",
        place: "China",
        intro: "越努力越幸运。一起来打羽毛球啊啊。越努力越幸运。一起来打羽毛球啊啊。越努力越幸运。一起来打羽毛球啊啊。越努力越幸运。一起来打羽毛球啊啊。越努力越幸运。一起来打羽毛球啊啊。越努力越幸运。一起来打羽毛球啊啊。越努力越幸运。一起来打羽毛球啊啊。",
        host: "1" //发起人id
      }
    ]
  },
  bindor: function (e) {
    var choiceor = []
    var con = this.data.host_flag
    var that = this
    if(con == 1) {
      this.setData({
        choiceor: this.data.choice_host
      })
    }

    else if(con == 0) {
      this.setData({
        choiceor: this.data.choice_participant
      })
    }

    wx.showActionSheet({
      itemList: this.data.choiceor,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)//这里是点击了那个按钮的下标
          //修改活动
          if(!res.tapIndex && con){
            that.setData({
              float_flag: 1,
              'date': that.data.activity_detail.date,
              'time': that.data.activity_detail.time,
              'place': that.data.activity_detail.place
            })
          }
          //解散活动
          else if(res.tapIndex){
            console.log("触发解散活动")
          }
          //退出活动
          else if(!res.tapIndex && !con){
            console.log("触发退出活动")
          }
        }
      }
    })
  },

  //关闭悬浮窗
  closefloat() {
    this.setData({
      float_flag: 0
    })
  },

  //修改活动日期
  bindDateChange: function (e) {
    var that = this
    that.setData({
      'date': e.detail.value
    })
    console.log(that.data.date)
  },

  //修改活动时间
  bindTimeChange: function (e) {
    var that = this
    that.setData({
      'time': e.detail.value
    })
    console.log(that.data.time)
  },

  //修改活动地点
  bindPlaceChange: function (e) {
    var that = this
    that.setData({
      'place': e.detail.value
    })
    console.log(that.data.place)
  },

  //确认修改
  float_confirm: function (e) {
    var that = this
    
    console.log("更改成功!")
    console.log(that.data.date)
    that.closefloat()
  },
  //跳转到对应活动留言板
  jumpToDetail: function () {
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})