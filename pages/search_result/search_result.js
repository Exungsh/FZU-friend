// pages/search_result/search_result.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    search: "",
    result: []
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
        }
        var temp = {
          id: element.id,
          aName: element.name,
          img: element.head,
          time: element.date,
          introduce: element.intro,
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
  }
})