var _ = require('lodash');

exports.convertData = function (data) {
    return new Promise(function (resolve) {
        resolve(convert(data));
    });
};

function convert(data) {
    return _(data).map(function (element) {
        return {
            "entry" : element
        }
    }).flatten().value();
}