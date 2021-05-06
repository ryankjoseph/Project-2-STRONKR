// utility to initialize database
require('./config/database');
const ActivityPhase = require('./models/activityPhase');
const Activity = require('./models/activity');
const ActivityDetail = require('./models/activityDetail');
const data = require('./data');
console.log(data.activities);
console.log(data.activityPhases);
// clear out all activityPhases and activities to prevent dups
const p1 = ActivityPhase.deleteMany({});
const p2 = Activity.deleteMany({});
const p3= ActivityDetail.deleteMany({});
Promise.all([p1, p2, p3])
.then(function(results) {
  return Activity.create(data.activities);
})
.then(function(activityPhase) {
  return ActivityPhase.create(data.activityPhases);
})
.then(function(activityDetail){
  return Promise.all([
    Activity.findOne({name: "Lunges"}),
    ActivityPhase.findOne({phase: "Beginner"})
  ]);
})
.then(function(results){
  console.log(`RESULTS ---> ${results}`);
  //x = ActivityDetail.create({activity: results[0]._id, phase: results[1]._id});
  //console.log("x");

  return ActivityDetail.create({activity: results[0]._id, phase: results[1]._id})
})
.then(function(activityDetail){
  return Promise.all([
    Activity.findOne({name: "Squats"}),
    ActivityPhase.findOne({phase: "STRONKR"})
  ]);
})
.then(function(results){
  console.log(`RESULTS ---> ${results}`);
  //x = ActivityDetail.create({activity: results[0]._id, phase: results[1]._id});
  //console.log("x");

  return ActivityDetail.create({activity: results[0]._id, phase: results[1]._id})
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
.then(function(activityDetail) {
  console.log(activityDetail["activity"]);
  return Promise.all([
    Activity.find(activityDetail["activity"]),
    ActivityPhase.find(activityDetail["phase"])
  ]);
})
.then(function(result) {
  console.log(result);
  process.exit();
});