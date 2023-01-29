$(document).ready(function () {
	var Authorization = "Bearer uskFCYskfXc6KLq0ifa5J4G"
	//判断是否为移动端
	var screen_width = window.screen.width;
	if (screen_width < 500) {
		$('.banner').hide();
		$('.navlogo').attr('width', '40%')
		$('.navsearch').css('margin-left', '1rem')
		$('.con').removeClass('con')
		$('.logo').css('margin-top', '26%')
	}
	mypageNum = "1"
	tabC4D()
	//翻页
	$('.page-item').click(function () {
		$('.page-item').removeClass("active")
		$(this).addClass("active")
		nowpage = $(this).children("a").html()
		switch (nowpage) {
			case "下一页":
				mypageNum++;
				break;
			case "上一页":
				mypageNum--;
				break;
			default:
				mypageNum = nowpage
				break;
		}
		$(".queli").html('');
		tabC4D()
	})

	//切换Tab
	// $('.tabC4D').click(function () {
	// 	mytype = 'C4D';
	// 	$(".queli").html('');
	// 	$(".pagination").show()
	// 	tabC4D()
	// })
	// $('.tabDes').click(function () {
	// 	mytype = 'des';
	// 	$(".queli").html('');
	// 	$(".pagination").hide()
	// 	tabC4D()
	// })

	// mytype = 'C4D';
	// tabC4D()

	//转换时间戳
	function formatDate(d) {
		var now = new Date(parseFloat(d));
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (date >= 0 && date <= 9) {
			date = "0" + date;
		}
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (hour >= 1 && hour <= 9) {
			hour = "0" + hour;
		}
		if (minute >= 0 && minute <= 9) {
			minute = "0" + minute;
		}
		if (second >= 0 && second <= 9) {
			second = "0" + second;
		}
		return year + "-" + month + "-" + date;
	}

	//获取问题列表数据
	function tabC4D() {
		$.ajax({
			url: 'https://api.vika.cn/fusion/v1/datasheets/dsti7NJXcuKQ70WZfd/records?viewId=viwFzo5Xa3y7c&fieldKey=id&pageNum=' + mypageNum + '&pageSize=10',
			type: "get",
			headers: {
				Authorization: Authorization
			},
			success: function (data) {
				//var data=JSON.parse(data);
				// var qq=typeof(data)
				//var oo=data.data.records[0].fields.问题;
				// console.log(oo)

				for (var i in data.data.records) {
					var ctitle = data.data.records[i].fields.fldbKyML4bgSy
					var Id = data.data.records[i].recordId
					var q_check = data.data.records[i].fields.fldTGgpx5OGsM
					var time = formatDate(data.data.records[i].fields.fldmVwGOHPVQv)
					var type = data.data.records[i].fields.fldFpKqP0mPrx
					//var see = data.data.records[i].fields.fldgEbVnQ8jIE

					if (q_check == 1) {
						if (ctitle.length > 40) {
							var ctitle = ctitle.slice(0, 40) + "..."
						}
						switch (type) {
							case "渲染":
								var color = '#df9090';
								break;
							case "资源下载":
							case "经验分享":
							case "软件":
								var color = '#a090df';
								break;
							case "建模":
							case "动画":
								var color = '#90dfa1';
								break;
							case "毛发":
							case "粒子":
								var color = '#90b0df';
								break;
						}

						//console.log(data)
						var mydata = '<div class="list-group-item list-group-item-action"> <a href="detail.html?Id=' + Id + '" target="_blank"> <h5>' + ctitle + '</h5> </a><small class="text-muted"><i class="bi bi-calendar2"></i>&nbsp;更新于&nbsp;' + time + '&nbsp;</small> <span class="badge rounded-pill" style="background-color:' + color + ' ;">' + type + '</span></div>';
						$(".queli").append(mydata);
						//$('.nice2').hide()
					}
				};
			}
		})
	}
	//回车事件绑定
	$('.top_keyword').bind('keyup', function (event) {
		if (event.keyCode == "13") {
			//回车执行查询
			var keyword = $('.top_keyword').val();
			if (keyword != '') {
				search(keyword)
				$(".pagination").hide()
			} else {
				window.location.reload()
			}

		}
	});

	//搜索功能
	function search(key) {
		var keyword = key;
		var regExp = new RegExp(keyword, 'g');
		var url = 'https://api.vika.cn/fusion/v1/datasheets/dsti7NJXcuKQ70WZfd/records?viewId=viwFzo5Xa3y7c&fieldKey=id&filterByFormula=OR(find("' + keyword + '",{fldbKyML4bgSy})>0)'
		if (keyword) {
			//console.log('dd')   
			$.ajax({
				url: url,
				type: "get",
				headers: {
					Authorization: Authorization
				},
				success: function (data) {
					//console.log(data)
					var dataok = data.data.total
					if (dataok != 0) {
						$(".queli").html('');
						for (var i in data.data.records) {
							var ctitle = data.data.records[i].fields.fldbKyML4bgSy
							var Id = data.data.records[i].recordId
							var q_check = data.data.records[i].fields.fldTGgpx5OGsM
							var time = formatDate(data.data.records[i].fields.fldmVwGOHPVQv)
							var type = data.data.records[i].fields.fldFpKqP0mPrx
							//var see = data.data.records[i].fields.fldgEbVnQ8jIE
							if (q_check == 1) {
								if (ctitle.length > 40) {
									var ctitle = ctitle.slice(0, 40) + "..."
								}
								switch (type) {
									case "渲染":
										var color = '#df9090';
										break;
									case "资源下载":
									case "经验分享":
									case "软件":
										var color = '#a090df';
										break;
									case "建模":
									case "动画":
										var color = '#90dfa1';
										break;
									case "毛发":
									case "粒子":
										var color = '#90b0df';
										break;
								}

								//高亮搜索关键词
								var ctitle = ctitle.replace(regExp, '<mark>' + keyword + '</mark>');
								var mydata = '<div class="list-group-item list-group-item-action"> <a href="detail.html?Id=' + Id + '" target="_blank"> <h5>' + ctitle + '</h5> </a><small class="text-muted"><i class="bi bi-calendar2"></i>&nbsp;更新于&nbsp;' + time + '&nbsp;</small> <span class="badge rounded-pill" style="background-color:' + color + ' ;">' + type + '</span></div>';
								$(".queli").append(mydata);
							}
						}
					} else {
						var mydata = '<a href="https://vika.cn/share/shrUvZHEPr2woRlvlqKae" target="_blank"><li class="list-group-item py-4 mb-2"><h5>可以减少搜索关键字再试试呢~或者点击这里提问</h5><img src="image/nothing1.png" alt="" width="100%"></li></a>';
						$(".queli").html(mydata);
					}
					//var pp=data.data.records[0]
					//console.log(pp)
				}
			})
		};
	}
	//提问框
	$('.ti').click(function () {
		window.open("https://vika.cn/share/shrUvZHEPr2woRlvlqKae");
	})


	//点赞
	// $('.queli').delegate(".nice", "click", function () {
	// 	var niceNum = $(this).children('span').html();
	// 	niceNum++
	// 	//console.log(niceNum)
	// 	$(this).next('div').children('span').html(niceNum);
	// 	$(this).hide(100);
	// 	$(this).next('div').show(100);
	// 	var Id = $(this).children('p').html();
	// 	$.ajax({
	// 		url: 'https://api.vika.cn/fusion/v1/datasheets/dsti7NJXcuKQ70WZfd/records?viewId=viwFzo5Xa3y7c',
	// 		type: "PATCH",
	// 		headers: {
	// 			Authorization: Authorization
	// 		},
	// 		data: {
	// 			"records": [
	// 				{
	// 					"recordId": Id,
	// 					"fields": {
	// 						"nice": niceNum
	// 					}
	// 				}
	// 			]
	// 		},
	// 		success: function (data) {
	// 			//var data=JSON.parse(data);
	// 		}
	// 	})
	// })


	//获取摸鱼列表数据
	$.ajax({
		url: 'https://api.vika.cn/fusion/v1/datasheets/dstpNPD5Snpk6uKGlL/records?viewId=viwt4FLXmp3jw&fieldKey=id&maxRecords=10',
		type: "get",
		headers: {
			Authorization: Authorization
		},
		success: function (data) {
			//var data=JSON.parse(data);
			// var qq=typeof(data)
			//var oo=data.data.records[0].fields.问题;


			for (var i in data.data.records) {
				var name = data.data.records[i].fields.fldSdPSFiSho2
				var mo_check = data.data.records[i].fields.fldxfrJ8FhXRk
				var time = formatDate(data.data.records[i].fields.fldEq37g9abfz)
				var title = data.data.records[i].fields.fldT3dm9MiTjl
				//var imgurl = data.data.records[i].fields.fldTNwWbZqCCM[0].url
				if (!name) {
					var name = "摸鱼达人"
				}
				//获取随机整数          
				var num = Math.random();
				var mynum = Math.ceil(num * 10);
				//console.log(mynum)
				//这里进行switch判断，并重新给变量赋值
				switch (mynum) {
					case 1:
						var imgurl = './image/1.png';
						break;
					case 2:
						var imgurl = './image/2.png';
						break;
					case 10:
						var imgurl = './image/3.png';
						break;
					case 3:
						var imgurl = './image/4.png';
						break;
					case 4:
						var imgurl = './image/5.png';
						break;
					case 5:
						var imgurl = './image/6.png';
						break;
					case 6:
					case 7:
						var imgurl = './image/7.png';
						break;
					case 8:
					case 9:
						var imgurl = './image/8.png';
						break;
				}
				if (mo_check == 1) {
					var mydata = '<tr><td style="text-align: center;"><img src="' + imgurl + '" alt="" width="50"></td> <td> <h6>' + title + '</h6> <small class="text-muted" style="font-size: 0.6rem;"><span class="mouser">' + name + '</span>&nbsp;在&nbsp;' + time + '&nbsp;摸鱼</small> </td> </tr>';

					$(".moyu").append(mydata);

				}
			};
		}
	})


})