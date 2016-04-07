module.exports = (server) => {
  // Load Hapi Connections
  server.connection({
    host: server.settings.app.config.host,
    port: server.settings.app.config.port
  });
};