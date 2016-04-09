'use strict';

const Good = require('good');
const GoodConsole = require('good-console');
const users = require('./entities/users');
const blogs = require('./entities/blogs');

module.exports = (db) => {
  const plugins = [];

  // Good Plugin
  plugins.push({
    register: Good,
    options: {
      reporters: [{
        reporter: GoodConsole,
        events: {
          response: '*',
          log: '*'
        }
      }]
    }
  });

  // Users Entity Plugin
  plugins.push({
    register: users,
    options: {
      db: db
    }
  });

  // Blogs Entity Plugin
  plugins.push({
    register: blogs,
    options: {
      db: db
    }
  });

  return plugins
};