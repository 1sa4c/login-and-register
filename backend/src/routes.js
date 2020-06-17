const express = require('express')
const router = express.Router()

const registerValidator = require('./validation/registerValidator')
const loginValidator = require('./validation/loginValidator')

const sessionController = require('./controllers/sessionController')

router.post('/session/register', registerValidator, sessionController.register)
router.post('/session/login', loginValidator, sessionController.login)

module.exports = router