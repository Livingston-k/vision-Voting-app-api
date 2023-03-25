'use strict';
const voteController = require('../controllers/vote.controller')
const express = require('express')
const router = express.Router()

//Vote ROUTES
router.get('/',voteController.Index)

module.exports = router