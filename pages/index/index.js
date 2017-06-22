//index.js

var WxParse = require('../../wxParse/wxParse.js');
const host = require('../../config').host;

Page({
    data: {
        imgUrls: null,
        imgBusiness: null,
        topProductList: null,
        topNewsList: null,
        midNewsList: null,
        topCaseList: null,
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        selected:true,
        selected1:false,
    },
        selected:function(e){
        this.setData({
            selected1:false,
            selected:true
        })
    },
    selected1:function(e){
        this.setData({
            selected:false,
            selected1:true
        })
    },
    onLoad: function() {
        var that = this;
        wx.request({
            url: host+'/api/ads/index/cid/1',
            success: function(res) {
                that.setData({
                    imgUrls: res.data
                });
            }
        }); 
        wx.request({
            url: host+'/api/ads/index/cid/6',
            success: function(res) {
                that.setData({
                    imgBusiness: res.data
                });
            }
        }); 
        wx.request({
            url: host+'/api/info/index/nums/2/recom/1/id/1',
            success: function(res) {
                that.setData({
                    topNewsList: res.data
                });
            }
        });  
        wx.request({
            url: host+'/api/info/index/nums/2/recom/1/id/3',
            success: function(res) {
                that.setData({
                    midNewsList: res.data
                });
            }
        });  
        wx.request({
            url: host+'/api/product/index/nums/4/recom/1',
            success: function(res) {
                that.setData({
                    topProductList: res.data
                });
            }
        }); 
            wx.request({
            url: host+'/api/case/index/nums/6/recom/1',
            success: function(res) {
                that.setData({
                    topCaseList: res.data
                });
            }
        }); 

    wx.request({
            url: host+'/api/delimit/index/labelname/ht1',
            success: function(res) {
                WxParse.wxParse('ht1', 'html', res.data.labelcontent, that);
            }
        }); 

        wx.request({
            url: host+'/api/delimit/index/labelname/contact',
            success: function(res) {
                WxParse.wxParse('contact', 'html', res.data.labelcontent, that);
            }
        });  
        wx.request({
            url: host+'/api/delimit/index/labelname/about',
            success: function(res) {
                WxParse.wxParse('about', 'html', res.data.labelcontent, that);
            }
        });   
    },
    onPullDownRefresh: function() {
        this.onLoad();
        wx.stopPullDownRefresh();
    },
    onShareAppMessage: function () {
        return {
            title: '德诺机电设备小程序',
            path: '/pages/index/index'
        }
    }
})



