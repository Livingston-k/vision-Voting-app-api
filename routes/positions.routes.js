'use strict';
const positionsController = require('../controllers/position.controller')
const AdminAuthMiddleware = require('../middleware/admin.middlware')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/', AdminAuthMiddleware.checkAuth,positionsController.Index)
router.get('/:id', AdminAuthMiddleware.checkAuth, positionsController.Show)
router.post('/', AdminAuthMiddleware.checkAuth, positionsController.Store)
router.put('/:id', AdminAuthMiddleware.checkAuth, positionsController.Edit)
router.delete('/:id', AdminAuthMiddleware.checkAuth, positionsController.Destroy)

module.exports = router