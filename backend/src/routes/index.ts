import express = require("express");

import table from './table.router';
import timeline from './timeline.router';

const router = express.Router();

router.use("/table", table);
router.use("/timeline", timeline)

module.exports = router;
