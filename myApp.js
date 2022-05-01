const bodyParser = require('body-parser')
const env = require('dotenv').config()
var express = require('express');
var app = express();
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    console.log(req.method + ' ' + req.url + ' - ' + req.ip)
    next()
})

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.get('/json', (req, res) => {
    let m = "Hello json"
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        m = "HELLO JSON"
    }
    res.json({ "message": m });
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next()
},
    (req, res) => {
        res.json({ "time": req.time });

    }
)

app.get('/:word/echo', (req, res) => {
    res.json({ "echo": req.params.word });
})

app.route('/name').get((req, res) => {
    res.json({ name: req.query.first + ' ' + req.query.last });
}).post((req, res) => {
    res.json({ name: req.body.first + ' ' + req.body.last });
})





























module.exports = app;
