'use strict';

var _ = require('lodash');
var Order = require('./order.model');


// Get list of matched orders
exports.matchedOrder = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }

  var lookingOrderType = 'Recruitment';
  if(order.orderType == 'Recruitment') {
    lookingOrderType = 'Placement';
  }

  Order.search({

    "bool": {
            "must": [
                {
                    "range": {
                        playerAccomodationCost: {"gte": 0, "lte": parseInt(order.playerAccomodationCost)}
                    }
                },
                {
                    "match" : {
                     orderType : lookingOrderType
                  }
                },
                {
                    "match" : {
                     status : 'Open'
                  }

                }
            ]
        }

      /*range: {
        playerAccomodationCost: {"gte": 0, "lte": 81}
      },
      "filtered" : {
            "filter" : {
                "term" : {
                    orderType : order.orderType
                }
            }
        }*/

    }, function(err, orders){
          if(err) { return handleError(res, err); }
          return res.json(200, orders); 
    });

  });
};


// Get list of orders
exports.index = function(req, res) {
  Order
  .find({})
  .where('user').equals(req.user._id)
  .sort('-createdaAt')
  .exec(function(err, orders) {
      if(err) { return handleError(res, err); }
      return res.json(200, orders);
  });

  /*Order.find({}).sort('-createdaAt').exec(function(err, orders) {
      if(err) { return handleError(res, err); }
      return res.json(200, orders);
  });*/

  
  /*Order.find(function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.json(200, orders);
  });*/
};

// Get a single order
exports.show = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    return res.json(order);
  });
};

// Creates a new order in the DB.
exports.create = function(req, res) {
  req.body.user = req.user._id;
  Order.create(req.body, function(err, order) {
    if(err) { return handleError(res, err); }

    Order.on('es-indexed', function(err, res){
      if (err) throw err;
        /* Document is indexed */
       // console.log(res);
      });

   //search matched orders in elastic search cluster
    Order.search({
      range: {
        playerAccomodationCost: {from:0, to: 81}
      }
    }, function(err, orders){
          if(err) { return handleError(res, err); }
          return res.json(200, orders); 
    });
   //return res.json(200, order); 
  });
};


// Updates an existing order in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Order.findById(req.params.id, function (err, order) {
    if (err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    var updated = _.merge(order, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, order);
    });
  });
};

// Deletes a order from the DB.
exports.destroy = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    order.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}