var Datafy = require('./datafy-api.js');

Datafy.datasource = {
    "name"       : "sampleDS",
    "properties" : [
        {
            "name" : "name",
            "type" : "text",
            "options" : {
                "possibleValues" : [
                    {"value" : "a", "probability" : 1},
                    {"value" : "b", "probability" : 2},
                    {"value" : "c", "probability" : 3}
                ]
            }
        },
        {
            "name" : "random_name",
            "type" : "text",
            "options" : {
                "random" : true
            }
        },
        {
            "name" : "number",
            "type" : "integer",
            "options" : {
                "possibleValues" : [
                    {"value" : 8, "probability" : 1},
                    {"value" : 9, "probability" : 2},
                    {"value" : 10, "probability" : 3},
                    {"value" : 11, "probability" : 2},
                    {"value" : 12, "probability" : 1}
                ]
            }
        },
        {
            "name" : "random_number",
            "type" : "integer",
            "options" : {
                "random" : {
                    "max" : 20,
                    "min" : 8
                }
            }
        }
    ],
    "options" : {
        "count": 1000
    }
};


Datafy.authData = {
    "organizationId" : "pragmatists",
    "username"       : "datafy@pragmatists.pl",
    "password"       : "admin!",
    "rememberMe"     : false
};

Datafy.authenticate()
    .then(Datafy.deleteDS)
    .then(Datafy.createDS)
    .then(Datafy.generateData)
    .then(Datafy.convertData)
    .then(Datafy.insertData)
    .done();
