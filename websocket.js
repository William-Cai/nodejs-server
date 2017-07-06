/**
 * @Title
 * @Description
 * @Author Winnie.Cai
 * @CreteData 2017/7/6.
 */
var http = require("http");

var url = require("url");

var fs = require("fs");

var server = http.createServer(function (request, response) {

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
        response.writeHead(404);
    }
});

server.listen(8181);

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080});

wss.on('connection', function (ws) {
    ws.on('message', function (jsonStr) {
        //保存数据
        var user = this.user = JSON.parse(jsonStr);

        //遍历所有客户端，发送全局消息
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(user.nickname + ": " + user.msg));
        });
    });
    ws.on('close', function (close) {
        console.log('剩余数量：' + wss.clients.size);
    });
    console.log("当前总数量:" + wss.clients.size);
    ws.send(JSON.stringify('Connection Success. Count:' + wss.clients.size));
});