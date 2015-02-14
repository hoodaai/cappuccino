/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Contacts = require('./contacts.model');

exports.register = function(socket) {
  Contacts.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Contacts.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('contacts:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('contacts:remove', doc);
}