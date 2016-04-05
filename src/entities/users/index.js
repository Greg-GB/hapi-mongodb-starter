'use strict';
const BaseEntity = require('../baseEntity');

class User extends BaseEntity {
  constructor(app) {
    super(app, 'users');
  }
  // Add any users specific logic
}

module.exports = User;
