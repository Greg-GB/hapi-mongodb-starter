'use strict';

const Hapi = require('hapi');
const Users = require('./entities/users');
const extensions = require('./utils/extensions');
const plugins = require('./utils/plugins');

class HapiServer {
  constructor(db, config) {
    this.dbConn = db;
    this.server = new Hapi.Server();
    this.config = config;
    this.loadConnections();
    this.loadExtensions();
    this.loadPlugins();
    this.loadEntities();
  }
  loadConnections() {
    // Load Hapi Connections
    this.server.connection({
      host: this.config.host,
      port: this.config.port
    });
  }
  loadExtensions() {
    // Load Hapi Extensions
    extensions(this.server);
  }
  loadPlugins() {
    // Load Hapi Plugins
    plugins(this.server);
  }
  loadEntities() {
    // Load Entities
    this.user = new Users(this);
  }
  start() {
    // Start Hapi Server
    return new Promise((resolve, reject) => {
      this.server.start(err => {
        if (err) return reject(err);
        console.log('Server running at:', this.server.info.uri);
        return resolve(null);
      });
    });
  }
}
module.exports = HapiServer;
