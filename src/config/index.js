const base = require('./base');
const dev = require('./dev');

// Add additional environment configurations
module.exports = Object.assign(base, dev);