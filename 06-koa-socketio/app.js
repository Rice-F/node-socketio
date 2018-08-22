// 引入
let Koa=require('koa'),
    router = require('koa-router')(),
    views = require('koa-views');

// 实例化
let app=new Koa();

let url=require('url');

// 引入koa-socket 实例化io
const IO = require( 'koa-socket' )
const io = new IO();
io.attach( app );

// 应用模板引擎
app.use(views('views',{
    extension:'ejs'
}))

// 配置路由
router.get('/',async (ctx)=>{
   let title="hello ejs";
   await ctx.render('index',{
        title:title
    });
})

// 启动路由
app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
app.listen(3000);

// 配置服务端
app._io.on( 'connection', socket => {
    console.log('建立连接了');

    let roomid = url.parse(socket.request.url,true).query.roomid;   // 获取房间号
    socket.join(roomid);                 // 加入房间/加入分组
    socket.on('addCart',function(data){
        console.log(data);
        // socket.emit('serverEmit','我接收到增加购物车的事件了');       // 谁发给服务器就返回给谁
        // app._io.emit('serverEmit','我接收到增加购物车的事件了');        // 发给所有连接服务端的客户端
        // app._io.to(roomid).emit('serverEmit','我接收到增加购物车的事件了');
        // socket.broadcast.to(roomid).emit('serverEmit','我接收到增加购物车的事件了');
    })
})


