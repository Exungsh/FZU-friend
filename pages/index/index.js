// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    //new here
    float_flag: 0,
    join_activity_id: "",
    activity_detail: {
      "name": "啥比微信小程序",
      "people_now": 1,
      "people_need": 11,
      "date": "2022-11-12", //后面加上具体时间点
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
    //
    bigtag: "0",
    smalltag: "0",
    isChecked: null,
    showtaglist: [],
    showactivitylist: [],
    datadict: [{
        "taglist": [{
            "id": 0,
            "tag": "全部"
          },
          {
            "id": 1,
            "tag": "跑步"
          },
          {
            "id": 2,
            "tag": "篮球"
          },
          {
            "id": 3,
            "tag": "羽毛球"
          },
          {
            "id": 4,
            "tag": "乒乓球"
          },
          {
            "id": 5,
            "tag": "排球"
          },
          {
            "id": 6,
            "tag": "足球"
          },
          {
            "id": 7,
            "tag": "健身"
          },
          {
            "id": 8,
            "tag": "其他"
          },
        ],
        "activitylist": [
          [{
              "id": "0",
              "name": "sport0",
              "head": "",
              "date": "2022-11-09",
              "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
            },
            {
              "id": "0",
              "name": "sport0",
              "head": "",
              "date": "2022-11-09",
              "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
            }
          ],
          [{
            "id": "1",
            "name": "sport1",
            "head": "",
            "date": "2022-11-09",
            "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
          }],
        ]
      },
      {
        "taglist": [{
            "id": 0,
            "tag": "全部"
          },
          {
            "id": 1,
            "tag": "火锅"
          },
          {
            "id": 2,
            "tag": "烧烤"
          },
          {
            "id": 3,
            "tag": "饮品"
          },
          {
            "id": 4,
            "tag": "日料"
          },
          {
            "id": 5,
            "tag": "川菜"
          },
          {
            "id": 6,
            "tag": "炸鸡"
          },
          {
            "id": 7,
            "tag": "麻辣烫"
          },
          {
            "id": 8,
            "tag": "其他"
          },
        ],
        "activitylist": [
          [{
            "id": "0",
            "name": "food0",
            "head": "",
            "date": "2022-11-09",
            "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
          }],
          [{
            "id": "1",
            "name": "foood0",
            "head": "",
            "date": "2022-11-09",
            "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
          }],
        ]
      }, {
        "taglist": [{
            "id": 0,
            "tag": "全部"
          },
          {
            "id": 1,
            "tag": "游戏"
          },
          {
            "id": 2,
            "tag": "电影"
          },
          {
            "id": 3,
            "tag": "剧本杀"
          },
          {
            "id": 4,
            "tag": "桌游"
          },
          {
            "id": 5,
            "tag": "KTV"
          },
          {
            "id": 6,
            "tag": "密室"
          },
          {
            "id": 7,
            "tag": "live house"
          },
          {
            "id": 8,
            "tag": "其他"
          },




        ],
        "activitylist": [
          [{
            "id": "0",
            "name": "entertain0",
            "head": "",
            "date": "2022-11-09",
            "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
          }],
          [{
            "id": "0",
            "name": "entertainnnn0",
            "head": "",
            "date": "2022-11-09",
            "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
          }]
        ]
      },
    ],
  },
  async onLoad() {
    var sportAller = [];
    var a = [];
    var element = {
      "id": "",
      "name": "",
      "head": "",
      "date": "",
      "intro": ""
    };
    var lengthAllSport = 0;
    wx.cloud.init();
    const db = wx.cloud.database();

    async function f() {
      const res = await db.collection('all_sport').get();
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        {
          element.id = res.data[k]._id;
          element.name = res.data[k].name;
          element.head = res.data[k].head;
          element.date = res.data[k].date;
          element.intro = res.data[k].intro;
        }
        var temp = {
          id: element.id,
          name: element.name,
          head: element.head,
          date: element.date,
          intro: element.intro,
        }
        a.push(temp);
      }
      sportAller.push(a);
    }
    await f();
    this.setData({
      showtaglist: this.data.datadict[0]["taglist"],
      bigtag: "0"
    });
    // 展示具体项目

    this.setData({
      isChecked: "0_0",
      showactivitylist: sportAller[0],
      // showactivitylist: app.globalData.dataSport[0][0]["datadict"][0]["activitylist"][0]
      // showactivitylist:this.data.datadict[0]["activitylist"][0],
    });
  },
  onReady() {},
  //搜索栏
  Search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //右下角加号
  publish() {
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  },
  //切换运动
  //==========sport============
  async sport() {
    this.setData({
        bigtag: "0",
        nav1bgc: "#f0f9f6",
        nav1color: "#588c7e",
        nav2bgc: "#588c7e",
        nav2color: "#f0f9f6",
        nav3bgc: "#588c7e",
        nav3color: "#f0f9f6",
      }),
      this.setData({
        isChecked: "0_0"
      })
    var sportAller = [];
    var a = [];
    var element = {
      "id": "",
      "name": "",
      "head": "",
      "date": "",
      "intro": ""
    };
    var lengthAllSport = 0;
    wx.cloud.init();
    const db = wx.cloud.database();

    async function f() {
      const res = await db.collection('all_sport').get();
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        {
          element.id = res.data[k]._id;
          element.name = res.data[k].name;
          element.head = res.data[k].head;
          element.date = res.data[k].date;
          element.intro = res.data[k].intro;
        }
        var temp = {
          id: element.id,
          name: element.name,
          head: element.head,
          date: element.date,
          intro: element.intro,
        }
        a.push(temp);
      }
      sportAller.push(a);
    }
    await f();
    this.setData({
      showtaglist: this.data.datadict[0]["taglist"],
      bigtag: "0"
    });
    // 展示具体项目

    this.setData({
      isChecked: "0_0",
      showactivitylist: sportAller[0],
    });

  },
  //==========sport============
  //切换吃喝
  //==========food============
  async food() {
    //
    this.setData({
      bigtag: "1",
      nav1color: "#f0f9f6",
      nav1bgc: "#588c7e",
      nav2color: "#588c7e",
      nav2bgc: "#f0f9f6",
      nav3bgc: "#588c7e",
      nav3color: "#f0f9f6",
    });
    this.setData({
      isChecked: "1_0"
    })
    //
    var sportAller = [];
    var a = [];
    var element = {
      "id": "",
      "name": "",
      "head": "",
      "date": "",
      "intro": ""
    };
    var lengthAllSport = 0;
    wx.cloud.init();
    const db = wx.cloud.database();

    async function f() {
      const res = await db.collection('all_ch').get();
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        {
          element.id = res.data[k]._id;
          element.name = res.data[k].name;
          element.head = res.data[k].head;
          element.date = res.data[k].date;
          element.intro = res.data[k].intro;
        }
        var temp = {
          id: element.id,
          name: element.name,
          head: element.head,
          date: element.date,
          intro: element.intro,
        }
        a.push(temp);
      }
      sportAller.push(a);
    }
    await f();
    this.setData({
      showtaglist: this.data.datadict[1]["taglist"],
      bigtag: "1"
    });
    this.setData({
      showactivitylist: sportAller[0],
    });
  },
  //==========吃喝=========
  //切换娱乐
  async entertain() {
    //
    this.setData({
      bigtag: "2",
      nav1color: "#f0f9f6",
      nav1bgc: "#588c7e",
      nav2bgc: "#588c7e",
      nav2color: "#f0f9f6",
      nav3color: "#588c7e",
      nav3bgc: "#f0f9f6",
    });
    this.setData({
      isChecked: "2_0"
    })
    //
    var sportAller = [];
    var a = [];
    var element = {
      "id": "",
      "name": "",
      "head": "",
      "date": "",
      "intro": ""
    };
    var lengthAllSport = 0;
    wx.cloud.init();
    const db = wx.cloud.database();

    async function f() {
      const res = await db.collection('all_entertainment').get();
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        {
          element.id = res.data[k]._id;
          element.name = res.data[k].name;
          element.head = res.data[k].head;
          element.date = res.data[k].date;
          element.intro = res.data[k].intro;
        }
        var temp = {
          id: element.id,
          name: element.name,
          head: element.head,
          date: element.date,
          intro: element.intro,
        }
        a.push(temp);
      }
      sportAller.push(a);
    }
    await f();
    this.setData({
      showtaglist: this.data.datadict[2]["taglist"],
      bigtag: "2"
    });
    this.setData({
      showactivitylist: sportAller[0],
    });
  },
  //改变tag选择栏active样式
  choiceStatus: async function (e) {
    var code = e.currentTarget.id;
    var database_id = [
      ['all_sport', 'Running', 'Basketball', 'Badminton', 'Table_Tennis', 'Volleyball', 'Soccer', 'Fitness', 'other_movement'],
      ['all_ch', 'hot_pot', 'Barbecue', 'drinks', 'Japanese_cuisine', 'Sichuan_cuisine', 'fried_chicken', 'malatang', 'other_ch'],
      ['all_entertainment', 'Games', 'movies', 'script_murder', 'board_games', 'KTV', 'room_escape', 'live_house', 'other_entertainment']
    ]

    var sportAller = [];
    var a = [];
    var element = {
      "id": "",
      "name": "",
      "head": "",
      "date": "",
      "intro": ""
    };
    var lengthAllSport = 0;
    wx.cloud.init();
    const db = wx.cloud.database();
    async function f() {
      const res = await db.collection(database_id[code[0]][code[2]]).get();
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        {
          element.id = res.data[k]._id;
          element.name = res.data[k].name;
          element.head = res.data[k].head;
          element.date = res.data[k].date;
          element.intro = res.data[k].intro;
        }
        var temp = {
          id: element.id,
          name: element.name,
          head: element.head,
          date: element.date,
          intro: element.intro,
        }
        a.push(temp);
      }
      sportAller.push(a);
    }
    await f();

    // 展示具体项目
    this.setData({
      isChecked: code,
      smalltag: code[2]
    });
    this.setData({
      showactivitylist: sportAller[0]
    });
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
        "_id": res.data[0]._id
      }
    }
    var database_id = [
      ['all_sport', 'Running', 'Basketball', 'Badminton', 'Table_Tennis', 'Volleyball', 'Soccer', 'Fitness', 'other_movement'],
      ['all_ch', 'hot_pot', 'Barbecue', 'drinks', 'Japanese_cuisine', 'Sichuan_cuisine', 'fried_chicken', 'malatang', 'other_ch'],
      ['all_entertainment', 'Games', 'movies', 'script_murder', 'board_games', 'KTV', 'room_escape', 'live_house', 'other_entertainment']
    ]
    var page_location = this.data.isChecked;
    var res = await db.collection(database_id[page_location[0]][page_location[2]]).where({
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

    const res = await db.collection(database_id[page_location[0]][page_location[2]]).doc(activity_id).get(); //该分块的数据
    const res2 = await db.collection('user').where({
      _openid: app.globalData.my_id
    }).get();

    var judgeInt = false;

    //变量：大类，用于判断user里面是否存在activities（因为user是用大类的id来标识的）
    var dalei = await db.collection(res.data.big_tag).where({
      date: res.data.date,
      host: res.data.host,
      intro: res.data.intro,
      name: res.data.name,
      place: res.data.place
    }).get();
    await judge();
    async function judge() {
      for (var k = 0; k < res2.data[0].activities.length; k++) {
        if (dalei.data[0]._id == res2.data[0].activities[k]) {
          judgeInt = true;
          console.log("res2.data[0].activities[k]", res2.data[0].activities[k])
        }
      }
    }
    // console.log("dalei：", dalei.data);
    // console.log("judgeInt", judgeInt);
    // console.log("res2.data", res2.data, "dalei.data._id", dalei.data[0]._id);
    //================================================================================================
    if (res.data.people_cnt < res.data.people_need) {
      if (judgeInt) {
        wx.showToast({
          title: '已经参加过了！',
          icon: 'success',
          duration: 1000
        })
      } else {
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
        //===================================================================================================================
        // 如果是大类↓ push大类的activitiesid要在小类也更新。。。 await注意
        if (page_location[2] == 0) {
          await db.collection('user').doc(app.globalData.my_id).update({
            data: {
              activities: _.push(activity_id)
            }
          });
          app.globalData.my_activities.push(activity_id); //因为是大类，所以可以直接用这个push
          await db.collection(res.data.small_tag).where({
            date: res.data.date,
            host: res.data.host,
            intro: res.data.intro,
            name: res.data.name,
            place: res.data.place
          }).update({
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
          })
        }

        //如果不是大类，在大类里面也更新一下
        else if (page_location[2] != 0) {
          await db.collection(database_id[page_location[0]][0]).where({
            date: res.data.date,
            host: res.data.host,
            intro: res.data.intro,
            name: res.data.name,
            place: res.data.place
          }).update({
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