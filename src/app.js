var converter = require('./converter.js');
var Datafy = require('./datafy-api.js');
var Q = require('q');

Q.fcall(Datafy.authenticate)
    .then(Datafy.deleteDS)
    .then(Datafy.createDS)
    .then(Datafy.addData)
    .done();
