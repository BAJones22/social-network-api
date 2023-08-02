function dateFormat(timestamp) {
    return `${new Date(timestamp).getMonth() + 1}/${new Date(timestamp).getDate()}/${new Date(timestamp).getFullYear()}`;
}

module.exports = dateFormat;
