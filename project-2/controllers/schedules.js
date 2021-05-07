
const Activity = require('../models/activity');
const ActivityDetail = require('../models/activityDetail');
const ActivityPhase = require('../models/activityPhase');
var ObjectId = require("mongodb").ObjectID;
module.exports = {
  create,
  today,
  week,
  updateToday
};

async function updateToday(req,res){
  // console.log("====================================================");
  // console.log(req.body);
  // console.log("====================================================");
  // let adID = ObjectId(req.body.activityDetailID);
  // console.log(adID);
  // let alID = ObjectId(req.body.activityLogID);
  
  
  // This works
  // const lookup = await ActivityDetail.findOne(req.body.activityDetailID).then(doc=)
  // console.log(lookup);
  // console.log("DOC");
  //FIND ONE AND UPDATE (finally worked!!!)
  await ActivityDetail.findOneAndUpdate({_id: req.body.activityDetailID, "activityLog._id":req.body.activityLogID },{"activityLog.$.completed": "true"} )

  // console.log(lookup);
  // lookup.activityLog.forEach(activity=>{
  //   if (alID.toISOString ===activity.id.toISOString){
  //     activity.
  //   }
  
  // });
  res.redirect("/schedule/today");
}
async function retrieveActivity(id){
  console.log(id);
  let [activity] = await Activity.find(id);
  return activity
}

async function retrievePhase(id){
  let [phase] = await ActivityPhase.find(id);
  return phase
}
async function retrieveActivityDetails(dateValue){
  const activityDetail = await ActivityDetail.find({});
  //activity detail.foreach detail -> if date matches date, add activity name
  //add phase id, add completed boolean
  // console.log("PONG")
  // console.log(typeof(dateValue));
  // console.log(activityDetail);
  let detailIDs=[];
  let activityIDs=[]
  let activityList=[];
  let activityLogIDs=[];
  let phaseList =[];
  let phaseIDs=[];
  let dates = [];
  let trialLookUp;
  let completed=[];
  let objArray =[];
  await activityDetail.forEach(detail=> {
    //console.log(detail);
    //console.log("detail");
    for(i=0; i< detail.activityLog.length;i++){
      // console.log("PING")
      //console.log(detail.activityLog[0].date.toISOString().slice(0,10))
      if (detail.activityLog[i].date.toISOString().slice(0,10) === dateValue.toISOString().slice(0,10)){
        console.log("BLESS");
        // let detailActivity= retrieveActivity(detail.activity)
        // let detailPhase = retrievePhase(detail.phase);
        let obj ={activityDetail: detail.activity, activityLogID: detail.activityLog[i].id, phaseID: detail.phase, detailID: detail.id, date: detail.activityLog[i].date, completed: detail.activityLog[i].completed};
        activityIDs.push(detail.activity);
        activityLogIDs.push(detail.activityLog[i].id);
        phaseIDs.push(detail.phase)
        detailIDs.push(detail.id);
        dates.push(detail.activityLog[i].date);
        completed.push(detail.activityLog[i].completed);
        objArray.push(obj);
        //activityList.push(detailActivity);
        //phaseList.push(detailPhase);
        
      }
    }
  })
  // console.log(detailIDs);
  // console.log(phaseIDs);
  // console.log(activityIDs);
  // console.log("IDS");
  await console.log(objArray);
  for (i=0;i<activityIDs.length;i++){
    const a = await retrieveActivity(ObjectId(activityIDs[i]));
    objArray[i]["activity"] = a;
    activityList.push(a);
    const p = await retrievePhase(ObjectId(phaseIDs[i]));
    phaseList.push(p);
    objArray[i]["phase"] = p;
  }
  // console.log("LOOOOOOOOOOOOOOOOOKIE HERE ===>===========>");
  // console.log(objArray);
  // console.log(activityList);
  // console.log(phaseList);
  let listLength = phaseList.length
  //console.log(completed);
  return {objArray, completed, dates, phaseList, activityList, detailIDs, listLength, activityLogIDs}
}

//used for progressBar
function progressCheck(completedList){
  completedMap={}
  completedMap["true"]=0;
  completedMap["false"]=0;
  completedListNo = completedList.length;
  completedList.forEach(item => item ? completedMap["true"]++:completedMap["false"]++)
  return Math.floor(100*completedMap["true"]/completedListNo);
}



function modeOfFocus(activityList) {
  //put all focuses into on list
  let focusList = [];
  activityList.forEach(activity=>{
    activity.focus.forEach(focus=>{
      focusList.push(focus)
    })
  })
  //apply mode function
  let focusMap ={};
  let maxFocus =[];
  let maxCount=0;
  for(i=0;i<focusList.length;i++){
    if (focusMap[focusList[i]]){
      focusMap[focusList[i]]++
    }else{
      focusMap[focusList[i]] =1;
    }
    if (focusMap[focusList[i]] > maxCount){
      maxCount = focusMap[focusList[i]];
      maxFocus = [focusList[i]];
    }else if (focusMap[focusList[i]] === maxCount){
      maxFocus.push(focusList[i]);
    }
  }
  let keyList= Object.keys(focusMap);
  let percentageList=[];
  keyList.forEach(key=>percentageList.push(100*focusMap[key]/focusList.length))
  console.log(` This is the key${keyList}\nThis is the percentage${percentageList}`);
  return {mode: maxFocus, keyList, percentageList}
}

//thoughts for updating: find by id, 
async function today(req,res){
  const dt = new Date();
  console.log(dt);
  //returns {completed, dates, phaseList, activityList, detailIDs, listLength}
  const detailsObject= await retrieveActivityDetails(dt);
  //returns {mode: maxFocus, keyList, percentageList, activityLogIDs}
  let mainFocus = modeOfFocus(detailsObject.activityList);
  // console.log(`Mode --> ${mainFocus.mode}`);
  // console.log(mainFocus.keyList);
  let objectArray = detailsObject.objArray;

  objectArray.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date);
  });
  //remove completed array items:
  incompleteActivityArray=[];
  objectArray.forEach(element=> element.completed ? null:incompleteActivityArray.push(element));

  if (incompleteActivityArray.length===0){
    video = "";
  }
  else{
    video=`${incompleteActivityArray[0].activity.video}`;

  }
  let vidFlag = true;
  console.log("VIDEO");
  console.log(video);
  console.log(incompleteActivityArray);
  let completedStats=progressCheck(detailsObject.completed);
  console.log(completedStats);
  // console.log("BEEP");
  res.render("schedule/today",{completedStats, title:"Today's Workouts",objectArray,incompleteActivityArray, video, vidFlag})
}
function week(req,res){
  console.log("week")
}
function create(req, res) {
  console.log("BODY ----->");
  console.log(req.body);
  Movie.findById(req.params.id, function(err, movie) {
    movie.reviews.push(req.body);
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}