module.exports = (server) => {
  // Add HTTP connection
  const httpServer = {
    host: server.settings.app.config.host,
    port: server.settings.app.config.port
  };

  // Load Hapi Connections
  server.connection(httpServer);
};