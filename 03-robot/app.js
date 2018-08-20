let express = require('express')
let app = express()

// 1.
let server = require('http').Server(app)
let io = require('socket.io')(server)

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',function(req,res) {
    // res.send('首页')
    res.render('index')
})

app.get('/news',function(req,res) {
    res.send('news')
})

// 2.监听端口
server.listen(8000,'127.0.0.1')

// 3.socket
io.on('connection', function(socket) {
    console.log('建立连接')
    socket.on('message',function (data) {
        console.log(data)
        //io.emit('server-message',data)    // 服务器给客户端发送数据
        let msg = data.msg || ''
        // 去服务器查询数据
        let backMsg = ''
        if ( msg == 1 ) {
            backMsg = 'apple'
        }else if( msg ==2 ) {
            backMsg = 'coconut'
        }else if( msg == 3 ) {
            backMsg = 'pear'
        }else if ( msg == 4 ) {
            backMsg = 'pich'
        } else {
            backMsg = '无匹配信息！'
        }
        socket.emit('serverMessage',{
            serverMsg: backMsg
        })
    })
})