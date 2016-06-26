var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');


app.use('/', require('./Add-Item'));
app.use('/', require('./Delete-Item'));
app.use('/', require('./List-Item'));
app.use('/', require('./List-Items'));
app.use('/', require('./updateItems'));
app.use(bodyParser.json({ type: 'json/*' }))

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({
    extended: true
}));

//捕捉到error并转到处理程序
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//生产用户程序，并泄露给用户
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000, function () {

    console.log("连接成功！");
});

