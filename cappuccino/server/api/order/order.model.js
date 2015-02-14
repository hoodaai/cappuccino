'use strict';

var mongoose = require('mongoose'),
	 // mongoosastic = require('mongoosastic'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

var OrderSchema = new Schema({
  orderType: {type:String},
  actorType: {type:String},
  name: {type:String},
  status: {type:String},
  user: { type: Schema.ObjectId, ref: 'User' },

  leagueRecruitingFor: {type:String},
  leaguePlayingFor: [{type:String}],
  
  playerPosition: {type:String},
  playerDOB: {type:Date},
  
  playerDOBRange: {
    Start: Date,
    End: { type: Date }
  },

  playerHeight: {type:Number},
  playerWeight: {type:Number},

  playerHeightRange: {
    floor: Number,
    ceil: Number,
    max: Number,
    min: Number
  },

  playerWeightRange: {
    floor: Number,
    ceil: Number,
    max: Number,
    min: Number
  },

  playerShootWith: {type:String},
  playerDefensiveScale: {type:Number},
  playerSystemBasedScale: {type:Number},
  playerPhysicalScale: {type:Number},
  playerTeamFee: {type:Number},
  playerAccomodationCost: {type:Number},
  playerEquipmentFee: {type:Number},
  playerOwnTransport: {type:String},
  active: {type:Boolean},
  createdaAt: {type: Date, default: Date.now}
});

//OrderSchema.plugin(mongoosastic, {index:'matchine',protocol:'http', hydrate:true, host:'127.0.0.1', port:'9200'})
module.exports = mongoose.model('Order', OrderSchema);