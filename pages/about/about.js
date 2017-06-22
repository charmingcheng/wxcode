
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
const host = require('../../config').host;
var url = host + "/api/about/page/id/";
var id = 1;

var pageContent = function(that) {
    wx.showToast({title: '加载中', icon: 'loading'});
    wx.request({
        url: url + id,
        success: function(res) {
            that.setData({
                pageData: res.data
            });
            console.log(res.data.content);
            WxParse.wxParse('content', 'html', res.data.content, that);
            setTimeout(function() {
                wx.hideToast();
            },1000);
        }
    });
};

Page({
	data: {
		pageCate: null,
        content: '',
        pageData: [],
        active: [0, 'active']
	},
    updatePageContent: function(e) {
        var that = this;
        id = e.target.dataset.id;

        // 高亮显示当前分类
        var active = [];
        active[id] = 'active';

        that.setData({
            active: active
        });  

        pageContent(that);
    },
  	onLoad: function (e) {
        var that = this;

        if (e.id) {
            id = e.id;
            // 高亮显示当前分类
            var active = [];
            active[id] = 'active';

            that.setData({
                active: active
            });  
        }

        pageContent(that);
        
        wx.request({
            url: host + '/api/about/cate/cid/1',
            success: function(res) {
                that.setData({
                    pageCate: res.data
                });
            }
        });

        
	},
    onPullDownRefresh: function() {
        var that = this;
        wx.request({
            url: url + id,
            success: function(res) {
                that.setData({
                    pageData: res.data
                });
                WxParse.wxParse('content', 'html', res.data.content, that);
                setTimeout(function() {
                    wx.hideToast();
                },1000);
            }
        });
        wx.stopPullDownRefresh();
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title: that.data.pageData.title,
            path: '/pages/about/about?id=' + id
        }
    }
})
