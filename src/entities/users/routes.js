module.exports = (app, users) => {
  // Add the users routes
  app.server.route({
    method: 'GET',
    path: '/users',
    handler: users.handler.getUsers
  });

  app.server.route({
    method: 'POST',
    path: '/users',
    handler: users.handler.createUser,
    config: {
      validate: {
        payload: users.model.newUser
      }
    }
  });

  app.server.route({
    method: 'GET',
    path: '/users/{user}',
    handler: users.handler.getUserById,
    config: {
      validate: {
        params: {
          user: users.model.userId
        }
      }
    }
  });

  app.server.route({
    method: 'PUT',
    path: '/users/{user}',
    handler: users.handler.updateUserById,
    config: {
      validate: {
        params: {
          user: users.model.userId
        },
        payload: users.model.updateUser
      }
    }
  });

  app.server.route({
    method: 'DELETE',
    path: '/users/{user}',
    handler: users.handler.deleteUserById,
    config: {
      validate: {
        params: {
          user: users.model.userId
        }
      }
    }
  });
};