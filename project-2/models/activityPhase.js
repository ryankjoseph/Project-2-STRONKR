const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const activityPhaseSchema = new Schema({
  phase: {type: String},
  set:{type: Number, min: 1},
  repetitions: {type: Number, min:1},
  daysToUpgrade: {type:Number}
}, {
  timestamps: true
});

module.exports = mongoose.model('ActivityPhase', activityPhaseSchema);