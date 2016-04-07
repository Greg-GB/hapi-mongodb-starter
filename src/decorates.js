'use strict';

const Boom = require('boom');

module.exports = (server) => {

  var errors = function(type) {
    type = (Boom[type]) ? type : 'badRequest';

    return (message, data) => {
      return this.response(Boom[type](message, data));
    };
  };

  const handleError = function(err) {
    var self = this;
    // Add checks if need be
    if (err === 'Not Found') {
      return self.response(Boom.notFound());
    }

    if(err.name === "MongoError") {
      switch (err.code) {
        case 11000:
          return self.response(Boom.badRequest(err.message.match(/[^,]*$/)));
          break;
      }
    }
    return self.response(Boom.badRequest(err));
  };

  // Add Boom Errors to reply
  server.decorate('reply', 'errors', errors);
  // Add Handle Error to reply
  server.decorate('reply', 'handleError', handleError);
};