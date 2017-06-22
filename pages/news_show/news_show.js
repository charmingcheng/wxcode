
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
const host = require('../../config').host;
var id = 0;

Page({
	data: {
		show: null
	},
  	onLoad: function (e) {
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        });
        id = e.id;
        this.loadData();
	},
    loadData: function() {
        var that = this;
        wx.request({
            url: host + '/api/info/detail/id/' + id,
            success: function(res) {
                res.data.date = util.formatTime(new Date(res.data.timeline*1000));
                that.setData({
                    show: res.data
                });
                // 解析html
                WxParse.wxParse('newsShow', 'html', res.data.content, that);
                // wx.hideToast();
            }
        });
    },
    onPullDownRefresh: function() {
        this.loadData();
        wx.stopPullDownRefresh();
    } 
})
