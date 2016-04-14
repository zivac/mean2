var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');

var router = express.Router();

var bodyParser = require('body-parser')
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var Collection = mongoose.model('Model', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  mainField: String,
  blueprint: {},
  form: {}
});
var collections = {};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  Collection.find(function(err, data) {
    data.forEach(function(item) {
      collections[item.name] = mongoose.model(item.name, item.blueprint);
    })
  });
  // we're connected!
});

router.param('collectionName', function(req, res, next, collectionName){
  if(!collections[collectionName]) return next('requested collection does not exist');
  req.collection = collections[collectionName];
  return next();
});

router.get('/:collectionName', function(req, res, next) {
  var filters = req.query.where?req.query.where:_.omit(req.query, ['limit', 'skip', 'sort']);
  var query = req.collection.find(filters);
  if(req.query.limit) query = query.limit(parseInt(req.query.limit));
  if(req.query.skip) query = query.skip(parseInt(req.query.skip));
  if(req.query.sort) query = query.sort(req.query.sort);
  query.exec(function(err, results) {
    if(err) return next(err);
    res.send(results);
  })
})

router.get('/:collectionName/:id', function(req, res, next) {
  req.collection.findOne({_id: req.params.id}, function(err, results){
    if(err) return next(err)
    res.send(results)
  });
})

router.post('/:collectionName', function(req, res, next) {
  req.collection.create(req.body, function(err, results){
    if(err) return next(err)
    res.send(results)
  });
})

router.post('/:collectionName/:id', function(req, res, next) {
  req.collection.update({_id: req.params.id}, req.body, function(err, results){
    if(err) return next(err)
    res.send(results)
  });
})

router.delete('/:collectionName/:id', function(req, res, next) {
  req.collection.remove({_id: req.params.id}, function(err) {
    if(err) return next(err);
    res.send('deleted');
  })
})

router.get('/', function(req, res, next) {
  Collection.find(function(err, data) {
    if(err) return next(err);
    res.send(data);
  })
})

router.post('/', function(req, res, next) {
  var item = req.body;
  console.log(item);
  if(!item.name) return res.send(400, 'No collection name provided');
  if(collections[item.name]) {
    delete mongoose.connection.models[item.name];
    collections[item.name] = mongoose.model(item.name, item.blueprint);
    Collection.update({name:item.name}, item, function(err,data) {
      if(err) return next(err);
      res.send(item);
    })
  } else {
    collections[item.name] = mongoose.model(item.name, item.blueprint);
    Collection.create(req.body, function(err, data) {
      if(err) return next(err);
      res.send(data);
    })
  }
})

module.exports = router;
