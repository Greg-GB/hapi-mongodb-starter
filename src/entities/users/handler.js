module.exports = (server, users) => {
  return {
    getUsers: (request, reply) => {
      return users.find(request.query)
        .then(reply, (err) => reply.handleError(err));
    },
    getUserById(request, reply) {
      return users.findById(request.params.user)
        .then(reply, (err) => reply.handleError(err));
    },
    createUser: (request, reply) => {
      return users.create(request.payload)
        .then(reply, (err) => reply.handleError(err));
    },
    updateUserById: (request, reply) => {
      return users.updateById(request.params.user, request.payload)
        .then(() => users.findById(request.params.user))
        .then(reply, (err) => reply.handleError(err));
    },
    deleteUserById: (request, reply) => {
      return users.deleteById(request.params.user)
        .then(reply, (err) => reply.handleError(err));
    }
  };
};
