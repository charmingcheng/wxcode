
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
const host = require('../../config').host;
var id = 1;

Page({
	data: {
		product: null
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
            url: host + '/api/case/detail/id/' + id,
            success: function(res) {
                that.setData({
                    case: res.data
                });
                // 解析html
                WxParse.wxParse('content', 'html', res.data.content, that);
                // wx.hideToast();
            }
        });
    },
    onPullDownRefresh: function() {
        this.loadData();
        wx.stopPullDownRefresh();
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title: that.data.case.title,
            path: '/pages/case_show/case_show?id=' + that.data.case.id
        }
    }
})
