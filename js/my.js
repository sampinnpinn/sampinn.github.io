 

 $(document).ready(function(){ 

var Authorization="Bearer uskFCYskfXc6KLq0ifa5J4G"

//滚动监听显示导航栏

    $(function(){
        // 谁(window)触发滚动事件(scroll)  
        $(window).scroll(function(){
            // 当滚动条的滚动距离等于了导航距离顶端的值，让导航固定在顶端
            // 如何获取滚动距离 scrollTop()
            var top = $(this).scrollTop()
            if(top >= 150){    
               		$('.navque').css({'visibility': 'visible'});
               		 $('.fixed-top').addClass('bg')

                	
                }else{
                    $('.navque').css({'visibility': 'hidden'});
                    $('.fixed-top').removeClass('bg')

                   
                }
               // console.log(top);
        })
    })

    var screen_width = window.screen.width;
 	if(screen_width < 500){
				//console.log('手机')
		pp='detail_p.html'	

	}else{
		pp='detail.html'
	}

	//获取问题列表数据
	$.ajax({
		url:'https://api.vika.cn/fusion/v1/datasheets/dsti7NJXcuKQ70WZfd/records?viewId=viwFzo5Xa3y7c&fieldKey=id&maxRecords=15',
		type:"get",
		headers:{
			Authorization:Authorization
		},
		success: function(data) {
         //var data=JSON.parse(data);
         // var qq=typeof(data)
         
         //var oo=data.data.records[0].fields.问题;
               	// console.log(oo)
               	 	 
        	for(var i in data.data.records){
           	var ctitle=data.data.records[i].fields.fldbKyML4bgSy
           	var Id=data.data.records[i].recordId
           	var q_check=data.data.records[i].fields.fldTGgpx5OGsM

	           	if (q_check==1) {

	           		if(ctitle.length>25){
	           			var ctitle=ctitle.slice(0,25)+"..."
	           		}


	           		var mydata='<a href="'+pp+'?Id='+Id+'" target="_blank"> <li class="list-group-item py-4 mb-2">'+ctitle+'</li></a>';

	           		$(".list-group").append(mydata); 

	           	}	
           };

          
   		}
	})




	//搜索框
	$('.search').click(function(){   

	 			var keyword=$('.keyword').val();
	 			
			    search(keyword)
	})


	//头部搜索框
	$('.top_search').click(function(){   

	 			var keyword=$('.top_keyword').val();
	 			

	 			search(keyword)
			
	})		

	
    //搜索功能
    function search(key){

    	var keyword=key;
    	var regExp = new RegExp(keyword, 'g');
    	var url='https://api.vika.cn/fusion/v1/datasheets/dsti7NJXcuKQ70WZfd/records?viewId=viwFzo5Xa3y7c&fieldKey=id&filterByFormula=OR(find("'+keyword+'",{fldbKyML4bgSy})>0)'
    	if (keyword) {
				//console.log('dd')   
				$.ajax({
					url:url,
					type:"get",
					headers:{
						Authorization:Authorization
					},
					success: function(data) {	

	          		//console.log(data)
	          		var dataok=data.data.total
	          		if(dataok!=0){
	          			$(".list-group").html(''); 
	          			for(var i in data.data.records){

	          				var ctitle=data.data.records[i].fields.fldbKyML4bgSy
	          				var Id=data.data.records[i].recordId
	          				var q_check=data.data.records[i].fields.fldTGgpx5OGsM

	          				if (q_check==1) {

	          					if(ctitle.length>25){
	          						var ctitle=ctitle.slice(0,25)+"..."
	          					}

				         	//高亮搜索关键词
				         	var ctitle = ctitle.replace(regExp, '<mark>'+keyword+'</mark>');

				         	var mydata='<a href="'+pp+'?Id='+Id+'" target="_blank"> <li class="list-group-item py-4 mb-2">'+ctitle+'</li></a>'; 	
				         	$(".list-group").append(mydata); 

				         }
				     }

				 }else{
				 	var mydata='<a href="https://vika.cn/share/shrUvZHEPr2woRlvlqKae" target="_blank"><li class="list-group-item py-4 mb-2">该问题暂未被收录哦~欢迎提问！</li></a>';

				 	$(".list-group").html(mydata); 
				 }
        		//var pp=data.data.records[0]
        		//console.log(pp)

        	}
        })  
		};
	}


	//提问框
	$('.ti').click(function(){   
		window.open("https://vika.cn/share/shrUvZHEPr2woRlvlqKae");

	})
})