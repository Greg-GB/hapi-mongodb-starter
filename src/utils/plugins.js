const Good = require('good');
const GoodConsole = require('good-console');

module.exports = (server) => {
  // Add Hapi Plugins
  server.register({
    register: Good,
    options: {
      reporters: [{
        reporter: GoodConsole,
        events: {
          response: '*',
          log: '*'
        }
      }]
    }
  }, (err) => {
    if (err) {
      throw err;
    }
  });
};