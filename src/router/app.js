var express = require('express')
var indexRouter = require('./express_server')
var app = express()
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    if (req.method == 'OPTIONS') {
      res.send(200); //让options请求快速返回
    } else {
      next();
    }
  })


app.use('/index', indexRouter)


app.listen('3000', function(err) {
    if(err) {
        console.log('error')
    }
    console.log('Server is running ...')
  })
