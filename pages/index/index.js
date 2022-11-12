// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    //new here
    float_flag: 0,
    join_activity_id: "",
    activity_detail: {
      name: "傻逼微信小程序",
      people_now: 1,
      people_need: 11,
      date: "2022-11-12",
      intro: "不如礼拜天，一个雪糕的境界再高，他也不可能高过礼拜天的方糕。一个人不吃礼拜天的方糕，他可能是觉得自己已经达到山顶了，但其实还在山底。雪糕店那么多雪糕进去逛一圈我只买礼拜天，钟薛高被我视若无睹，可怜的十几块钱的网红雪糕被礼拜天的方糕踩在脚下狠狠地碾压。是的，礼拜天在宣告他的皇帝地位，it deserves this，待到每年的夏季，所有雪糕就会举办一场加冕仪式，欢迎他们的皇帝——礼拜天方糕。吃雪糕，我只吃礼拜天方糕。"
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
      console.log(res);
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        console.log('name', k, " ", res.data[k].name); {
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
        console.log('element', k, " ", element);
        console.log('temp', k, " ", temp);
        a.push(temp);
        console.log('a', k, " ", a);
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
      console.log(res);
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        console.log('name', k, " ", res.data[k].name); {
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
        console.log('element', k, " ", element);
        console.log('temp', k, " ", temp);
        a.push(temp);
        console.log('a', k, " ", a);
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
      console.log(res);
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        console.log('name', k, " ", res.data[k].name); {
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
        console.log('element', k, " ", element);
        console.log('temp', k, " ", temp);
        a.push(temp);
        console.log('a', k, " ", a);
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
      console.log(res);
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        console.log('name', k, " ", res.data[k].name); {
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
        console.log('element', k, " ", element);
        console.log('temp', k, " ", temp);
        a.push(temp);
        console.log('a', k, " ", a);
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
    // console.log('database_id',)
    // console.log('code',code[2])
    async function f() {
      const res = await db.collection(database_id[code[0]][code[2]]).get();
      console.log(res);
      lengthAllSport = res.data.length;
      for (var k = 0; k < lengthAllSport; ++k) {
        console.log('name', k, " ", res.data[k].name); {
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
        console.log('element', k, " ", element);
        console.log('temp', k, " ", temp);
        a.push(temp);
        console.log('a', k, " ", a);
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
  showfloat: function (e) {
    var id = e.currentTarget.id;
    console.log(id);
    this.setData({
      float_flag: 1
    })
    //获取活动详情数据
  },
  //关闭悬浮窗
  closefloat() {
    this.setData({
      float_flag: 0
    })
  }
})