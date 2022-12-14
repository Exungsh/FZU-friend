// pages/comment/comment.js
//index.js
//实现函数
const app = getApp()
Page({
  data: {
    datadict: {
      people: [],
      comment: [],
    },
    detail_dict: {
      name: "Exungsh",
      sex: "1",
      head: "",
      intro: "This is a test",
      follow_flag: 0,
      black_flag: 0
    },
    post_value: "",
    name: "",
    id: "",
    head: "",
    members: [],
    form_kind: "",
    active_id: "",
    detail_flag: 0,
    detail_id: ""
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
      wx.cloud.database().collection(form_kind).doc(active_id).get().then(res => {
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
  async onShow(options) {
    setInterval(() => {
      var that = this
      wx.cloud.database().collection(this.data.form_kind).doc(this.data.active_id).get()
        .then(
          res => {
            that.data.datadict.comment = res.data.comment
          }
        )
      var temp = that.data.datadict
      that.setData({
        datadict: temp
      })
    }, 1000)
  },
  onReady() {},
  async onLoad(options) {
    var that = this
    that.setData({
      name: app.globalData.my_name,
      id: app.globalData.my_id,
      head: app.globalData.head_img,
      form_kind: options.form_kind,
      active_id: options.active_id
    })
    await this.get_activeinfo(options.form_kind, options.active_id).then(res => {
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
      datadict: temp
    })
  },
  // 提交留言
  async post_send() {
    var that = this
    await wx.cloud.database().collection(this.data.form_kind).doc(this.data.active_id).get()
      .then(
        res => {
          that.data.datadict.comment = res.data.comment
        }
      )
    var commentItem = {}
    var comment = this.data.datadict.comment
    if (this.data.post_value.length <= 0) {
      wx.showToast({
        icon: 'none',
        title: '内容不能为空',
        duration: 800
      })
      return
    }
    commentItem.name = this.data.name
    commentItem.comment = this.data.post_value
    comment.push(commentItem)
    wx.cloud.database().collection(this.data.form_kind).doc(this.data.active_id).update({
      data: {
        comment: comment
      },
      success(res) {
        console.log('评论更新成功', res)
        that.data.datadict.comment = comment
        let temp = that.data.datadict
        that.setData({
          datadict: temp
        })
        wx.showToast({
          title: '发送成功',
          duration: 800
        })
      },
      fail(err) {
        console.log('评论更新失败', err)
      }
    })
    this.setData({
      post_value: ""
    })
    setTimeout(() => {
      wx.pageScrollTo({
        scrollTop: 1000000000,
        duration: 300
      })
    }, 300);

  },
  close_detail() {
    this.setData({
      detail_flag: 0
    })
  },
  async open_detail(e) {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var _id = e.currentTarget.id
    var is_follow = -1;
    var is_hmd = -1;
    var that = this
    console.log(app.globalData.my_hmd)
    async function wait() {
      for (var i = 0; i < app.globalData.my_follow.length; ++i) {
        if (app.globalData.my_follow[i] == _id) {
          is_follow = 1;
        }
      }
      for (var i = 0; i < app.globalData.my_hmd.length; ++i) {
        if (app.globalData.my_hmd[i] == _id) {
          is_hmd = 1;
        }
      }
    }
    await wait()
    db.collection('user').where({
        _id: _id
      }).get()
      .then((res) => {
        var people = {
          id: _id,
          name: res.data[0].name,
          sex: res.data[0].sex,
          head: res.data[0].head_img,
          intro: res.data[0].intro,
          follow_flag: is_follow,
          black_flag: is_hmd
        }
        this.setData({
          detail_dict: people,
          detail_flag: 1,
          detail_id: e.currentTarget.id
        })
      })
  },
  async follow() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    if (app.globalData.my_id == this.data.detail_id) {
      wx.showToast({
        title: '不能关注自己',
        icon: "none",
        duration: 1000
      })
    } else {
      async function wait() {
        if (that.data.detail_dict.follow_flag == 1) { //准备取关
          for (var i = 0; i < app.globalData.my_follow.length; ++i) {
            if (app.globalData.my_follow[i] == that.data.detail_dict.id) {
              app.globalData.my_follow.splice(i, 1)
            }
          }
        } else { //关注
          app.globalData.my_follow.push(that.data.detail_dict.id)
        }
      }
      await wait()
      var people = this.data.detail_dict
      people.follow_flag *= -1
      db.collection('user').where({
          _id: app.globalData.my_id
        })
        .update({
          data: {
            my_follow: _.set(app.globalData.my_follow)
          }
        })
      this.setData({
        detail_dict: people
      })
    }
  },
  async black() {
    wx.cloud.init({
      env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    if (app.globalData.my_id == this.data.detail_id) {
      wx.showToast({
        title: '不能拉黑自己',
        icon: "none",
        duration: 1000
      })
    } else {
      async function wait() {
        if (that.data.detail_dict.black_flag == 1) { //准备取关
          for (var i = 0; i < app.globalData.my_hmd.length; ++i) {
            if (app.globalData.my_hmd[i] == that.data.detail_dict.id) {
              app.globalData.my_hmd.splice(i, 1)
            }
          }
        } else { //关注
          app.globalData.my_hmd.push(that.data.detail_dict.id)
        }
      }
      await wait()
      var people = this.data.detail_dict
      people.black_flag *= -1
      db.collection('user').where({
          _id: app.globalData.my_id
        })
        .update({
          data: {
            hmd: _.set(app.globalData.my_hmd)
          }
        })
      this.setData({
        detail_dict: people
      })
    }
  },
})