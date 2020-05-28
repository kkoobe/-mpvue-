// 1.引入核心模块
const express=require('express')
// 2.初始化实例
const app = new express()
const port = 3000
var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// io.sockets.on('connection', function (socket) {
//   console.log('111');
//   socket.on('news', function (data) {
//     console.log(data);
//   });
// });
// 3.核心代码
app.get('/',(req,res)=>{
  res.send('1111')
})
// app.use(function(req,res,next){
//   res.io=io;
//   next();
// })
// 4.监听地址
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// module.exports={
//   io,
// }
