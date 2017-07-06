/**
 * @Title EventSource
 * @Description
 * @Author Winnie.Cai
 * @CreteData 2017/7/6.
 */
var http = require("http");

var url = require("url");

var fs = require("fs");

var server = http.createServer(function (request, response) {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain

    var requestUrl = request.url;

    if (/\w+\.(html|js)/.test(requestUrl)) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        fs.readFile("." + requestUrl, function (err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, {'Content-Type': 'text/html'});
            } else {
                // HTTP 状态码: 200 : OK
                // Content Type: text/plain
                response.writeHead(200, {'Content-Type': 'text/html'});
                // 响应文件内容
                response.write(data.toString());
            }
            //  发送响应数据
            response.end();
        });
    } else {
        switch(requestUrl){
            case "/sse":
                response.writeHead(200, {  //消息头
                    "Content-Type": "text/event-stream", //响应类型
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive"
                });
                var count = 1;
                setInterval(function () {
                    var data = Date.now();
                    console.log("推送...次数:" + count++);
                    response.write("data: " + data + "\n\n"); //以data: 开始，以 \n\n 结尾
                }, 3000);
                break;
            case "/sse_1":
                response.writeHead(200, {  //消息头
                    "Content-Type": "text/event-stream", //响应类型 必要！！！
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive"
                });
                var count = 1;
                setInterval(function () {
                    var data = Date.now();
                    console.log("推送自定义事件...次数:" + count++);
                    response.write("event:diy\r");//自定义事件
                    response.write("data:" + data + "\n\n"); //以data: 开始，以 \n\n 结尾
                    response.write("id:"+Math.floor(Math.random()*10)+"\n"); //id
                }, 3000);
                break;
            default:
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end();
        }
    }
});

server.listen(3000);

console.log("Server Started ok....");
