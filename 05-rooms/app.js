let express = require('express')
let app = express()
let url=require('url');

// 1.
let server = require('http').Server(app)
let io = require('socket.io')(server)

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',function(req,res) {
    res.render('index')
})


// 2.监听端口
server.listen(8000,'127.0.0.1')

// 3.socketio服务
io.on('connection',function(socket){
    console.log('有个客户端连接了');
    // 获取房间号
    let roomId = url.parse(socket.request.url,true).query.roomid
    // 加入房间
    socket.join(roomId);
    // 接受客户端传值
    socket.on('addCart',function(data){
        console.log(data)

        // 服务器向指定客户端发数据（客户端内所有用户）
        // io.to(roomId).emit('addCart','server AddCart Ok')

        // 服务器向指定客户端发数据（客户端内除自己以外的所有用户）
        socket.broadcast.to(roomId).emit('addCart','server AddCart Ok')
    })
})