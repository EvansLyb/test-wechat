//index.js

import { getOrgRepos } from '../../apis/index'

//获取应用实例
var app = getApp()

Page({
	data: {
		keyword: '',
		timer: null,
		orgRepos: []
	},
	onLoad: function () {

	},
	searchRepos: function (e) {
		// 防抖控制
		if (this.data.timer != null) {
			clearTimeout(this.data.timer)
		}
		this.data.timer = setTimeout(() => {
			wx.showLoading({
				title: 'searching...',
				mask: true
			})

			let keyword = e.detail.value
			this.setData({keyword: keyword})
			getOrgRepos(keyword).then(res => {
				this.setData({orgRepos: res.data.map(item => item.name)})
				console.log(this.orgRepos)
				wx.hideLoading()
				console.log(res)
			}).catch(err => {
				console.log(err)
				this.orgRepos = []
				wx.hideLoading()
				wx.showToast({
					title: 'Could not find any repo',
					icon: 'none',
					duration: 2000
				})
			})
		}, 800)
	}
});
