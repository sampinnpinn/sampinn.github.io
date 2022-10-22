
   	
 $(document).ready(function(){ 
 	var Authorization="Bearer uskFCYskfXc6KLq0ifa5J4G"
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
    //console.log(Id)
    var url='https://api.vika.cn/fusion/v1/datasheets/dstkcmrubpA8UWXGDy/records?viewId=viw7YZX1cK3vY&fieldKey=id&filterByFormula=OR(find("'+Id+'",{fld0Qz2PiiyGR})>0)'
	//获取答案数据
	$.ajax({
		url:url,
		type:"get",
		headers:{
			Authorization:Authorization
		},
		success: function(data) {
        	
         // var qq=typeof(data)
	      
           	for(var i in data.data.records){
           	var ctitle=data.data.records[i].fields.fld3qB7RNDkjq
           	var user=data.data.records[i].fields.fldfwXVQ88cJ3
           	var check=data.data.records[i].fields.fldKh6o6QuwOT

	           	if (check==1) {
	           		var mydata='<li class="list-group-item py-2 mb-2"> <span class="ans_name">'+user+':</span> <span>'+ctitle+'</span> </li>';
	           		$(".ans").append(mydata); 

	           	}	
           	};
		
          
   		}
	})

	//获取问题数据
	var url2='https://api.vika.cn/fusion/v1/datasheets/dsti7NJXcuKQ70WZfd/records?viewId=viwFzo5Xa3y7c&fieldKey=id&filterByFormula=OR(find("'+Id+'",{fldMTLRDL4IIw})>0)'
	$.ajax({
		url:url2,
		type:"get",
		headers:{
			Authorization:Authorization
		},
		success: function(data) {
        	//console.log(data)
         // var qq=typeof(data)
           	var ctitle=data.data.records[0].fields.fldbKyML4bgSy
           	var check=data.data.records[0].fields.fldTGgpx5OGsM
           	if (data.data.records[0].fields.fld6GnV53waKK) {
           		var imgurl=data.data.records[0].fields.fld6GnV53waKK[0].url
           		if (check==1) {

	           		var mydata='<li class="list-group-item py-3 mb-2"><b><span class="ans_name">问题:</span> '+ctitle+'</b> <img src="'+imgurl+'" alt="截图" width="100%"> </li>'; 
	           		$(".que").html(mydata);

	           	}	

           	}else{
           		if (check==1) {

	           		var mydata='<li class="list-group-item py-3 mb-2"><b><span class="ans_name">问题:</span> '+ctitle+'</b></li>'; 
	           		$(".que").html(mydata);

	           	}	
           	}
           	

	           	
           	
          
   		}
	})

	var url3='https://api.vika.cn/fusion/v1/datasheets/dstkcmrubpA8UWXGDy/records?viewId=viw7YZX1cK3vY'
	$('.ti').click(function(){  
		$.ajax({
		url:url3,
		type:"post",
		headers:{
			Authorization:Authorization
		},
		data:{
				"records": [
				{
					"fields": {
						"a_title": $('.myans').val(),
						"a_rec":Id
					}
				}
				]
		},
		success: function(data) {
        	alert('提交成功！正在审核中...')
        	window.location.reload()
         // var qq=typeof(data)
           
           	
          
   		}
	})

	})


})	

 
