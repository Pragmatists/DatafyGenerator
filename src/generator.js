var _ = require('lodash-node');
var Q = require('q');

exports.generate = function () {
    return Q.fcall(function () {
        return generate();
    });
};

function generate() {
    return [{name : 'a'}, {name : 'b'}];
}