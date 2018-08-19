let http = require('http');
let fs = require('fs');          // fs内置模块
let app = http.createServer(function(req,res){
    // 加载静态页面
    fs.readFile('app.html', function (err,data) {
        res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
        res.end(data)
    })
})

// 引入soclet.io
let io = require('socket.io')(app);
io.on('connection', function (socket) {
    console.log('服务器建立连接了');
    // 服务器接受客户端发布的数据
    socket.on('addcart', function (data) {
        console.log(data)
        // 服务器给客户端发送数据
        // 1.发布订阅 谁给我发信息我把信息广播给谁
        // socket.emit()
        // 2. 群发 给所有连接服务器的客户端都发布数据
        // io.emit();

        // socket.emit('to-client','我是服务器数据')
        io.emit('to-client','我是服务器数据io')
    })
});

app.listen(3000);


// 使用socket.io

// 1.安装  npm install socket.io --save
// 2.引入 建立连接