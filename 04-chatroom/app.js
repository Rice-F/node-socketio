let express = require('express')
let app = express()

// 1.
let server = require('http').Server(app)
let io = require('socket.io')(server)

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',function(req,res) {
    res.render('index')
})

app.get('/chat',function(req,res) {
    let name = req.query.name;
    res.render('chat',{
        name: name
    });
})

// 2.监听端口
server.listen(8000,'127.0.0.1')

// 3.socket
io.on('connection',function(socket){
    console.log('有个客户端连接了');
    socket.on('message',function(data){
        io.emit('message',data);
    })
})