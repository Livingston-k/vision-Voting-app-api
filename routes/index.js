'use strict';
const express = require("express");
const auth = require("./auth.routes");
const categories = require("./categories.routes");
const candidates = require("./candidates.routes");
const dashboard = require("./dashboard.routes");
const vote = require("./vote.routes");
const router = express.Router();

router.use('/auth', auth);
router.use('/categories', categories);
router.use('/candidates', candidates);
router.use('/dashboard', dashboard);
router.use('/vote', vote);
module.exports = router;