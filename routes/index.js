'use strict';
const express = require("express");
const auth = require("./auth.routes");
const positions = require("./positions.routes");
const candidates = require("./candidates.routes");
const dashboard = require("./dashboard.routes");
const router = express.Router();

router.use('/auth', auth);
router.use('/positions', positions);
router.use('/candidates', candidates);
router.use('/dashboard', dashboard);
module.exports = router;