'use strict'; 

const Hapi = require('hapi');

module.exports = (config) => {
  // Create Hapi Server
  const server = new Hapi.Server({
    app: {
      config: config
    }
  });
  // Add Hapi Server Decorates
  require('./decorates')(server);
  // Add Hapi Server Connections
  require('./connections')(server);
  // Add Hapi Server Extensions
  require('./extensions')(server);
  
  // Add Hapi Plugins and Start Server
  return new Promise((resolve, reject) => {
    server.register(require('./plugins')(config.db), (err) => {
      if (err) return reject(err);
      server.start(err => {
        if (err) return reject(err);
        console.log('Server running at:', server.info.uri);
        return resolve(server);
      });
    });
  });
};
