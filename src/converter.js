var _ = require('lodash-node');
var Q = require('q');

exports.convertData = function (data) {
    return Q.fcall(function () {
        return convert(data);
    });
};

function convert(data) {
    return _(data).map(function (element) {
        return {
            "entry" : element
        }
    }).flatten().value();
}