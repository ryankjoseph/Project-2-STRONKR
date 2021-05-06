const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const approvedFocus =["Chest","Biceps","Triceps","Core","Legs","Lats"];


const activitySchema = new Schema({
  name: {type: String},
  focus: [{type: String, enum: approvedFocus}],
  video:{type: String, default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);