import express = require("express");

// Controllers
const c = require('../controllers');

const router = express.Router();

router.get("/all-distinct-of-field/:field", c.table.allDistinctOfField);
router.get("/number-of-event/:event_type", c.table.numberOfEvent);
router.get("/all-care-recipient-id", c.table.allCareRecipientId);
router.get("/events-of-visit/:visit_id", c.table.eventsOfVisit);

export default router;
