const express = require('express');
const router = express.Router();
const stronkrCtrl = require("../controllers/stronkr");

router.get('/', stronkrCtrl.index);
router.get('/allActivities', stronkrCtrl.allActivities);
router.get('/new', stronkrCtrl.new);
router.get("/:id/tickets/new",stronkrCtrl.newTicket);
router.get('/:id', stronkrCtrl.show);

router.delete("/:id",stronkrCtrl.remove);
router.post('/:id', stronkrCtrl.createTicket);
router.post('/', stronkrCtrl.create);
router.post("/ordered", stronkrCtrl.order);

module.exports = router;
