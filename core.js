var express = require('express');
var fs = require('fs');

var router = express.Router();

var bodyParser = require('body-parser')
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Collection = mongoose.model('Model', {name: String, blueprint: {}});
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

router.get('/', function(req, res) {
    res.send('Api index');
});

router.get('/hello', function(req, res) {
    res.send('Hello world');
});

router.get('/test', function(req, res) {
  res.send('test');
});

router.param('collectionName', function(req, res, next, collectionName){
  if(!collections[collectionName]) return next('requested collection does not exist');
  req.collection = collections[collectionName];
  return next();
});

router.get('/collections/:collectionName', function(req, res, next) {
  req.collection.find(function(err, results){
    if(err) return next(err)
    res.send(results)
  })
})

router.get('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.findOne(req.params.id, req.body, function(err, results){
    if(err) return next(err)
    res.send(results)
  });
})

router.post('/collections/:collectionName', function(req, res, next) {
  req.collection.create(req.body, function(err, results){
    if(err) return next(err)
    res.send(results)
  });
})

router.post('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.update(req.params.id, req.body, function(err, results){
    if(err) return next(err)
    res.send(results)
  });
})

router.delete('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.remove({_id: req.params.id}, function(err) {
    if(err) return next(err);
    res.send('deleted');
  })
})

router.get('/collections', function(req, res, next) {
  Collection.find(function(err, data) {
    if(err) return next(err);
    res.send(data);
  })
})

router.post('/collections', function(req, res, next) {
  var item = req.body;
  console.log(item);
  collections[item.name] = mongoose.model(item.name, item.blueprint);
  Collection.create(req.body, function(err, data) {
    if(err) return next(err);
    res.send(data);
  })
})

// router.all('/*', function(req, res) {
//   res.send(404, 'Not found');
// });

module.exports = {
  init: function(callback) {
    global.Test = 'this is my text';
    fs.readdir('./models', function (err, files) {
      files.forEach(function(file) {
        var modelDefinition = require('./models/'+file);
        global[file.split('.')[0]] = mongoose.model(file.split('.')[0], modelDefinition);
      });
      fs.readdir('./policies', function(err, files) {
        var policies = [];
        files.forEach(function(file) {
          var policyDefinition = require('./policies/'+file);
          console.log(policyDefinition);
        })
        console.log(require('./config/policies.js'));
        fs.readdir('./controllers', function(err, files) {
          files.forEach(function(file) {
            var controllerDefinition = require('./controllers/'+file);
            var controllerRoute = file.replace('Controller', '').split('.')[0];
            var controllerRouter = express.Router();
            if(global[controllerRoute]) {
              //blueprint find
              controllerRouter.get('/', function(req, res, next) {
                global[controllerRoute].find(req.query, function(err, data) {
                  if(err) return next(err);
                  res.json(data);
                })
              })
              //blueprint findOne
              controllerRouter.get('/:id', function(req, res, next) {
                global[controllerRoute].findOne(req.params.id, req.body, function(err, data){
                  if(err) return next(err)
                  res.json(data)
                });
              })
              //blueprint create
              controllerRouter.post('/', function(req, res, next) {
                global[controllerRoute].create(req.body, function(err, data){
                  if(err) return next(err)
                  res.json(data)
                });
              })
              //blueprint update
              controllerRouter.post('/:id', function(req, res, next) {
                global[controllerRoute].update(req.params.id, req.body, function(err, data){
                  if(err) return next(err)
                  res.json(data)
                });
              })
              //blueprint delete
              controllerRouter.delete('/:id', function(req, res, next) {
                global[controllerRoute].remove({_id: req.params.id}, function(err, data) {
                  if(err) return next(err);
                  res.json(data);
                })
              })
            }
            for(var route in controllerDefinition) {
              if(typeof controllerDefinition[route] == 'function') {
                controllerRouter.all('/'+route, controllerDefinition[route]);
                //console.log('/'+controllerRoute+'/'+route);
                //router.all('/'+controllerRoute+'/'+route, controllerDefinition[route])
              }
            }
            router.use('/'+controllerRoute, controllerRouter);
          });
          router.all('/*', function(req, res) {
            res.send(404, 'Not found');
          });
          callback(err, router);
        })
      });
    });

  }
}
