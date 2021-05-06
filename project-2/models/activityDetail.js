const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const activityLogSchema = new Schema({
  completed: {type: Boolean, default: false},
  date: {type: Date}
}, {
  timestamps: true
});


const activityDetailSchema = new Schema({
  activity:{type: Schema.Types.ObjectId, ref: 'Activity'},
  phase: {type: Schema.Types.ObjectId, ref: 'ActivityPhase'},
  activityLog:[activityLogSchema],
  //destinations: [{type: Schema.Types.ObjectId, ref: 'Destination'}]
});

module.exports = mongoose.model('ActivityDetail', activityDetailSchema);