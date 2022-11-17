// pages/my/myProfile/myProfile.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    intro: '...',
    sex:'',
    head_img: '',
    hasUserInfo: false,
    mytag: [[], [], []],
    now_state: null,
    tag: [
      {value: 'sport', name: '运动'},
      {value: 'food', name: '吃喝'},
      {value: 'entertain', name: '娱乐'}
    ],
    small_tag: [[{value: 'badminton', name: '羽毛球'}, {value: 'basketball', name: '篮球'}, {value: 'table tennis', name: '乒乓球'}, {value: 'running', name: '跑步'}, {value: 'fitness', name: '健身'},{value: 'volleyball', name: '排球'}, {value: 'football', name: '足球'},  {value: 'tennis', name: '网球'}, {value: 'swimming', name: '游泳'}], 
    [{value: 'barbecue', name: '烧烤'}, {value: 'malatang', name: '麻辣烫'}, {value: 'milk tea', name: '奶茶'}, {value: 'hot pot', name: '火锅'}, {value: 'coffee', name: '咖啡'}, {value: 'Japanese cuisine', name: '日料'}, {value: 'Sichuan Cuisine', name: '川菜'}, {value: 'snack', name: '小吃'}, {value: 'fried chicken', name: '炸鸡'}, {value: 'buffet', name: '自助餐'}], 
    [{value: 'movie', name: '电影'}, {value: 'The script to kill', name: '剧本杀'}, {value: 'role-playing games', name: '桌游'}, {value: 'KTV', name: 'KTV'}, {value: 'Secret room escape', name: '密室逃脱'}, {value: 'live house', name: 'live house'}, {value: 'shopping', name: '逛街'}]]
  },

  getMyInfor: function() {
    wx.cloud.init({
        env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        let userInfo = res.userInfo;
        this.setData({
            hasUserInfo: true,
            head_img: userInfo.avatarUrl,
            name: userInfo.nickName
        })
        app.globalData.my_name=userInfo.nickName
        app.globalData.head_img=userInfo.avatarUrl
        db.collection('user').where({
            _id: app.globalData.my_id
          })
          .update({
            data: {
              name: _.set(this.data.name),
              head_img:_.set(this.data.head_img)
            }
          })
      },
      fail: function() {
        console.log("fail");
      } 
    })
  },

  getName: function(e) {
    this.setData({
      name: e.detail.value
    })
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
  
  change1: function(e) {
    var c1 = this.data.choose1
    wx.cloud.init({
        env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    this.setData({
        choose1: !c1,     
        choose2: c1
    })
    if(this.data.choose1==true) {
        app.globalData.my_sex=1;
        db.collection('user').where({
            _id: app.globalData.my_id
        })
        .update({
            data: {
                sex: _.set(1)
            }
        })
    }
    else {
        app.globalData.my_sex=0;
        db.collection('user').where({
            _id: app.globalData.my_id
        })
        .update({
            data: {
                sex: _.set(0)
            }
        })
    }
  },

  change2: function(e) {
    var c2 = this.data.choose2
    wx.cloud.init({
        env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    this.setData({
        choose2: !c2,       
        choose1: c2
    })
    if(this.data.choose1==true) {
        app.globalData.my_sex=1;
        db.collection('user').where({
            _id: app.globalData.my_id
        })
        .update({
            data: {
                sex: _.set(1)
            }
        })
    }
    else {
        app.globalData.my_sex=0;
        db.collection('user').where({
            _id: app.globalData.my_id
        })
        .update({
            data: {
                sex: _.set(0)
            }
        })
    }
  },

 // 弹窗事件相关
 popWindow(e){
    let tag = this.data.tag;
    let i = 0;
    for (let i = 0, len = tag.length; i < len; ++ i) {
      tag[i].checked = false;
    }
    this.setData({
      tag
    })
    var that = this 
    that.setData({
      now_state:true
    })
    console.log(that.data.now_state);
  },
  //点击黑色背景触发的事件
  async hideModal(e){
    wx.cloud.init({
        env: 'cloud1-3gbbimin78182c5d'
    })
    const db = wx.cloud.database()
    const _ = db.command
    //首先创建一个动画对象（让页面不在是一个“死页面”）
    var mytag=this.data.mytag
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
    var array = []
    async function wait_array() {
        for(var i=0;i<mytag.length;++i) {
            for(var j=0;j<mytag[i].length;++j) {
                array.push(mytag[i][j])
            }
        }
    }
    await wait_array()
    app.globalData.my_tags=array
    console.log(array)
    db.collection('user').where({
        _id: app.globalData.my_id
    })
    .update({
        data: {
            tags: _.set(array)
        }
    })
  },

  //选择标签事件
  radioChange_tag(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let tag = this.data.tag;
    for (let i= 0, len = tag.length; i < len; ++ i) {
      tag[i].checked = false;
    }
    this.setData({
      tag
    })
    let i = 0;
    for (let len = tag.length; i < len; ++i) {
      // tag[i].checked = tag[i].value === e.detail.value
      if (tag[i].name === e.detail.value) break;
    }
    const mytag = this.data.mytag;
    let small_tag = this.data.small_tag;
    for (let j = 0, len2 = small_tag[i].length; j < len2; j++) {
      small_tag[i][j].checked = false;
    }
    
    for (let j = 0, len2 = mytag[i].length; j < len2; j++) {
      for (let k = 0, len3 = small_tag[i].length; k < len3; k++) {
        if (small_tag[i][k].name == mytag[i][j]) {
          small_tag[i][k].checked = true;
          console.log(small_tag[i][k]);
          break;
        }  
      }
    }
    
    tag[i].checked = true;
    this.setData({
      tag,
      small_tag
    })
    console.log(this.data.tag, this.data.small_tag);
  },

  checkboxChange(e) {
    // console.log(e.currentTarget.dataset.big);
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    const big = e.currentTarget.dataset.big;
    const value = e.detail.value;
    let mytag = this.data.mytag;
    mytag[big] = value
    this.setData({
      mytag
    })
    console.log(mytag);
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
    if(app.globalData.my_sex==1) {
        this.setData({
            choose1: true,
            choose2: false
        })
    }
    else {
        this.setData({
            choose1: false,
            choose2: true
        })
    }
    var array=[[],[],[]]
    async function wait_tag(){
        for(var i=0;i<app.globalData.my_tags.length;++i) {
            for(var j=0;j<3;++j) {
                for(var k=0;k<app.globalData.all_tags[j].length;++k) {
                    if(app.globalData.my_tags[i]==app.globalData.all_tags[j][k]) {
                        array[j].push(app.globalData.my_tags[i])
                    }
                }
            }
        }
    }
    await wait_tag()
    this.setData({
      name: app.globalData.my_name,
      intro: app.globalData.userInfo,
      head_img: app.globalData.head_img,
      mytag: array
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