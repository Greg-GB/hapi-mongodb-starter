'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

class DB {
  constructor(dbConn, collectionName) {
    this.db = dbConn.collection(collectionName);
  }
  static createIndexes(conn) {
    const indexes = [
      {
        collectionName: 'users',
        keys: {
          username: 1
        },
        options: {
          unique: true
        }
      },
      {
        collectionName: 'users',
        keys: {
          email: 1
        },
        options: {
          unique: true
        }
      }
    ];

    const indexPromises = indexes.map(index => {
      return conn.collection(index.collectionName).createIndex(index.keys, index.options);
    });

    return Promise.all(indexPromises)
      .then(() => conn)
  }
  static connectDB(config) {
    // Connect to DB
    return new Promise((resolve, reject) => {
      MongoClient.connect(config.dbUrl, config.dbOptions, (err, conn) => {
        if (err) return reject(err);
        return resolve(conn);
      });
    })
    .then(conn => {
      return this.createIndexes(conn)
    });
  }
  static dropDB(dbUrl) {
    // Connect to DB
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbUrl, (err, conn) => {
        if (err) return reject(err);
        return resolve(conn);
      });
    })
    .then(dbConn => {
      return new Promise((resolve, reject) => {
        dbConn.dropDatabase(err => {
          if (err) return reject(err);
          return resolve();
        });
      });
    });
  }
  find(query, options) {
    // Find Docs
    return new Promise((resolve, reject) => {
      this.db.find(query, options).toArray((err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      });
    });
  }
  findById(id, options) {
    // Find Doc by Id
    return new Promise((resolve, reject) => {
      this.db.find({ _id: new ObjectID(id) }, options).limit(1).next((err, doc) => {
        if (err) return reject(err);
        if (!doc || (doc && (doc.count === null || doc.result === null))) {
          return reject('Not Found');
        }
        return resolve(doc);
      });
    });
  }
  create(entity, options) {
    // Create new Doc
    entity._id = new ObjectID();
    return new Promise((resolve, reject) => {
      this.db.insertOne(entity, options, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc.ops[0]);
      });
    });
  }
  updateById(id, entity, options) {
    // Update Doc by Id
    return new Promise((resolve, reject) => {
      this.db.updateOne({_id: new ObjectID(id)}, {$set: entity}, options, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc);
      });
    });
  }
  deleteById(id, options) {
    // Find Doc by Id
    return new Promise((resolve, reject) => {
      this.db.deleteOne({_id: new ObjectID(id)}, options, err => {
        if (err) return reject(err);
        return resolve({});
      });
    });
  }
}

module.exports = DB;
