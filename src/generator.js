var _ = require('lodash');

exports.generateData = (datasource) => {
    return new Promise(resolve => {
        var res = generate(datasource);
        resolve(res)
    });
};

function chooseOneOf(value) {
    var proportionalSet = [];
    _(value).forEach(elem => {
        for (var i = 0; i < elem._probability; i++) {
            proportionalSet.push(elem);
        }
    });
    return proportionalSet[Math.floor(Math.random() * proportionalSet.length)];
}
function generateDataPoint(dataDefinition, point) {
    _(dataDefinition).forEach((value, key) => {
        if (value === "_random_integer") {
            point[key] = dataDefinition._min + Math.floor(Math.random() * (dataDefinition._max + 1 - dataDefinition._min));
        } else if (_.isArray(value)) {
            generateDataPoint(chooseOneOf(value), point);
        } else if (_.isString(value) || _.isInteger(value) || _.isNumber(value) || _.isDate(value) || _.isBoolean(value)) {
            if (!key.startsWith("_")) {
                point[key] = value;
            }
        } else {
            generateDataPoint(value, point);
        }
    });
}

function generate(datasource) {
    var data = [];

    for (var i = 0; i < datasource.options.count; i++) {
        var point = {};
        generateDataPoint(datasource.properties, point);
        data.push(point);
    }

    return data;
}
