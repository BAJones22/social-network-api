const moment = require('moment');

function dateFormat(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

module.exports = dateFormat;

