/* eslint-disable handle-callback-err */
var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://admin:BNRnELrcmRhGUjrN@clusterpat-luajm.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, {useNewUrlParser: true});

client.connect(err => {
  console.log('Connected mongo');
  const collection = client.db('test').collection('trainingsTable');
  // perform actions on the collection object
  router.get('/trainings', function(req, res, next) {
    collection.find({}).toArray(function(error, result) {
      if (error) {
        console.log('not found error');
        res.send(error);
      }
      res.json(result);
      res.end();
    });
  });
});

module.exports = router;
