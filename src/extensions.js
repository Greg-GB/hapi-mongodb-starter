'use strict';

module.exports = (server) => {
  // Add a response wrapper
  function responseWrapper (request, reply) {
    const response = request.response.source;
    if (request.response.statusCode === 200) {
      request.response.source = {
        count: (Array.isArray(response)) ? response.length : undefined,
        result: request.response.source
      };
    }
    reply.continue();
  }

  // Add Hapi Server Extensions
  server.ext('onPreResponse', responseWrapper);
};