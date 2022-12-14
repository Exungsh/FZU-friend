// pages/search_result/search_result.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    search: "",
    result: [],
    float_flag: 0,
    activity_detail: {},
    join_activity_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // console.log(options.search, this.data.search);
    const search = options.search;
    this.setData({
      search
    });
    console.log('搜索内容', this.data.search);
    var search_text = this.data.search;
    // console.log(options.search, this.data.search);
    // this.setData(search, options.search);
    //========================
    var a = [];
    var element = {};
    var sportAller = [];
    var lengthAllSport = 0;
    async function f() {
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        console.log('name', k, " ", res.data[k].name); {
          element.id = res.data[k]._id;
          element.name = res.data[k].name;
          element.head = res.data[k].head;
          element.date = res.data[k].date;
          element.intro = res.data[k].intro;
          element.big_tag = res.data[k].big_tag;
          element.small_tag = res.data[k].small_tag;
        }
        var temp = {
          id: element.id,
          aName: element.name,
          img: element.head,
          time: element.date,
          introduce: element.intro,
          big_tag: element.big_tag,
          small_tag: element.small_tag
        }
        console.log('element', k, " ", element);
        console.log('temp', k, " ", temp);
        a.push(temp);
        console.log('a', k, " ", a);
      }
      sportAller.push(a);
    }

    //========================云

    wx.cloud.init();
    const db = wx.cloud.database();

    //=======================运动==========================
    var res = await db.collection('all_sport').where({
      name: new db.RegExp({
        regexp: search_text,
        options: 'i',
      })
    }).get();
    await f();
    //=======================运动==========================

    //=======================吃喝==========================
    res = await db.collection('all_ch').where({
      name: new db.RegExp({
        regexp: search_text,
        options: 'i',
      })
    }).get();
    await f();
    //=======================吃喝==========================

    //=======================娱乐==========================
    res = await db.collection('all_entertainment').where({
      name: new db.RegExp({
        regexp: search_text,
        options: 'i',
      })
    }).get();
    await f();
    //=======================娱乐==========================
    this.setData({
      search,
      result: sportAller[0],
    });
    if (sportAller[0] == []) {
      this.setData({
        result: [{
          aName: "Not found!"
        }]
      })
      console.log(this.data.result);
    };
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  toSearch() {
    wx.redirectTo({
      url: '/pages/search/search',
    })
  },
  //显示悬浮窗
  showfloat: async function (e) {
    var id = e.currentTarget.id;
    console.log(id);
    wx.cloud.init();
    const db = wx.cloud.database();
    // console.log(this.data.isChecked);
    function set_detail(res) {
      detail = {
        "name": res.data[0].name,
        "people_now": res.data[0].people_cnt,
        "people_need": res.data[0].people_need,
        "date": res.data[0].date,
        "place": res.data[0].place,
        "intro": res.data[0].intro,
        people: res.data[0].people,
        "_id": res.data[0]._id,
        "time": res.data[0].time
      }
    }
    var database_id = [
      ['all_sport', 'Running', 'Basketball', 'Badminton', 'Table_Tennis', 'Volleyball', 'Soccer', 'Fitness', 'other_movement'],
      ['all_ch', 'hot_pot', 'Barbecue', 'drinks', 'Japanese_cuisine', 'Sichuan_cuisine', 'fried_chicken', 'malatang', 'other_ch'],
      ['all_entertainment', 'Games', 'movies', 'script_murder', 'board_games', 'KTV', 'room_escape', 'live_house', 'other_entertainment']
    ]
    var page_location = this.data.isChecked;
    var res = await db.collection(this.data.temp.big_tag).where({
      "_id": id
    }).get();
    var detail = {};
    set_detail(res);

    this.setData({
      float_flag: 1,
      activity_detail: detail
    })
    //获取活动详情数据
  },




  //关闭悬浮窗
  closefloat() {
    this.setData({
      float_flag: 0
    })
  },

  async float_confirm() {
    var activity_id = this.data.activity_detail._id;
    var app = getApp();
    wx.cloud.init();
    const db = wx.cloud.database();
    var database_id = [
      ['all_sport', 'Running', 'Basketball', 'Badminton', 'Table_Tennis', 'Volleyball', 'Soccer', 'Fitness', 'other_movement'],
      ['all_ch', 'hot_pot', 'Barbecue', 'drinks', 'Japanese_cuisine', 'Sichuan_cuisine', 'fried_chicken', 'malatang', 'other_ch'],
      ['all_entertainment', 'Games', 'movies', 'script_murder', 'board_games', 'KTV', 'room_escape', 'live_house', 'other_entertainment']
    ]
    var page_location = this.data.isChecked;
    const _ = db.command;

    const res = await db.collection(database_id[page_location[0]][page_location[2]]).doc(activity_id).get();
    // console.log(app.globalData.my_id);
    const res2 = await db.collection('user').where({
      _id: app.globalData.my_id
    }).get();
    console.log(app.globalData.my_id)
    console.log(res2.data)
    console.log(res2.data[0].activities);
    console.log(activity_id);
    console.log(res2.data[0].activities.indexOf(activity_id));
    //================================================================================================
    if (res.data.people_cnt < res.data.people_need) {
      if (res2.data[0].activities.indexOf(activity_id) == 1) {
        wx.showToast({
          title: '已经参加过了！',
          icon: 'success',
          duration: 1000
        })
      } else {
        //
        db.collection(database_id[page_location[0]][page_location[2]]).doc(activity_id).update({
          data: {
            people_cnt: _.inc(1),
            people: _.push({
              "id": app.globalData.my_id,
              "name": app.globalData.my_name,
              "gender": "1",
              "head": app.globalData.head_img
            }),
            members: _.push(app.globalData.my_id)
          },
        });
        db.collection('user').doc(app.globalData.my_id).update({
          data: {
            activities: _.push(activity_id)
          }
        });
        if (page_location[2] != 0) {
          //如果不是大类，在大类里面也更新一下
          db.collection(database_id[page_location[0]][0]).doc(activity_id).update({
            data: {
              people_cnt: _.inc(1),
              people: _.push({
                "id": app.globalData.my_id,
                "name": app.globalData.my_name,
                "gender": "1",
                "head": app.globalData.head_img
              }),
              members: _.push(app.globalData.my_id)
            },
          });
        }
        wx.showToast({
          title: '参加成功!',
          icon: 'success',
          duration: 1000
        })
      };

    } else {
      wx.showToast({
        title: '活动满人了！',
        icon: 'error',
        duration: 1000
      })
    }
    //================================================================================================
    this.setData({
      float_flag: 0
    })
    //
  }
})