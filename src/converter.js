var _ = require('lodash');

exports.convertData = (data) => {
    return new Promise((resolve) =>
            resolve(convert(data))
    );
};

function convert(data) {
    return _(data).map(element => {
        return {"entry" : element}
    }).flatten().value();
}