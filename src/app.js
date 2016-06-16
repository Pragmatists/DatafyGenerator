var _ = require('lodash-node');
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');

module.exports.start = start;
var application;

function start() {
    if (application) {
        return application;
    }

    app.set('port', process.env.PORT || 8080);
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(compression());
    app.use(session({
        secret: 'something',
        resave: true,
        saveUninitialized: true
    }));
    app.set('views', path.join(__dirname, 'views'));
    var webDir = path.join(__dirname, '..', '..', 'web');
    app.use(express.static(path.join(webDir, 'main')));
    app.use(express.static(path.join(webDir, 'bower_components')));
    app.engine('.html', require('ejs').renderFile);

    app.all('/', function (req, res) {
        res.render('index.html');
    });

    app.use("/datafy", require("./routes.js").routes(express));

    var server = http.createServer(app);
    server.listen(app.get('port'));

    application = {server : server};
    return application;
}