const base = require('./base');
const dev = require('./dev');
const test = require('./test');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'dev';
}

// Add additional environment configurations
module.exports = Object.assign(base, (process.env.NODE_ENV == 'test') ? test : dev);