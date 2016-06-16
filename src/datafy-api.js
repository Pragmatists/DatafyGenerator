var HTTP = require("q-io/http");
var _ = require('lodash-node');
var Log = require("./logger.js");
var converter = require('./converter.js');
var generator = require('./generator.js');


exports.authData = {};
exports.datasource = {};
var headers = {"Content-Type" : "application/json", "authToken" : ""};

exports.authenticate = function () {
    Log.write('Authenticating... ');
    headers["Organization-Id"] = exports.authData.organizationId;
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
            headers.authToken = data.authToken;
            return data;
        });
};

exports.deleteDS = function () {
    Log.write('Deleting ' + exports.datasource.name + "... ");
    return HTTP.request({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/data-sources/" + exports.datasource.name,
        method  : "DELETE",
        headers : headers,
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
    Log.write('Creating ' + exports.datasource.name + "... ");
    return HTTP.request({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/data-stores/",
        method  : "POST",
        headers : headers,
        body    : [JSON.stringify(removeOptions(exports.datasource))]
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
                throw data.message;
            } else {
                Log.writeln("CREATED");
                data = {message: "Datasource " + exports.datasource.name + " successfully created."}
            }
            return data;
        });
};

exports.insertData = function (data) {
    Log.write("Inserting data... ");
    return HTTP.request({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/data-sources/" + exports.datasource.name + "/entries",
        method  : "POST",
        headers : headers,
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
            console.log(JSON.stringify(response));
            if (response && response.statusCode) {
                Log.writeln("  FAILED: " + response.message);
                throw response.message;
            } else {
                Log.writeln("SUCCESSFULLY ADDED " + data.length + " RECORDS");
            }
            return response;
        });
};

exports.isAuthenticated = function() {
    return headers.authToken && (headers.authToken.length !== 0);
};

exports.generateData = function () {
    return generator.generateData(exports.datasource);
};

exports.convertData = function (data) {
    return converter.convertData(data);
};

function removeOptions(json) {
    var newjson = JSON.parse(JSON.stringify(json));

    delete newjson['options'];
    _(newjson.properties).forEach(function (elem) {
        delete elem['options'];
    })

    return newjson;
}