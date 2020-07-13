const express = require('express')
const router = express.Router()
const passport = require('passport')

const registerValidator = require('./validation/registerValidator')
const loginValidator = require('./validation/loginValidator')

const sessionController = require('./controllers/sessionController')
const dashboardController = require('./controllers/dashboardController')

router.post('/session/register', registerValidator, sessionController.register)
router.post('/session/login', loginValidator, sessionController.login)

router.post('/session/forgot', sessionController.forgot)
router.get('/session/reset', sessionController.reset)
router.put('/session/update', sessionController.update)

router.get('/dashboard', passport.authenticate('jwt', {session: false}), dashboardController.show)

module.exports = router