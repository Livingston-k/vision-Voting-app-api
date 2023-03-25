'use strict';
const pollingController = require('../controllers/polling.controller')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/:positionId',pollingController.Index)

module.exports = router