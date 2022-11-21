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
    chosen_tag: [[], [], []],
    tagNum: 0,
    chosenNum: 0,
    limit: 5,
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
    // 每次弹窗都初始化radiogroup
    console.log("pop");
    let tag = this.data.tag;
    for (let i = 0, len = tag.length; i < len; ++ i) {
      tag[i].checked = false;
    }
    this.setData({
      tag
    })
    // 将mytag中的值对应的checkbox打勾并让chosen_tag与mytag同步
    const mytag = this.data.mytag;
    const tagNum = this.data.tagNum;
    const limit = this.data.limit;
    let small_tag = this.data.small_tag;
    this.setData({
      chosen_tag: mytag,
      chosenNum: tagNum
    })
    // 若此时tagNum已经到达limit，则让除mytag外的checkbox不能被点击
    if (tagNum == limit) {
      // 先全都不能被点击
      for (let i = 0, len = small_tag.length; i < len; i++) {
        for (let j = 0, len2 = small_tag[i].length; j < len2; j++) {
          small_tag[i][j].disabled = true; 
        }
      }
      // mytag内的可以被点击
      for (let i = 0, len = mytag.length; i < len; i++) {
        for (let j = 0, len2 = mytag[i].length; j < len2; j++) {
          for (let k = 0, len3 = small_tag[i].length; k < len3; k++) {
            if (mytag[i][j] == small_tag[i][k].name) {
              small_tag[i][k].disabled = false;
            }
          }
        }
      }
    }
    this.setData({
      small_tag,
      now_state:true
    })
  },

  //点击黑色背景触发的事件
  async hideModal(e){
    const chosen_tag = this.data.chosen_tag;
    const chosenNum = this.data.chosenNum;
    console.log("hide");
    this.setData({
      mytag: chosen_tag,
      tagNum: chosenNum
    })
    console.log(this.data.mytag, this.data.tagNum);
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
    // console.log(array)
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
    // 让被选中的radio所对应的checkgroup根据chosen_tag初始化checked
    let tag = this.data.tag;
    for (let i= 0, len = tag.length; i < len; ++ i) {
      tag[i].checked = false;
    }
    this.setData({
      tag
    })
    let i = 0;
    for (let len = tag.length; i < len; ++i) {
      if (tag[i].name === e.detail.value) {
        tag[i].checked = true;
        break;
      }
    }
    
    const chosen_tag = this.data.chosen_tag;
    let small_tag = this.data.small_tag;
    for (let j = 0, len2 = small_tag[i].length; j < len2; j++) {
      small_tag[i][j].checked = false;
    }
    
    for (let j = 0, len2 = chosen_tag[i].length; j < len2; j++) {
      for (let k = 0, len3 = small_tag[i].length; k < len3; k++) {
        if (small_tag[i][k].name == chosen_tag[i][j]) {
          small_tag[i][k].checked = true;
          break;
        }  
      }
    }
    
    
    this.setData({
      tag,
      small_tag
    })
  },

  checkboxChange(e) {
    let chosen_tag = this.data.chosen_tag;
    let chosenNum = this.data.chosenNum;
    const limit = this.data.limit;
    const big = e.currentTarget.dataset.big;
    const value = e.detail.value;
    let small_tag = this.data.small_tag;
    // 如果checkbox的选中数增多，如果此时选中数小于limit，则修改chosen_tag并打勾
    if (value.length > chosen_tag[big].length) {
      if (chosenNum < limit) {
        chosenNum += 1;
        chosen_tag[big] = value;
        const add = value[value.length - 1]
        for (let i = 0, len = small_tag[big].length; i < len; i++) {
          if (small_tag[big][i].name == add) {
            small_tag[big][i].checked = true;
            break;
          }
        }
        // 若增大后的chosenNum到达limit，则让除chosen_tag外的checkbox不能被点击
        if (chosenNum == limit) {
          // 先全禁
          for (let i = 0, len = small_tag.length; i < len; i++) {
            for (let j = 0, len2 = small_tag[i].length; j < len2; j++) {
              small_tag[i][j].disabled = true; 
            }
          }
          // 再去解禁chosen_tag对应的checkbox
          for (let i = 0, len = chosen_tag.length; i < len; i++) {
            for (let j = 0, len2 = chosen_tag[i].length; j < len2; j++) {
              for (let k = 0, len3 = small_tag[i].length; k < len3; k++) {
                if (chosen_tag[i][j] == small_tag[i][k].name) {
                  small_tag[i][k].disabled = false;
                }
              }
            }
          }
        }
      }
    }
    // 如果选中数减少，则去寻找被取消的checkbox，让其取消打勾
    else if (value.length < chosen_tag[big].length){
      let drop;
      for (let i = 0, len = chosen_tag[big].length; i < len; i++) {
        let flag = 0;
        for (let j = 0, len2 = value.length; j < len2; j++) {
          if (value[j] == chosen_tag[big][i]) {
            flag = 1;
            break
          }
        }
        if (!flag) {
          drop = chosen_tag[big][i];
          break;
        }
      }
      for (let i = 0, len = small_tag[big].length; i < len; i++) {
        if (small_tag[big][i].name == drop) {
          small_tag[big][i].checked = false;
          break;
        }
      }
      // 如果减少前的chosenNum达到limit，则全体解禁
      if (chosenNum == limit) {
        for (let i = 0, len = small_tag.length; i < len; i++) {
          for (let j = 0, len2 = small_tag[i].length; j < len2; j++) {
            small_tag[i][j].disabled = false;
          }
        }
      }
      chosen_tag[big] = value;
      chosenNum -= 1;
    } 

    this.setData({
      chosen_tag,
      chosenNum,
      small_tag
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
    const mytag = this.data.mytag;
    let num = 0;
    for (let i = 0, len = mytag.length; i < len; i++) {
      num += mytag[i].length
    }
    this.setData({
      tagNum: num
    })
    console.log(this.data.mytag, this.data.tagNum);
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
  tagConfirm() {
    const chosen_tag = this.data.chosen_tag;
    const chosenNum = this.data.chosenNum;
    console.log("hide");
    this.setData({
      mytag: chosen_tag,
      tagNum: chosenNum
    })
    console.log(this.data.mytag, this.data.tagNum);
    this.hideModal();
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