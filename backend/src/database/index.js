const mongoose = require('mongoose')

const url = process.env.DATABASE_URL

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)

module.exports = mongoose