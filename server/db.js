'use strict';

var port = '27017';
var dbName = 'sandbox';
var url = 'mongodb://' + process.env.IP + ':' + port + '/' + dbName;

var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

var makeMongoId = mongodb.ObjectID;

var connect = function(collectionName, callback, onConnected) {
  mongoClient.connect(url, function(error, db) {
    if (error) {
      callback(error);
      return;
    }
    console.log('** Connected to MongoDB **');
    var collection = db.collection(collectionName);
    onConnected(collection, function(error, result) {
      db.close();
      callback(error || result);
    });
  });
};

var list = function(collectionName, callback) {
  connect(collectionName, callback, function(collection, onComplete) {
    collection.find({}).toArray(onComplete);
  });
};

var create = function(collectionName, documents, callback) {
  connect(collectionName, callback, function(collection, onComplete) {
    collection.insert(documents, onComplete);
  });
};

var read = function(collectionName, id, callback) {
  connect(collectionName, callback, function(collection, onComplete) {
    var filter = { _id: makeMongoId(id) };
    collection.findOne(filter, onComplete);
  });
};

var update = function(collectionName, id, update, callback) {
  connect(collectionName, callback, function(collection, onComplete) {
    var filter = { _id: makeMongoId(id) };
    collection.update(filter, update, onComplete);
  });
};

var destroy = function(collectionName, id, callback) {
  connect(collectionName, callback, function(collection, onComplete) {
    var filter = { _id: makeMongoId(id) };
    collection.remove(filter, onComplete);
  });
};

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
};