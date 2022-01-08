require('dotenv').config()
const express = require('express')
const fs = require('fs')

const { database } = require('./utils/database')

const app = express()

database()

app.use(express.json())

app.get('/', (req, res) => res.send('DevBook API is ready.'))

fs.readdirSync('./routes').map((route) => {
  route = route.split('.')[0]
  return app.use(`/${route}`, require(`./routes/${route}`))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`))
