const Joi = require('joi')

const registerSchema = {
    name: Joi.string().trim().required().label('Name'),
    email: Joi.string().trim().required().email({minDomainAtoms: 2}).label('Email'),                                      
    password: Joi.string().trim().required().min(6).max(30).label('Password'),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({language: {any: {allowOnly: 'must match password'}}})
}

const registerValidator = (req, res, next) => {
    const {error} = Joi.validate(req.body, registerSchema, {abortEarly: false})
    if(error){
        const {details} = error
        const message = details.map(item => item.message).join(',')
        return res.status(422).json({error: message})
    }
    next()
}

module.exports = registerValidator