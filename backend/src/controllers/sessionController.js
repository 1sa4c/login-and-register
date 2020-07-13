const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
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
                expiresIn: '24h'
            }, (err, token) => {
                res.json({
                    success: true,
                    token: `Bearer ${token}`
                })
            })
        }catch{
            return res.status(500).send({error: 'Something went wrong...'})
        }
    },

    async forgot(req, res) {
        if(!req.body.email) return res.status(400).send('Email required')

        try{
            const user = await User.findOne({email: req.body.email})
            if(!user) return res.status(403).send('This email is not registered')
            const token = crypto.randomBytes(20).toString('hex')

            user.resetPasswordToken = token
            user.resetPasswordExpirationDate = Date.now() + 3600000
            
            await user.save()

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_ADRESS,
                    pass: process.env.EMAIL_PASSWORD
                }
            })

            const mailOptions = {
                from: process.env.EMAIL_ADRESS,
                to: user.email,
                subject: 'Password reset',
                text: `Hi ${user.name} \n 
                Please click on the following link ${process.env.URL}/reset/${token} to reset your password. \n\n 
                If you did not request this, please ignore this email and your password will remain unchanged.\n`
            }

            await transporter.sendMail(mailOptions)
            res.status(200).send('Recovery email sent!')
        } catch(err) {
            console.log(err)
        }
    },

    async reset(req, res) {
        try{
            const user = await User.findOne({
                resetPasswordToken: req.query.resetPasswordToken,
                resetPasswordExpirationDate: {$gt: Date.now()}
            })

            if(!user) return res.status(403).send('Password reset link is invalid or has expired')
            return res.status(200).send({id: user.id})
        } catch {
            return res.status(500).send('Something went wrong...')
        }
    },

    async update(req, res) {
        try{
            const user = await User.findById(req.body.id)
            if(!user) return res.status(403).send('Invalid user')
    
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
            user.password = hashedPassword
            user.resetPasswordToken = null
            user.resetPasswordExpirationDate = null
    
            await user.save()
            res.status(200).send('Password successfully updated!')
        } catch {
            res.status(500).send('Something went wrong...')
        }
    }
}