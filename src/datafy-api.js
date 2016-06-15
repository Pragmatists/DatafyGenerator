var HTTP = require("q-io/http");
var Log = require("./logger.js");

exports.authData = {
    "organizationId" : "pragmatists",
    "username"       : "datafy@pragmatists.pl",
    "password"       : "admin!",
    "rememberMe"     : false
};

exports.datasource = {
    "template" : {
        "name"       : "sampleDS",
        "properties" : [
            {
                "name" : "name",
                "type" : "text"
            }
        ]
    }
};

exports.headers = {
    "Content-Type"    : "application/json",
    "authToken"       : "",
    "Organization-Id" : exports.authData.organizationId
};


exports.authenticate = function () {
    Log.write('Authenticating... ');
    return HTTP.request({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/authentication",
        method  : "POST",
        headers : {"Content-Type" : "application/json"},
        body    : [JSON.stringify(exports.authData)]
    })
        .then(function (response) {
            return response.body.read();
        })
        .then(JSON.parse)
        .then(function (data) {
            Log.writeln(JSON.stringify(data));
            exports.headers.authToken = data.authToken;
        });
};

exports.deleteDS = function () {
    Log.write('Deleting ' + exports.datasource.template.name + "... ");
    return HTTP.request({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/data-sources/" + exports.datasource.template.name,
        method  : "DELETE",
        headers : exports.headers,
        body    : []
    })
        .then(function (response) {
            return response.body.read();
        })
        .then(function (response) {
            try {
                return JSON.parse(response);
            } catch (err) {
                return response.toJSON().data[0];
            }
        })
        .then(function (data) {
            if (data && data.errorCode) {
                Log.writeln("  NOTHING TO DELETE: " + data.message);
            } else {
                Log.writeln("DELETED");
            }
        }).catch(function (err) {
            Log.writeln("ERROR " + err)
        });
};

exports.createDS = function () {
    Log.write('Creating ' + exports.datasource.template.name + "... ");
    return HTTP.request({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/data-stores/",
        method  : "POST",
        headers : exports.headers,
        body    : [JSON.stringify(exports.datasource.template)]
    })
        .then(function (response) {
            return response.body.read();
        })
        .then(function (response) {
            try {
                return JSON.parse(response);
            } catch (err) {
                return response.toJSON().data[0];
            }
        })
        .then(function (data) {
            if (data && data.errorCode) {
                Log.writeln("  FAILED: " + data.message);
            } else {
                Log.writeln("CREATED");
            }
        })
        .catch(function (err) {
            Log.writeln("ERROR " + err)
        });
};

exports.addData = function (data) {
    Log.write("Inserting data... ");
    return HTTP.request({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/data-sources/" + exports.datasource.template.name + "/entries",
        method  : "POST",
        headers : exports.headers,
        body    : [JSON.stringify(data)]
    })
        .then(function (response) {
            return response.body.read();
        })
        .then(function (response) {
            try {
                return JSON.parse(response);
            } catch (err) {
                return response.toJSON().data[0];
            }
        })
        .then(function (response) {
            if (response && response.statusCode) {
                Log.writeln("  FAILED: " + response.message);
            } else {
                Log.writeln("SUCCESSFULLY ADDED " + data.length + " RECORDS");
            }
            return response;
        })
        .catch(function (err) {
            Log.writeln("ERROR " + err)
        });
};
