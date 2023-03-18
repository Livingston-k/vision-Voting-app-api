'use strict';
const adminController = require('../controllers/admin.controller')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/users', adminController.Index)
router.get('/user/:id', adminController.Show)
router.put('/user/:id', adminController.Edit)

module.exports = router