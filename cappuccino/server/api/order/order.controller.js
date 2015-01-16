'use strict';

var _ = require('lodash');
var Order = require('./order.model');
var elasticsearch = require('elasticsearch');
var elasticSearchClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


// Get list of matched orders
exports.matchedOrder = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }

    var lookingOrderType = 'Recruitment';
    if(order.orderType == 'Recruitment') {
      lookingOrderType = 'Placement';
    }
    performMatch(order, res);
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

    createDocumentES(order);

    /*Order.on('es-indexed', function(err, res){
      if (err) throw err;
        
       // console.log(res);
      });*/

   //search matched orders in elastic search cluster
   //return performMatch(order, res);
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
        return performMatch(order, res);
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


function createDocumentES(order) {

   
    elasticSearchClient.create({
        index: 'matchine',
        type: 'hockeyOrder',
        // id: '1',
        body: {
          id: order._id,
          name: order.name,
          orderType: order.orderType,
          actorType: order.actorType,
          status: order.status,
          league:  JSON.stringify(order.league),
          playerPosition: order.playerPosition,
          playerDOB: order.playerDOB,

          playerDOBRange: JSON.stringify(order.playerDOBRange),
          
          playerHeight: order.playerHeight,
          playerWeight: order.playerWeight,

          playerHeightRange: JSON.stringify(order.playerHeightRange),

          playerWeightRange: JSON.stringify(order.playerWeightRange),


          playerShootWith: order.playerShootWith,
          playerDefensiveScale: order.playerDefensiveScale,
          playerSystemBasedScale: order.playerSystemBasedScale,
          playerPhysicalScale: order.playerPhysicalScale,
          playerTeamFee: order.playerTeamFee,
          playerAccomodationCost: order.playerAccomodationCost,
          playerEquipmentFee: order.playerEquipmentFee,
          playerOwnTransport: order.playerOwnTransport,
          user: order.user,
          createdaAt: order.createdaAt
        }
    }, function (error, response) {
        // ...
    });

    //eventEmitter.emit('doOutput', {message:'okay'});
}

function performMatch(order, res) {
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
                  "range": {
                    playerTeamFee: {"gte": 0, "lte": parseInt(order.playerTeamFee)}
                  }
                },
                 {
                  "range": {
                    playerEquipmentFee: {"gte": 0, "lte": parseInt(order.playerEquipmentFee)}
                  }
                },
                /*{
                  "range": {
                    playerHeight: {"gte": 0, "lte": parseInt(order.playerHeight)}
                  }
                },
                {
                  "range": {
                    playerWeight: {"gte": 0, "lte": parseInt(order.playerWeight)}
                  }
                },*/
                {
                  "match" : {
                   orderType : lookingOrderType
                  }
                },
                {
                  "match" : {
                   status : 'Open'
                  }

                },
                {
                  "match" : {
                    playerShootWith : order.playerShootWith
                  }
                },
                {
                  "match" : {
                    playerOwnTransport : order.playerOwnTransport
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

}