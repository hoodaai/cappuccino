'use strict';

var _ = require('lodash');
var Contacts = require('./contacts.model');

// Get list of contactss
exports.index = function(req, res) {
  Contacts.find(function (err, contactss) {
    if(err) { return handleError(res, err); }
    return res.json(200, contactss);
  });
};

// Get a single contacts
exports.show = function(req, res) {
  Contacts.findById(req.params.id, function (err, contacts) {
    if(err) { return handleError(res, err); }
    if(!contacts) { return res.send(404); }
    return res.json(contacts);
  });
};

// Creates a new contacts in the DB.
exports.create = function(req, res) {
  Contacts.create(req.body, function(err, contacts) {
    if(err) { return handleError(res, err); }
    return res.json(201, contacts);
  });
};

// Updates an existing contacts in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Contacts.findById(req.params.id, function (err, contacts) {
    if (err) { return handleError(res, err); }
    if(!contacts) { return res.send(404); }
    var updated = _.merge(contacts, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, contacts);
    });
  });
};

// Deletes a contacts from the DB.
exports.destroy = function(req, res) {
  Contacts.findById(req.params.id, function (err, contacts) {
    if(err) { return handleError(res, err); }
    if(!contacts) { return res.send(404); }
    contacts.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}