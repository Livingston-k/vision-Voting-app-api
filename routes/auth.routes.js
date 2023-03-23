'use strict';
const authController = require('../controllers/auth.controller')
const UserAuthMiddleware = require('../middleware/auth.middleware')
const express = require('express')
const router = express.Router()

//AUTH ROUTES
router.post('/register', authController.Register)
router.post('/login', authController.Login)
router.get('/authenticated',UserAuthMiddleware.checkAuth, authController.Authenticated_user)


module.exports = router