const Activity = require('../models/activity');
const ActivityDetail = require('../models/activityDetail');
const ActivityPhase = require('../models/activityPhase');
const { compile } = require('morgan');

module.exports = {
  index,
  show,
  new: newActivity,
  create,
  order,
  newTicket,
  remove: removeActivity,
  createTicket,
  allActivities
};

async function index(req, res) {
  const activityDetail = await ActivityDetail.find({})
  let activities=[];
  let phases=[];
  for (const element of activityDetail){
    const p1 = await Activity.find(element["activity"]);
    activities.push(p1[0]);
    const p2= await ActivityPhase.find(element["phase"]);
    phases.push(p2[0]);
  }

  noActivities = activities.length;
  res.render("stronkr/index",{ title: 'Home', activities, activityDetail, phases, number: noActivities});
}

async function allActivities(req, res) {
  const activityDetail = await ActivityDetail.find({})
  let activities=[];
  let phases=[];
  for (const element of activityDetail){
    const p1 = await Activity.find(element["activity"]);
    activities.push(p1[0]);
    const p2= await ActivityPhase.find(element["phase"]);
    phases.push(p2[0]);
  }

  noActivities = activities.length;
  res.render("stronkr/allActivities",{ title: 'All Activities', activities, activityDetail, phases, number: noActivities});
}
function createTicket(req,res){
  //console.log("TICKET CREATED");
  req.body.activity = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body(onjID1,objid2)

  const ticket = new Ticket(req.body);
  ticket.save(function(err){
    if (err) return res.redirect(`/activities/${req.params.id}/tickets/new`);
    res.redirect(`/activities/${req.params.id}`);
  })
}
function newTicket(req,res){
  //console.log(Activity.schema.path("airport").enumValues);
  //console.log(req.params);
  //console.log(req.body);
  res.render("activities/newTicket",{title:"New Ticket", activityID: req.params.id});
  // Activity.find({"airport"},function(err,activities) {
  //   console.log(activities);
  // })
}
function removeActivity(req,res){
  //console.log(req.params)
  //console.log(Activity.findOne(req.params.id));
  console.log(`ID ---> ${req.params.id}`);
  //console.log(Activity.find({}))
  Activity.findOneAndDelete({_id: req.params.id},function(err,activities){
    //console.log(activities);
    res.redirect("/activities");

  });

}
function show(req, res) {
  Activity.findById(req.params.id).exec(function(err, activity) {
  //   Ticket.find({activity: activity._id}, function(err, tickets) {
  //     //console.log(activity);
  //     activity.destinations
  //     const dt = new Date();
  //     dateAdd = dt.toISOString().slice(0,16);
  //     //console.log("newactivity departs" + dt.toISOString().slice(0,16));
  //     let yearAdd= dateAdd.split("");
  //     yearAdd[3]=(parseInt(yearAdd[3]) +2 ).toString();
  //     yearAdd=yearAdd.join("");
  //     listOfAllAirports=Activity.schema.path("airport").enumValues;
  //     listOfAirportsVisitedByActivity=[]
  //     activity.destinations.forEach(x=>{
  //       //console.log("x");
  //       //console.log(x.airport);
  //       //console.log("arrival");
  //       //console.log(x.arrival);
  //       listOfAirportsVisitedByActivity.push(x.airport);
  //     })
  //     listOfAirportsVisitedByActivity.push(activity.airport);
  //     let destinationList=listOfAllAirports.filter(x=>!listOfAirportsVisitedByActivity.includes(x));
  //     //console.log(`DESTINATION LIST ---> ${destinationList} ${typeof(destinationList)}`);
  //     //console.log(destinationList);
  //     //destinationList.forEach(d=> console.log(d));
  //     res.render('activities/show', {
  //       title: 'Activity Detail', activity, destinations:destinationList, departsDate: yearAdd, tickets
  //       });
  //   // Performer.find({}).where('_id').nin(movie.cast) <-- Mongoose query builder
  //   // Native MongoDB approach 
  //   // Destination.find(
  //   //  {airport: {$nin: activity.destinations.airport}},
  //   //  function(err, destinations) {
  //   //    const dt = new Date();
  //   //    dateAdd = dt.toISOString().slice(0,16);
  //   //    console.log("newactivity departs" + dt.toISOString().slice(0,16));
  //   //    let yearAdd= dateAdd.split("");
  //   //    yearAdd[3]=(parseInt(yearAdd[3]) +2 ).toString();
  //   //    yearAdd=yearAdd.join("")
  //   //    console.log(destinations);
  //   //    res.render('activities/show', {
  //   //      title: 'Activity Detail', activity, destinations, departsDate: yearAdd
  //   //    });
  // });
     });
  }

function newActivity(req, res) {
  const newActivity= new Activity();
  //console.log(newActivity);
  const dt = new Date();
  dateAdd = dt.toISOString().slice(0,16);
  //console.log("newactivity departs" + dt.toISOString().slice(0,16));
  let yearAdd= dateAdd.split("");
  yearAdd[3]=(parseInt(yearAdd[3]) +1 ).toString();
  yearAdd=yearAdd.join("");
  //console.log("year add" + yearAdd);
  res.render('activities/new', { title: 'Add Activity', departsDate: yearAdd });
}
function order(req,res){
  let activityy;
  //console.log(req.body.ascendingOrDescending);
  sortNo = (req.body.ascendingOrDescending === "ascending") ? 1 : -1;
  Activity.find({}, function(err,activities){
    res.render('activities/index', { title: 'All Activities', activities, ascOrDes: sortNo })
    //console.log(`sorted ---> + ${activities.sort({departs: -1})}`);
    //console.log("bloop");
  }).sort({departs: sortNo});
  //console.log(sortNo);
}
function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  // req.body.nowShowing = !!req.body.nowShowing;
  // for (let key in req.body) {
  //   if (req.body[key] === '') delete req.body[key];
  // }

  //console.log(req.params);
  //req.body.departs= req.body.departs.toISOString().slice(0,16);
  const activity = new Activity(req.body);
  activity.save(function(err) {
    if (err) return res.redirect('/activities/new');
    res.redirect('/activities');
    // res.redirect(`/activities/${activity._id}`);
  });
}
