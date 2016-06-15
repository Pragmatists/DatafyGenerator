var _ = require('lodash-node');
var Q = require('q');

exports.convert = function (data) {
    return Q.fcall(function () {
        return convert(data);
    });
};

function convert(data) {
    return _(data).map(function (element) {
        return {
            "entry" : {
                name : element.name
            }
        }
    }).flatten().value();
}