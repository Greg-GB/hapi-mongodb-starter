const Boom = require('boom');

module.exports = {
  handleError(err) {
    // Add Error Catches
    if (err === 'Not Found') {
      return new Boom.notFound();
    }
    
    if(err.name === "MongoError") {
      switch (err.code) {
        case 11000:
          return new Boom.badRequest(err.message.match(/[^,]*$/));
          break; 
      }
    }
    return new Boom.badRequest(err);
  }
};
