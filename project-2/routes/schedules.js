const express = require('express');
const router = express.Router();
const scheduleCtrl = require('../controllers/schedules');

router.get('/today',scheduleCtrl.today)
router.get('/weeklyOverViews', scheduleCtrl.week);


router.post('/today',scheduleCtrl.updateToday);

module.exports = router;