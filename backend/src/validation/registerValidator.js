const Joi = require('joi')

const registerSchema = {
    name: Joi.string().trim().required().required().label('Name'),
    email: Joi.string().trim().email({minDomainAtoms: 2}).required().label('Email'),                                      
    password: Joi.string().trim().min(6).max(30).required().label('Password'),
    passwordConfirmation: Joi.any().valid(Joi.ref('password')).required().options({language: {any: {allowOnly: ' must match'}}}).label('Password confirmation')
}

const registerValidator = (req, res, next) => {
    const {error} = Joi.validate(req.body, registerSchema, {abortEarly: false})
    if(error){
        const {details} = error
        const errors = {}
        details.forEach(item => {
            errors[item.path] = item.message.replace(/["]/g, '')
        })
        return res.status(422).json({errors: errors})
    }
    next()
}

module.exports = registerValidator