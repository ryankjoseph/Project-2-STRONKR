//const Destination = require('../models/destination');
const Activity = require('../models/activity');
const ActivityDetail = require('../models/activityDetail');
const ActivityPhase = require('../models/activityPhase');
var ObjectId = require("mongodb").ObjectID;
module.exports = {
  new: newActivity,
  create,
  addDestinationToFlight,
  newSchedule,
  createNewScheduleItem
};
async function createNewScheduleItem(req,res){
  console.log(req.params.id);
  console.log(req.body);
  newString = `${req.body.date} ${req.body.time}`;
  console.log(newString);
  console.log("^");
  let scheduledDate = new Date(Date.parse(newString));
  const newActivity= await ActivityDetail.findById(ObjectId(req.body.id),function(err,activityDetail){
    //console.log(scheduledDate);
    console.log("^^^");
    console.log(activityDetail.activityLog);
    let saveFlag = true
    let loggedDates =[];
    activityDetail.activityLog.forEach(loggedDate=>(loggedDate.date.toISOString()===scheduledDate.toISOString()) ? saveFlag=false:null)
    console.log("^^^^")
    console.log(saveFlag);
    if (saveFlag){
      activityDetail.activityLog.push({completed: false, date: scheduledDate});
      activityDetail.save(function(err){
        if(err) console.log(err);
        console.log("was saved");
        req.flash("saved", `Workout was saved to ${scheduledDate.toLocaleDateString()}`);
      })
    }
    else{
      console.log(`was not saved ${scheduledDate.toLocaleDateString()}`);
      req.flash("saved", `This workout was already saved to ${scheduledDate.toLocaleDateString()}`);
    }
    res.redirect("/activities/scheduleNew");
  });
  // {activityLog.push()});
  //   Movie.findById(req.params.id, function(err, movie) {
  //     movie.reviews.push(req.body);
  //     movie.save(function(err) {
  //       res.redirect(`/movies/${movie._id}`);
  //     });
  //   });
  // }
  //console.log(newActivity);
  console.log("Hi");
}
//given date find all the "activityDetail" object IDs associated with it
//return the focused body part of the day as well
async function retrieveActivityDetails(dateValue){
  const activityDetail = await ActivityDetail.find({});
  //activity detail.foreach detail -> if date matches date, add activity name
  //add phase id, add completed boolean
  console.log("PONG")
  console.log(typeof(dateValue));
  activityDetail.forEach(detail=> {
    for(i=0; i< detail.activityLog.length;i++){
      console.log("PING")
      console.log(typeof(detail.activityLog[0].date))
      if (detail.activityLog[i].date === dateValue){
        console.log("BLESS")
      }
    }
  })
}

async function newSchedule(req,res){
  //console.log("GOT HERE");
  const activityDetail = await ActivityDetail.find({});
  let activities=[];
  let phases=[];
  let dateAndComplete = [];
  for (const element of activityDetail){
    const p1 = await Activity.find(element["activity"]);
    activities.push(p1[0]);
    const p2= await ActivityPhase.find(element["phase"]);
    phases.push(p2[0]);
    dateAndComplete.push(element['activityLog']);
  }
  let dt = new Date();
  let yr = dt.getFullYear();
  let today= dt.toISOString().slice(0,10);
  noActivities = activities.length;
  console.log(req.flash("saved"));
  console.log("FLASH^");
  res.render("activities/scheduleNew",{sessionMessage: req.flash("saved"), title:"Add To Schedule",activities, activityDetail, phases, number:noActivities, today, yr});
}
function addDestinationToFlight(req, res) {
  console.log("body");
  console.log(req.body);
  console.log("id");
  console.log(req.params);
  Flight.findById(req.params.id, function(err, flight) {
    Destination.create(req.body, function (err, destination) {
      flight.destinations.push(destination._id);
      console.log(flight);
      res.redirect(`/flights/${flight._id}`);
    });
    // flight.destinations.push({airport: req.body.airport, arrival: req.body.arrives});
    // flight.save(function(err) {
    //   res.redirect(`/flights/${flight._id}`);
    // });
  });
}

async function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  console.log(req.body);
  console.log(typeof(ObjectId(req.body.activity)));
  l1 = await ActivityDetail.find({activity: ObjectId(req.body.activity)});
  //if phase exists in any list item, then activity already exists
  let existFlag = false;
  l1.forEach(item => `${item.phase}`===req.body.phase ? (existFlag=true):null);
  if (existFlag){  
    const activities = await Activity.find({});
    //console.log(activities);
    const phases = await ActivityPhase.find({});
    res.render("activities/new",{title: "Existing Workout!", activities, phases});
  }
  else{
    ActivityDetail.create(req.body);
    res.redirect("/stronkr/allActivities")
    }
//   for (let key in req.body) {
//     if (req.body[key] === '') delete req.body[key];
//   }

// //   Movie.findById(req.params.id, function(err, movie) {
// //     movie.reviews.push(req.body);
// //     movie.save(function(err) {
// //       res.redirect(`/movies/${movie._id}`);
// //     });
// //   });
// // }
//   console.log(req.body);
//   console.log("ID!!!");
//   console.log(req.params.id);
//   // req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
//   Flight.findById(req.params.id, function (err, flight) {
//     flight.destinations.push(req.body);
//     flight.save(function(err) {
//       console.log(flight);
// //       res.redirect(`/flights/${flight._id}`);
//     })
//   });
}

async function newActivity(req, res) {
  const activities = await Activity.find({});
  //console.log(activities);
  const phases = await ActivityPhase.find({});
  res.render("activities/new",{title: "New Activity", activities, phases});
  }