$(document).ready(function () {
  var Authorization = "Bearer uskFCYskfXc6KLq0ifa5J4G";
  
  
  //获取下载人数
  $.ajax({
    url: ' https://api.vika.cn/fusion/v1/datasheets/dstmVbqQJNinSkLMiA/records?viewId=viwmM0duvPk1P&fieldKey=id',
    type: "get",
    headers: {
      Authorization: Authorization
    },
    success: function (data) {
      var mydata = data.data.records[0].fields.fldQrqo8rVe0P
      $(".text_27").html(mydata);
    }
  })


  //更新下载人数
  $('.box_1').click(function(){
    download()
  })
  $('.group_12').click(function(){
    download()
  })
    function download() {
    var NewNum = Number($(".text_27").html()) + 1
    var data1 = {
      "records": [
        {
          "recordId": "recV0GRoeuqhc",
          "fields": {
            "num": NewNum
          }
        }
      ]
    }
    var data2 = JSON.stringify(data1);
    $.ajax({
      url: 'https://api.vika.cn/fusion/v1/datasheets/dstmVbqQJNinSkLMiA/records?viewId=viwmM0duvPk1P',
      method: "PATCH",
      headers: {
        Authorization: Authorization,
        "Content-Type": "application/json"
      },
      data: data2,
      success: function () {
        // console.log("ok")
      }
    })
    }
  //更新日志
  $('.log').click(function () {
    window.open("https://ytd7tq3p09.feishu.cn/wiki/wikcnDRf9fdfKHB7Jme2WxGbeXd");
  })
  // 星球
  // $('.star').click(function () {
  //   window.open("https://ytd7tq3p09.feishu.cn/wiki/wikcnjBSv7UQSq65Oq88C1lXYpg");
  // })
  //全部
  $('.help').click(function () {
    window.open("https://ytd7tq3p09.feishu.cn/wiki/wikcngnyKYzLIgchzphjIuJZjxg");
  })
  //下载预设
  $('.lib').click(function () {
  	window.open("https://wwqg.lanzouf.com/iSHui0m1obla");
  })
  //png图片
  $('.png').click(function () {
    window.open("https://js.design/community?category=detail&type=resource&id=63d35547427ae4d70c3086b9");
  })
  //c4d平台
  $('.c4d').click(function () {
    window.open("qa.html");
  })
  //红包封面
  $('.bag').click(function () {
    window.open("red.html");
  })
})
