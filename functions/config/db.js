const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoUri = 'mongodb://admin:VuOd3VKlZCpBVLYQ@meu-dinheiro-shard-00-00-qcut3.mongodb.net:27017,meu-dinheiro-shard-00-01-qcut3.mongodb.net:27017,meu-dinheiro-shard-00-02-qcut3.mongodb.net:27017/meu-dinheiro?ssl=true&replicaSet=meu-dinheiro-shard-0&authSource=admin';
const connect = () => MongoClient.connect(mongoUri);

module.exports = {
  connect,
  ObjectID
};
