var express = require('express');
var app = express();
var fs = require("fs");

app.put('/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "items.json", 'utf8', function (err, data) {
        if (err) {
            res.status(404).end(err);

            return;
        }
        if (!(typeof(req.body.name) === "string") || !(typeof(req.body.barcode) === "string") || !(typeof(req.body.unit) === "string")
            || !(typeof(req.body.price) === "number")) {
            res.status(401).send();

            return;en
        }

        var data = JSON.parse(data);
        var addItem = {
            "id": parseInt(req.params.id),
            "barcode": req.body.barcode,
            "name": req.body.name,
            "unit": req.body.unit,
            "price": req.body.price
        };
        for (var i = 0; i < data.length; i++) {
            if (parseInt(req.params.id) === data[i].id) {
                data.splice(i, 1, addItem);
                console.log(data);
                fs.writeFile("items.json", JSON.stringify(data), function (err, data) {
                    if (err) {
                        res.status(404).end(err);

                        return;
                    }
                });
                res.status(201).send(addItem);

                return;
            }
        }
        res.status(404).send();
    });
});

module.exports = app;


