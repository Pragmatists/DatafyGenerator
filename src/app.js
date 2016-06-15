var converter = require('./converter.js');
var generator = require('./generator.js');
var Datafy = require('./datafy-api.js');
var Q = require('q');

Datafy.datasource.data = converter.convert();

Q.fcall(Datafy.authenticate)
    .then(Datafy.deleteDS)
    .then(Datafy.createDS)
    .then(generator.generate)
    .then(converter.convert)
    .then(Datafy.addData)
    .done();
