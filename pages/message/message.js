
const host = require('../../config').host;

Page({
    data: {

    },
    onLoad: function () {

    },
    formSubmit: function(e) {
        var formData = e.detail.value;
        wx.request({
            url: host + "/api/message",
            data: formData,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            success: function(res) {
                if (res.data == "success") { 
                    wx.showToast({
                        title: '留言成功',
                        icon: 'success'
                    })
                }
            }
        });
    }
})
