'use strict';
const positionsController = require('../controllers/position.controller')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.get('/', positionsController.Index)
router.get('/:id', positionsController.Show)
router.post('/', positionsController.Store)
router.put('/:id', positionsController.Edit)
router.delete('/:id', positionsController.Destroy)

module.exports = router