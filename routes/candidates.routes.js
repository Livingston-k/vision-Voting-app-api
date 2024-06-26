'use strict';
const candidatesController = require('../controllers/candidate.controller')
const AdminAuthMiddleware = require('../middleware/admin.middlware')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/', AdminAuthMiddleware.checkAuth, candidatesController.Index)
router.get('/:id', AdminAuthMiddleware.checkAuth, candidatesController.Show)
router.post('/', AdminAuthMiddleware.checkAuth, candidatesController.Store)
router.put('/:id', AdminAuthMiddleware.checkAuth, candidatesController.Edit)
router.delete('/:id', AdminAuthMiddleware.checkAuth, candidatesController.Destroy)

module.exports = router