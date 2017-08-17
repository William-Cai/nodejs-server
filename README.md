# nodejs-server
本地服务器使用node.js来搭建，开始测试

1、测试浏览器EventSource测试

2、WebSocket的测试

安装依赖
```sh
    npm i ws -D
```

- 测试EventSource
启动`eventsource.js`

浏览器打开`http://localhost:3000/index.html`

- 测试WebSocket
启动  `websocket.js`

浏览器打开 `http://localhost:8181/index_2.html`
可以启动多个，增加在线聊天人数