var express = require('express');
var app = express();
var fs = require("fs");

app.post('/add', function (req, res) {
    fs.readFile(__dirname + "/" + "items.json", 'utf8', function (err, data) {
        if (err) {
            res.status(404).end(err);

            return;
        }

        if (!(typeof(req.body.name) === "string") || !(typeof(req.body.barcode) === "string") || !(typeof(req.body.unit) === "string")
            || !(typeof(req.body.price) === "number")) {
            res.status(401).send();

            return;
        }

        var data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            var idMax = (data[i].id > data[0].id) ? data[i].id : data[0].id;
            if (data[i].barcode === req.body.barcode) {
                res.status(404).send("[]");

                return;
            }
        }

        var addItem = {
            "id": idMax + 1,
            "barcode": req.body.barcode,
            "name": req.body.name,
            "unit": req.body.unit,
            "price": req.body.price
        };
        data.push(addItem);
        fs.writeFile("items.json", JSON.stringify(data), function (err, data) {
            if (err) {
                res.status(404).end(err);

                return;
            }
            res.status(201).send(addItem);
        });
    });
});

module.exports = app;


