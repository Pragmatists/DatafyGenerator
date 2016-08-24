var Datafy = require('./datafy-api.js');

exports.routes = function (express) {
    var router = express.Router();

    router.get('/test', function (req, res) {
        res.json({name : 'test'});
    });

    router.post('/auth', function (req, res) {
        var authData = {rememberMe : false};
        authData.organizationId = req.body.orgId;
        authData.username = req.body.user;
        authData.password = req.body.pass;
        req.session.authData = authData;
        var obj = {
            authData : req.session.authData
        };
        if (req.session.template) {
            obj.template = req.session.template;
        }

        Datafy.authData = authData;
        Datafy.authenticate()
            .then(function (data) {
                if (!Datafy.isAuthenticated()) {
                    obj.auth_error = "Could not authenticate: " + data.message;
                }
                res.render("index.html", obj);
            })
            .done();
    });

    router.post('/datasource', function (req, res) {
        req.session.template = req.body.template;

        Datafy.authData = req.session.authData;
        Datafy.datasource = JSON.parse(req.session.template);

        var chain;
        if (req.body.delete) {
            chain = Datafy.deleteDS()
                .then(Datafy.createDS);
        } else {
            chain = Datafy.createDS();
        }
        chain
            .then(Datafy.generateData)
            .then(Datafy.convertData)
            .then(Datafy.insertData)
            .then(function (data) {
                res.render("index.html", {
                    authData : req.session.authData,
                    template : req.session.template,
                    ds_msg   : "Data successfully inserted."
                });
            })
            .catch(function (data) {
                res.render("index.html", {
                    authData : req.session.authData,
                    template : req.session.template,
                    ds_error : ("Could not insert data: " + data)
                });
            })
            .done();
    });

    return router;
};