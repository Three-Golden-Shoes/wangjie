var express = require('express');
var app = express();
var fs = require("fs");

app.get('/items', function (req, res) {
    fs.readFile(__dirname + "/" + "items.json", 'utf8', function (err, data) {
        if (err) {
            res.status(404).end(err);
            
            return;
        }
        if (!data) {
            res.status(200).send("[]");

            return;
        }
        var dataArray = JSON.parse(data);

        console.log(data);
        res.status(200).json(dataArray);
    });
});

module.exports = app;


