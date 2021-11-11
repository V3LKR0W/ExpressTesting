require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zzim0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
})
    .catch(e=>{
        console.log('Connection error: ' + e.message)
    })

const db = mongoose.connection
module.exports = db