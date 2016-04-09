'use strict';

exports.register = (server, options, next) => {
  const DB = require('../../db');
  const model = require('./model');
  const db = new DB(options.db, 'users');
  const handler = require('./handler')(server, db);

  // Expose Users DB if need be
  server.expose('users', () => db);

  // Add the users routes
  server.route([
    {
      method: 'GET',
      path: '/users',
      handler: handler.getUsers
    },
    {
      method: 'POST',
      path: '/users',
      handler: handler.createUser,
      config: {
        validate: {
          payload: model.newUser
        }
      }
    },
    {
      method: 'GET',
      path: '/users/{user}',
      handler: handler.getUserById,
      config: {
        validate: {
          params: {
            user: model.userId
          }
        }
      }
    },
    {
      method: 'PUT',
      path: '/users/{user}',
      handler: handler.updateUserById,
      config: {
        validate: {
          params: {
            user: model.userId
          },
          payload: model.updateUser
        }
      }
    },
    {
      method: 'DELETE',
      path: '/users/{user}',
      handler: handler.deleteUserById,
      config: {
        validate: {
          params: {
            user: model.userId
          }
        }
      }
    }
  ]);

  return next();
};

exports.register.attributes = {
  name: 'users'
};