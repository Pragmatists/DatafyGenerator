var _ = require('lodash-node');
var Q = require('q');

exports.generateData = function (datasource) {
    return Q.fcall(function () {
        return generate(datasource);
    });
};

function generate(datasource) {
    var data = [];

    for (var i=0; i<1000; i++) {
        var pair = [];
        _(datasource.properties).forEach(function (property) {
            pair.push([property.name, generateValueForType(property.type, property.options)]);
        });
        var obj = {};
        _(pair).forEach(function (elem) {
            obj[elem[0]] = elem[1];
        });
        data.push(obj);
    }

    return data;
}

function generateValueForType(type, options) {
    if(type === "text") {
        if (options.possibleValues) {
            var proportionalSet = [];
            _(options.possibleValues).forEach(function (elem) {
                for(var i=0; i<elem.probability; i++) {
                    proportionalSet.push(elem.value);
                }
            });
            return proportionalSet[Math.floor(Math.random() * proportionalSet.length)]
        } else if (options.random) {
            return "Element " + Math.round(Math.random() * 10000);
        } else {
            return "Element";
        }
    } else
    if(type === "integer") {
        if (options.possibleValues) {
            var proportionalSet = [];
            _(options.possibleValues).forEach(function (elem) {
                for(var i=0; i<elem.probability; i++) {
                    proportionalSet.push(elem.value);
                }
            });
            return proportionalSet[Math.floor(Math.random() * proportionalSet.length)]
        } else if (options.random) {
            return options.random.min + Math.floor(Math.random() * (options.random.max + 1 - options.random.min));
        } else {
            return "123";
        }
    }
    else
    if(type === "boolean") {
        if (options.possibleValues) {
            var proportionalSet = [];
            _(options.possibleValues).forEach(function (elem) {
                for(var i=0; i<elem.probability; i++) {
                    proportionalSet.push(elem.value);
                }
            });
            return proportionalSet[Math.floor(Math.random() * proportionalSet.length)]
        } else if (options.random) {
            return Math.random() > 0.5 ? true : false;
        } else {
            return "true";
        }
    } else
    if(type === "double") {
        if (options.possibleValues) {
            var proportionalSet = [];
            _(options.possibleValues).forEach(function (elem) {
                for(var i=0; i<elem.probability; i++) {
                    proportionalSet.push(elem.value);
                }
            });
            return proportionalSet[Math.floor(Math.random() * proportionalSet.length)]
        } else if (options.random) {
            return options.random.min + (Math.random() * (options.random.max + 1 - options.random.min));
        } else {
            return "1.23";
        }
    }
}
