var p = performance;
console.log(p);

var socket = new WebSocket("ws:" + window.location.host + "/web/webtask_stu/");

socket.onopen = function () {
  console.log("WebSocket open"); //成功连接上Websocket
  socket.send("adasdasda。。。。"); //发送数据到服务端 };
  socket.onmessage = function (e) {
    // console.log('message: ' + e.data);//打印服务端返回的数据
    // console.log(typeof (e.data));
    console.log(JSON.parse(e.data));
    // console.log(typeof (JSON.parse(e.data)));
    var webtask_stu_list = JSON.parse(e.data);
    var tr = $("tbody tr");
    $.each(tr, function (i, ele) {
      $(ele).find("td:eq(4)").text(webtask_stu_list["webtask_stu"][i]);
    });
  };
  socket.onclose = function (e) {
    console.log(e);
    socket.close(); //关闭TCP连接
  };
};
