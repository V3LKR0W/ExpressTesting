const express = require('express')
const CORS = require('cors')
const users = require('./routes/users')
const posts = require('./routes/post')
const PORT = process.env.PORT || 4000
const db = require('./database')
const app = express()

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
if (!app.settings.env === 'development') {
    corsOptions.origin = 'https://example.com'
}

app.use(CORS(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

// Routes
app.use('/users', users)
app.use('/posts', posts)



// Startup server
app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`)
})