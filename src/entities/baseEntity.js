'use strict';
const DB = require('./../db/index');

class BaseEntity {
  constructor(app, entityType) {
    this.service = new DB(app, entityType);
    this.model = require(`./${entityType}/model`);
    this.handler = require(`./${entityType}/handler`)(this);
    this.routes = require(`./${entityType}/routes`)(app, this);
  }
  service() {
    return this.service;
  }
  model() {
    return this.model;
  }
  handler() {
    return this.handler;
  }
  routes() {
    return this.routes;
  }
}
module.exports = BaseEntity;