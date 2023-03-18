'use strict';
const express = require("express");
const auth = require("./auth.routes");
const positions = require("./positions.routes");
const candidates = require("./candidates.routes");
const router = express.Router();

router.use('/auth', auth);
router.use('/positions', positions);
router.use('/candidates', candidates);
module.exports = router;