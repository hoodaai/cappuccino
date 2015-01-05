'use strict';

var mongoose = require('mongoose'),
	  mongoosastic = require('mongoosastic'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

var OrderSchema = new Schema({
  orderType: {type:String, es_type:'string'},
  name: {type:String, es_type:'string'},
  status: {type:String, es_type:'string'},
  user: { type: Schema.ObjectId, ref: 'User' },
  //league: [{id : {type:String, es_type:'string'}}],
  //league : {'id' : {'type' : 'string'}},
  league: {type:Array, es_type:'string'},
  playerPosition: {type:String, es_type:'string'},
  playerDOB: {type:Date, es_type:'date'},
  playerHeight: {type:Number, es_type:'integer'},
  playerWeight: {type:Number, es_type:'integer'},
  playerShootWith: {type:String, es_type:'string'},
  playerDefensiveScale: {type:Number, es_type:'integer'},
  playerSystemBasedScale: {type:Number, es_type:'integer'},
  playerPhysicalScale: {type:Number, es_type:'integer'},
  playerTeamFee: {type:Number, es_type:'integer'},
  playerAccomodationCost: {type:Number, es_type:'integer'},
  playerEquipmentFee: {type:Number, es_type:'integer'},
  playerOwnTransport: {type:String, es_type:'string'},
  active: {type:Boolean, es_type:'boolean'},
  createdaAt: {type: Date, default: Date.now, es_type:'date'}
});

OrderSchema.plugin(mongoosastic, {index:'matchine',protocol:'http', hydrate:true, host:'127.0.0.1', port:'9292'})
module.exports = mongoose.model('Order', OrderSchema);