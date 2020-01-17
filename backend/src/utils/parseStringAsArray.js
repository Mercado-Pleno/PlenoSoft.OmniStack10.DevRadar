module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(item => item.trim());
};

// const parseStringAsArray = require('./utils/parseStringAsArray');