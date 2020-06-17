const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

module.exports = {
    async register(req, res) {
        const emailExists = await User.findOne({email: req.body.email})
        if(emailExists){
            return res.status(400).send({error: 'An user with this email is already registered'})
        }
    
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        try{
            const newUser = await user.save()
            res.send({user_id: newUser.id})
        } catch(err) {
            res.status(500).send({error: 'Error on saving user'})
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user) return res.status(403).send({error: 'Email or password wrong'})

            const validPass = await bcrypt.compare(req.body.password, user.password)
            if(!validPass) return res.status(403).send({error: 'Email or password wrong'})

            const payload = {
                id: user.id,
                name: user.name
            }

            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 86400
            }, (err, token) => {
                res.json({
                    success: true,
                    token: `Bearer ${token}`
                })
            })
        }catch{
            return res.status(500).send({error: 'Something went wrong...'})
        }
    }
}