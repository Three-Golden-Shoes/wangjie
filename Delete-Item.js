var express = require('express');
var app = express();
var fs = require("fs");

app.delete('/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "items.json", 'utf8', function (err, data) {
        var data = JSON.parse(data);

        for (var i = 0; i < data.length; i++) {
            if (parseInt(req.params.id) === data[i].id) {
                data.splice(i, 1);
                console.log(data);
                fs.writeFile("items.json", JSON.stringify(data), function (err, data) {
                    if (err) {
                        res.status(404).send(err);

                        return;
                    }
                });
                res.status(204).send();

                return;
            }
        }
        res.status(404).send();

    });
});

module.exports = app;
