'use strict';
const express = require("express");
const auth = require("./auth.routes");
const positions = require("./positions.routes");
const router = express.Router();

router.use('/auth', auth);
router.use('/positions', positions);
module.exports = router;