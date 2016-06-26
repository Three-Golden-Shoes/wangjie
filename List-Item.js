var express = require('express');
var app = express();
var fs = require("fs");
var item;

app.post('/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "items.json", 'utf8', function (err, data) {
        if (err) {
            res.send(err);

            return;
        }

        var data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            if (parseInt(req.params.id) === data[i].id) {
                item = data.slice(i, i + 1);
                //item = data[i];
                console.log(item);
                res.status(200).send(item);

                return;
            }
        }
        res.status(404).send();
    });
});

module.exports = app;


