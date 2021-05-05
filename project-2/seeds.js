// utility to initialize database
require('./config/database');
const ActivityPhase = require('./models/activityPhase');
const Activity = require('./models/activity');
const data = require('./data');
console.log(data.activities);
console.log(data.activityPhases);
// clear out all activityPhases and activities to prevent dups
const p1 = ActivityPhase.deleteMany({});
const p2 = Activity.deleteMany({});
Promise.all([p1, p2])
.then(function(results) {
  return Activity.create(data.activities);
})
.then(function(performers) {
  return ActivityPhase.create(data.activityPhases);
})
// .then(function(activityDetails) {
//   return Promise.all([
//     Performer.findOne({name: 'Mark Hamill'}),
//     ActivityDetail.findOne({title: 'Star Wars - A New Hope'})
//   ]);
// })
// .then(function(results) {  // one day we'll destructure this!
//   const mark = results[0];
//   const starWars = results[1];
//   starWars.cast.push(mark);
//   return starWars.save();
// })
.then(function() {
  process.exit();
});