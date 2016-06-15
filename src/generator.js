var _ = require('lodash-node');
var Q = require('q');

exports.generate = function () {
    return Q.fcall(function () {
        return generate();
    });
};

function generate() {
    var data = [];
    for (var i=0; i<1000; i++) {
        data.push({name : 'a'})
    }
    return data;
}