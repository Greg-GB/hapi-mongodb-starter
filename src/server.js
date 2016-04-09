'use strict'; 

const Hapi = require('hapi');
const plugins = require('./plugins');
const decorates = require('./decorates');
const connections = require('./connections');
const extensions = require('./extensions');
const DB = require('./db/index');

class Server {
  constructor(config) {
    this.config = config;
    this.server = new Hapi.Server({
      app: {
        config: config
      }
    });
    // Add Hapi Server Decorates
    decorates(this.server);
    // Add Hapi Server Connections
    connections(this.server);
    // Add Hapi Server Extensions
    extensions(this.server);
  }

  connectDB() {
    return DB.connectDB(this.config);
  }

  start() {
    return this.connectDB()
      .then(dbConn => {
        // Register Hapi Plugins and Start Server
        return this.server.register(plugins(dbConn))
      })
      .then(() => {
        return this.server.start();
      })
      .then(() => {
        console.log('Server running at:', this.server.info.uri);
        return this.server;
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      });
  }

  stop() {
    return this.server.stop()
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      });
  }
}

module.exports = Server;