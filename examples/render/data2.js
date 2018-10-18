`use strict`;

const os = require(`os`);

const data = [os.hostname(), os.platform(), os.release()];

module.exports = data;
