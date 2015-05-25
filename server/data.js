'use strict';

var port = '27017';
var dbName = 'sandbox';
var url = 'mongodb://' + process.env.IP + ':' + port + '/' + dbName;

var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var assert = require('assert');

var makeMongoId = mongodb.ObjectID;

var useConnection = function(action) {
  mongoClient.connect(url, function(error, db) {
    assert.equal(null, error);
    console.log('** Connected to MongoDB **');
    action(db, function() {
      db.close();
    });
  });
};

var list = function(collection_name, callback) {
  useConnection(function(db, inner_callback) {
    var collection = db.collection(collection_name);
    collection.find({}).toArray(function(error, documents) {
      assert.equal(null, error);
      inner_callback();
      callback(documents);
    });
  });
};

var create = function(collection_name, documents, callback) {
  useConnection(function(db, inner_callback) {
    var collection = db.collection(collection_name);
    collection.insert(documents, function(error, result) {
      assert.equal(null, error);
      inner_callback();
      callback(result);
    });
  });
};

var read = function(collection_name, id, callback) {
  useConnection(function(db, inner_callback) {
    var collection = db.collection(collection_name);
    var find_map = { _id: makeMongoId(id) };
    collection.findOne(find_map, function(error, result) {
      assert.equal(null, error);
      inner_callback();
      callback(result);
    });
  });
};

module.exports = {
  list: list,
  create: create,
  read: read
  // update: update,
  // _delete: _delete
};