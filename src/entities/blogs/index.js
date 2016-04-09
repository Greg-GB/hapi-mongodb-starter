'use strict';

exports.register = (server, options, next) => {
  const DB = require('../../db');
  const model = require('./model');
  const db = new DB(options.db, 'blogs');
  const handler = require('./handler')(server, db);

  // Expose Blogs DB if need be
  server.expose('blogs', () => db);

  // Add the users routes
  server.route([
    {
      method: 'GET',
      path: '/blogs',
      handler: handler.getBlogs
    },
    {
      method: 'POST',
      path: '/blogs',
      handler: handler.createBlog,
      config: {
        validate: {
          payload: model.newBlog
        }
      }
    },
    {
      method: 'GET',
      path: '/blogs/{blog}',
      handler: handler.getBlogById,
      config: {
        validate: {
          params: {
            blog: model.blogId
          }
        }
      }
    },
    {
      method: 'PUT',
      path: '/blogs/{blog}',
      handler: handler.updateBlogById,
      config: {
        validate: {
          params: {
            blog: model.blogId
          },
          payload: model.updateBlog
        }
      }
    },
    {
      method: 'DELETE',
      path: '/blogs/{blog}',
      handler: handler.deleteBlogById,
      config: {
        validate: {
          params: {
            blog: model.blogId
          }
        }
      }
    }
  ]);

  return next();
};

exports.register.attributes = {
  name: 'blogs',
  dependencies: 'users'
};