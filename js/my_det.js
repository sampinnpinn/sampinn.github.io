

$(document).ready(function () {
	var Authorization = "Bearer uskFCYskfXc6KLq0ifa5J4G"

	//判断是否为移动端
	var screen_width = window.screen.width;
	if (screen_width < 500) {
		$('.delbg').css('padding', '1rem');
		$('.myimg').attr('width', '100%')
		$('body').css('background', '#ffffff')
		//console.log('手机')
		//pp = 'detail_p.html'
	}
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

	//清空页面
	$(".ans").html('');
	$(".que").html('');
	$(".myans").val('');
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	var Id = getUrlParam('Id');
	// console.log(Id)
	var url = 'https://api.vika.cn/fusion/v1/datasheets/dstkcmrubpA8UWXGDy/records?viewId=viw7YZX1cK3vY&fieldKey=id&filterByFormula=OR(find("' + Id + '",{fld0Qz2PiiyGR})>0)'
	//获取答案数据
	$.ajax({
		url: url,
		type: "get",
		headers: {
			Authorization: Authorization
		},
		success: function (data) {
			//console.log('d')
			var total = data.data.total
			if (total == 0) {
				var mydata = '<div class="list-group-item list-group-item-action"><img src="image/noans1.png" alt="" width="100%"></div>';
				$(".ans").append(mydata);
			}

			for (var i in data.data.records) {
				var ctitle = data.data.records[i].fields.fld3qB7RNDkjq
				var user = data.data.records[i].fields.fldfwXVQ88cJ3
				var check = data.data.records[i].fields.fldKh6o6QuwOT
				var time = formatDate(data.data.records[i].fields.fldQkJUVgSyh8)
				//var head = data.data.records[i].fields.fldKseDs7Fi6f[0].url
				if (!user) {
					var user = '热心网民'
				}
				//获取随机整数          
				var num = Math.random();
				var mynum = Math.ceil(num * 10);
				//console.log(mynum)
				//这里进行switch判断，并重新给变量赋值
				switch (mynum) {
					case 1:
						var head = './image/1.png';
						break;
					case 2:
						var head = './image/2.png';
						break;
					case 10:
						var head = './image/3.png';
						break;
					case 3:
						var head = './image/4.png';
						break;
					case 4:
						var head = './image/5.png';
						break;
					case 5:
						var head = './image/6.png';
						break;
					case 6:
					case 7:
						var head = './image/7.png';
						break;
					case 8:
					case 9:
						var head = './image/8.png';
						break;
				}
				if (check == 1) {
					var mydata = '<div class="list-group-item list-group-item-action"> <img src="' + head + '" alt="" width="30" class="mb-2 ansuser"> <span style="color:#FFA600">' + user + '</span><small class="text-muted">&nbsp;更新于&nbsp;' + time + '</small> <h6>' + ctitle + '</h6> </div>';
					$(".ans").append(mydata);

				}
			};


		}
	})

	//获取问题数据
	var url2 = 'https://api.vika.cn/fusion/v1/datasheets/dsti7NJXcuKQ70WZfd/records?viewId=viwFzo5Xa3y7c&fieldKey=id&filterByFormula=OR(find("' + Id + '",{fldMTLRDL4IIw})>0)'
	$.ajax({
		url: url2,
		type: "get",
		headers: {
			Authorization: Authorization
		},
		success: function (data) {
			//console.log(data)
			// var qq=typeof(data)
			var ctitle = data.data.records[0].fields.fldbKyML4bgSy
			var check = data.data.records[0].fields.fldTGgpx5OGsM
			var time = formatDate(data.data.records[0].fields.fldmVwGOHPVQv)
			var type = data.data.records[0].fields.fldFpKqP0mPrx
			//var see =  data.data.records[0].fields.fldgEbVnQ8jIE
			//var mysee = Number(see)+1
			// console.log(mysee)
			
			
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

			if (data.data.records[0].fields.fld6GnV53waKK) {
				var imgurl = data.data.records[0].fields.fld6GnV53waKK[0].url
				if (check == 1) {

					var mydata = '<h5>' + ctitle + '</h5><small class="text-muted">&nbsp;<i class="bi bi-calendar2"></i>&nbsp;更新于&nbsp;' + time + '</small> <span class="badge rounded-pill" style="background-color:' + color + ' ;">' + type + '</span> <div class="mt-2 col-12"> <img src="' + imgurl + '" alt="" width="400" class="myimg"> </div>';
					$(".que").html(mydata);

				}

			} else {
				if (check == 1) {

					var mydata = '<h5>' + ctitle + '</h5><small class="text-muted"><i class="bi bi-calendar2"></i>&nbsp;更新于&nbsp;' + time + '</small> <span class="badge rounded-pill" style="background-color:' + color + ' ;">' + type + '</span> <div class="mt-2 col-12"></div>';
					$(".que").html(mydata);

				}
			}

			//发送阅读数
			// $.ajax({
			// 	url: 'https://api.vika.cn/fusion/v1/datasheets/dsti7NJXcuKQ70WZfd/records?viewId=viwFzo5Xa3y7c',
			// 	type: "PATCH",
			// 	headers: {
			// 		Authorization: Authorization
			// 	},
			// 	data: {
			// 		"records": [
			// 			{
			// 				"recordId": Id,
			// 				"fields": {
			// 					"see":mysee
			// 				}
			// 			}
			// 		]
			// 	},
			// 	success: function (data) {
			// 		// var qq=typeof(data)
			// 	}
			// })

		}
	})
	//提交答案
	var url3 = 'https://api.vika.cn/fusion/v1/datasheets/dstkcmrubpA8UWXGDy/records?viewId=viw7YZX1cK3vY'
	$('.talk').click(function () {
		var myans = $('.myans').val()
		if (myans) {
			$.ajax({
				url: url3,
				type: "post",
				headers: {
					Authorization: Authorization
				},
				data: {
					"records": [
						{
							"fields": {
								"a_user": $('.myname').val(),
								"a_title": myans,
								"a_rec": Id
							}
						}
					]
				},
				success: function (data) {
					alert('回答提交成功！')
					window.location.reload()
					// var qq=typeof(data)

				}
			})
		}


	})

})


