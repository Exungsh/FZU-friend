// pages/comment/comment.js
//index.js
//实现函数
const app = getApp()
Page({
  data: {
    datadict: {
      // name: "活动_Activity_test",
      // date: "2044-44-44",
      // time: "26:89",
      // place: "FFFFFzu",
      // intro: "hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha",
      people: [
        // {
        //   "id": "0",
        //   "name": "people0",
        //   "gender": "0",
        //   "head": ""
        // },
        // {
        //   "id": "1",
        //   "name": "people1",
        //   "gender": "1",
        //   "head": ""
        // },
        // {
        //   "id": "0",
        //   "name": "people0",
        //   "gender": "1",
        //   "head": ""
        // },
        // {
        //   "id": "0",
        //   "name": "people0",
        //   "gender": "1",
        //   "head": ""
        // },
        // {
        //   "id": "0",
        //   "name": "people0",
        //   "gender": "1",
        //   "head": ""
        // },
        // {
        //   "id": "0",
        //   "name": "people0",
        //   "gender": "1",
        //   "head": ""
        // },
        // {
        //   "id": "0",
        //   "name": "people0",
        //   "gender": "1",
        //   "head": ""
        // },
        // {
        //   "id": "0",
        //   "name": "people0",
        //   "gender": "1",
        //   "head": ""
        // },
        // {
        //   "id": "0",
        //   "name": "people0",
        //   "gender": "1",
        //   "head": ""
        // },
      ],
      comment: [
        // {
        //   name: "Exungsh",
        //   comment: "This is a test."
        // },
        // {
        //   name: "Exungsh",
        //   comment: "This is a test when there is a very looooong comment."
        // },
        // {
        //   name: "Exungsh",
        //   comment: "This is a test when there is a very looooong comment."
        // },
        // {
        //   name: "Exungsh",
        //   comment: "This is a test."
        // },
        // {
        //   name: "Exungsh",
        //   comment: "This is a test when there is a very looooong comment."
        // }
      ],
    },
    post_value: "",
    name: "",
    id: "",
    head: "",
    members: [

    ],
    form_kind: "",
    active_id: ""
  },
  close_float() {
    this.setData({
      card_display: "100%",
      small_display: "block",
      holder_display: "0px"
    })
  },
  open_float() {
    this.setData({
      card_display: "3%",
      small_display: "none",
      holder_display: "255px"
    })
  },
  post_input(e) {
    this.setData({
      post_value: e.detail.value
    })
  },
  // 获取留言
  async get_userinfo(id) {
    return new Promise(function (resolve, reject) {
      var peopleItem = {}
      wx.cloud.database().collection('user').where({
        _openid: id
      }).get().then(res => {
        console.log('获取留言用户成功', res)
        peopleItem.id = res.data[0]._openid
        peopleItem.name = res.data[0].name
        peopleItem.gender = res.data[0].sex
        peopleItem.head = res.data[0].head_img
        resolve(peopleItem)
      }).catch(res => {
        console.log('获取留言用户失败', res)
      })
    })
  },
  async get_activeinfo(form_kind, active_id) {
    return new Promise(function (reslove, reject) {
      var datadict = {}
      wx.cloud.database().collection('all_entertainment').doc('4e51c63663778908005be1bd10c5b7bd').get().then(res => {
        console.log('获取信息成功');
        datadict.comment = res.data.comment
        datadict.members = res.data.members
        datadict.name = res.data.name
        datadict.place = res.data.place
        datadict.date = res.data.date
        datadict.time = res.data.time
        datadict.intro = res.data.intro
        reslove(datadict)
      }).catch(res => {
        console.log("获取信息失败")
      })
    })
  },
  async onLoad(options) {
    var that = this
    //  that.data.form_kind = options.form_kind
    //  that.data.active_id = options.active_id
    that.setData({
      name: app.globalData.my_name,
      id: app.globalData.my_id,
      head: app.globalData.head_img
    })
    await this.get_activeinfo().then(res => {
      console.log(res)
      that.data.datadict.date = res.date
      that.data.datadict.comment = res.comment
      that.data.datadict.intro = res.intro
      that.data.datadict.name = res.name
      that.data.datadict.place = res.place
      that.data.datadict.time = res.time
      that.data.members = res.members
    })
    console.log('参加者openid', this.data.members)
    for (var i = 0; i < this.data.members.length; i++) {
      var peopleItem = await this.get_userinfo(this.data.members[i])
      this.data.datadict.people.push(peopleItem)
      console.log("活动信息", this.data.datadict);
    }
    console.log(this.data.datadict.people);
    var temp = this.data.datadict
    this.setData({
      datadict:temp
    })
  },

  // 提交留言
  post_send() {
    var commentItem = {}
    var comment = this.data.datadict.comment
    if (this.data.post_value.length <= 0) {
      wx.showToast({
        icon: 'none',
        title: '内容不能为空',
        duration:800
      })
      return
    }
    commentItem.name = this.data.name
    commentItem.comment = this.data.post_value
    comment.push(commentItem)
    let that = this
    wx.cloud.database().collection('all_entertainment').doc('4e51c63663778908005be1bd10c5b7bd').update({
      data: {
        comment: comment
      },
      success(res) {
        console.log('评论更新成功', res)
        that.data.datadict.comment = comment
        let temp = that.data.datadict
        that.setData({
          datadict:temp
        })
        wx.showToast({
          title: '发送成功',
          duration:800
        })
      },
      fail(err) {
        console.log('评论更新失败', err)
      }
    })
    this.setData({
      post_value:""
    })
  }
})