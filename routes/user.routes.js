'use strict';
const userController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/users', userController.Index)
router.get('/user/:id', authController.Show)
router.put('/user/:id', authController.Edit)

module.exports = router