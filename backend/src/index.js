const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const cors = require('cors')

dotenv.config()

const port = process.env.PORT
const app = express()
const routes = require('./routes')

app.use(express.json())
app.use(cors())
app.use('/', routes)


app.use(passport.initialize())
require('./auth/passport')(passport)


const mongo = require('./database')
const db = mongo.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose!'))


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})