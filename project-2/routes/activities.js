const express = require('express');
const router = express.Router();
const activitiesCtrl = require('../controllers/activities');

// router.get('/destinations/new', destinationsCtrl.new);
// router.post('/destinations', destinationsCtrl.create);
router.get('/new', activitiesCtrl.new);
router.get("/scheduleNew",activitiesCtrl.newSchedule);
router.post('/new', activitiesCtrl.create);
router.post("/scheduleNew",activitiesCtrl.createNewScheduleItem);

module.exports = router;