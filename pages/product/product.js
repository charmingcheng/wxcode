
const host = require('../../config').host;
var url = host + '/api/product/index/nums/15/p/';
var page = 1;

var getList = function(that) {
    wx.showToast({title: '加载中', icon: 'loading'});
    wx.request({
        url: url + page,
        success: function(res) {
            if (page == 1) {
                that.setData({
                    products: [],
                });  
            }
            that.setData({
                products: that.data.products.concat(res.data.data)
            }); 
            
            page ++;
            setTimeout(function() {
                wx.hideToast();
            },1000);

            if (page > res.data.last_page) {
                that.setData({
                    hasMore: false
                });
            }
        }
    });
};

Page({
	data: {
		products: [],
        productsCategory: null,
        scrollHeight: 0,
        scrollTop: 0,
        active: [0, ''],
        hasMore: true
	},
    productsList: function(e) {
        var that = this;

        var cid = e.target.dataset.cid;
        url = host + '/api/product/index/id/'+ cid +'/nums/15/p/';

        page = 1;

        var active = [];
        active[cid] = 'active';

        that.setData({
            active: active
        });  

        getList(that);
        
    },
  	onLoad: function (e) {
          console.log(e);
        // 在页面展示之后先获取一次数据
        var that = this;

        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    scrollHeight: res.windowHeight - 40
                });
            }
        });

        wx.request({
            url: host + '/api/product/cate',
            success: function(res) {
                that.setData({
                    productsCategory: res.data
                });
            }
        });

        getList(that);  
	},
    scroll: function() {
        //
    },
    updateList: function() {
        var that = this;
        if (!this.data.hasMore) return
        getList(that);
    }
})
