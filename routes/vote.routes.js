'use strict';
const voteController = require('../controllers/vote.controller')
const UserAuthMiddleware = require('../middleware/auth.middleware')
const express = require('express')
const router = express.Router()

//Vote ROUTES
router.get('/', UserAuthMiddleware.checkAuth, voteController.Index)

module.exports = router