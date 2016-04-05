const routeUtils = require('../../utils/routeUtils');

module.exports = (users) => {
  return {
    getUsers: (request, reply) => {
      return users.service.find()
        .then(reply, (err) => reply(routeUtils.handleError(err)));
    },
    getUserById(request, reply) {
      return users.service.findById(request.params.user)
        .then(reply, (err) => reply(routeUtils.handleError(err)));
    },
    createUser: (request, reply) => {
      return users.service.create(request.payload)
        .then(reply, (err) => reply(routeUtils.handleError(err)));
    },
    updateUserById: (request, reply) => {
      return users.service.updateById(request.params.user, request.payload)
        .then(() => users.service.findById(request.params.user))
        .then(reply, (err) => reply(routeUtils.handleError(err)));
    },
    deleteUserById: (request, reply) => {
      return users.service.deleteById(request.params.user)
        .then(reply, (err) => reply(routeUtils.handleError(err)));
    }
  };
};
