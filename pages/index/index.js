// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    bigtag:"0",
    smalltag:"0",
    isChecked: null,
    showtaglist: [],
    showactivitylist: [],
    datadict : [{
        "taglist": [{
            "id": 0,
            "tag": "sport0"
          },
          {
            "id": 1,
            "tag": "sport1"
          }
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
            "tag": "food0"
          },
          {
            "id": 1,
            "tag": "food1"
          }
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
            "id": "0",
            "name": "foood0",
            "head": "",
            "date": "2022-11-09",
            "intro": "This is a test introduce, I have to type a lot of words to reach the second line.And this is a test of overflow."
          }],
        ]
      }, {
        "taglist": [{
            "id": 0,
            "tag": "entertain0"
          },
          {
            "id": 1,
            "tag": "entertain1"
          }
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
    ]

  },
  choiceStatus: function (e) {
    var code = e.currentTarget.id;
    this.setData({
      isChecked: code,
      smalltag:code[2]
    });
    this.setData({
      showactivitylist:this.data.datadict[this.data.bigtag]["activitylist"][this.data.smalltag]
    });
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {},
  onReady(){
    this.setData({
      showtaglist: this.data.datadict[0]["taglist"],
      bigtag:"0"
    }),
    this.setData(
      {
        isChecked:"0_0",
        showactivitylist:this.data.datadict[0]["activitylist"][0]
      }
    )
  },
  publish() {
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  },
  sport() {
    this.setData({
      showtaglist: this.data.datadict[0]["taglist"],
      bigtag:"0",
      nav1bgc: "#f0f9f6",
      nav1color: "#588c7e",
      nav2bgc: "#588c7e",
      nav2color: "#f0f9f6",
      nav3bgc: "#588c7e",
      nav3color: "#f0f9f6",
    }),
    this.setData(
      {
        isChecked:"0_0",
        showactivitylist:this.data.datadict[0]["activitylist"][0]
      }
    )
  },
  food() {
    this.setData({
      showtaglist: this.data.datadict[1]["taglist"],
      bigtag:"1",
      nav1color: "#f0f9f6",
      nav1bgc: "#588c7e",
      nav2color: "#588c7e",
      nav2bgc: "#f0f9f6",
      nav3bgc: "#588c7e",
      nav3color: "#f0f9f6",
    });
    this.setData(
      {
        isChecked:"1_0",
        showactivitylist:this.data.datadict[1]["activitylist"][0]
      }
    )
  },
  entertain() {
    this.setData({
      showtaglist: this.data.datadict[2]["taglist"],
      bigtag:"2",
      nav1color: "#f0f9f6",
      nav1bgc: "#588c7e",
      nav2bgc: "#588c7e",
      nav2color: "#f0f9f6",
      nav3color: "#588c7e",
      nav3bgc: "#f0f9f6",
    });
    this.setData(
      {
        isChecked:"2_0",
        showactivitylist:this.data.datadict[2]["activitylist"][0]
      }
    )
  }
})