const Joi = require('joi')

const loginSchema = {
    email: Joi.string().trim().required().email({minDomainAtoms: 2}).label('Email'),
    password: Joi.string().trim().required().min(6).max(30).label('Password')
}

const loginValidation = (req, res, next) => {
    const {error} = Joi.validate(req.body, loginSchema, {abortEarly: false})
    if(error){
        return res.status(422).json({error: 'Email or password wrong'})
    }
    next()
}

module.exports = loginValidation