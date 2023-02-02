let express = require('express');
var path = require('path');
let app = express();
require('dotenv').config();
//body-parser 
let bodyParser = require('body-parser');
//app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function (req, res, next) {

    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});
app.get('/', function (req, res) {
    res.send('Hello World!');

});
//recuperer view index.html lors de la requete get sur le path /inscrire
app.get('/inscrire', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/:word/echo",
    function (req, resp, next) {
        req.params.word = req.params.word;
        pattern = /^[a-zA-Z]+$/;
       if (!pattern.test(req.params.word)) {
            resp.send("word should be only letters");
        }
        else {
            next();
        }

    },
    function (req, resp) {
        resp.send({ echo: req.params.word });
    });

    app.route("/name").get(function (req, resp) {
        resp.send({ name: req.query.first + " " + req.query.last });
    }).post(function (req, resp) {
        resp.send({ name: req.body.first + " " + req.body.last });
    });

app.get("/now", function (req, resp, next) {
    req.time = new Date().toString();
    next();
},
    function (req, resp) {
        resp.send({ time: req.time });
    });


app.get("/json", function (req, res) {
    //console.log(process.env.MESSAGE_STYLE);
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({
            "message": "HELLO JSON"
        });
    }
    else {
        res.json({
            "message": "Hello json"
        });
    }
});

app.get('/about', function (req, res) {
    res.send('About Page');
});

//post



app.post('/name', function (req, res) {
    var string = req.body.first + " " + req.body.last;
    res.send({ name: string });
});





































module.exports = app;
