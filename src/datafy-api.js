var HTTP = require("request-promise");
var _ = require('lodash');
var Log = require("./logger.js");
var converter = require('./converter.js');
var generator = require('./generator.js');


exports.authData = {};
exports.datasource = {};
var headers = {"Content-Type" : "application/json", "authToken" : ""};

exports.authenticate = () => {
    Log.write('Authenticating... ');
    headers["Organization-Id"] = exports.authData.organizationId;
    return HTTP({
        uri     : "https://" + exports.authData.organizationId + ".datafy.pro/api/authentication",
        method  : "POST",
        headers : {"Content-Type" : "application/json"},
        body    : exports.authData,
        json    : true
    })
        .then(function (data) {
            Log.writeln(JSON.stringify(data));
            headers.authToken = data.authToken;
            return data;
        });
};

exports.deleteDS = function () {
    Log.write('Deleting ' + exports.datasource.structure.name + "... ");
    return HTTP({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/data-sources/" + exports.datasource.structure.name,
        method  : "DELETE",
        headers : headers,
        body    : {},
        json    : true
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
    Log.write('Creating ' + exports.datasource.structure.name + "... ");
    return HTTP({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/data-stores/",
        method  : "POST",
        headers : headers,
        body    : exports.datasource.structure,
        json    : true
    })
        .then(function (data) {
            if (data && data.errorCode) {
                Log.writeln("  FAILED: " + data.message);
                throw data.message;
            } else {
                Log.writeln("CREATED");
                data = {message : "Datasource " + exports.datasource.structure.name + " successfully created."}
            }
            return data;
        });
};

exports.insertData = function (data) {
    Log.write("Inserting data... ");
    return HTTP({
        url     : "https://" + exports.authData.organizationId + ".datafy.pro/api/data-sources/" + exports.datasource.structure.name + "/entries",
        method  : "POST",
        headers : headers,
        body    : data,
        json    : true
    })
        .then(function (response) {
            if (response && response.statusCode) {
                Log.writeln("  FAILED: " + response.message);
                throw response.message;
            } else {
                Log.writeln("SUCCESSFULLY ADDED " + data.length + " RECORDS");
            }
            return response;
        });
};

exports.isAuthenticated = () =>
    headers.authToken && (headers.authToken.length !== 0);


exports.generateData = () => {
    Log.writeln("Generating data... ");
    return generator.generateData(exports.datasource);
}

exports.convertData = (data) => {
    Log.writeln("Converting data... ");
    return converter.convertData(data);
}