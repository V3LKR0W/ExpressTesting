const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const Schema = mongoose.Schema

const User = new Schema({
    username:{
        type: String,
        unique: 'Username taken',
        required: true
    },
    email:{
        type: String,
        unique: 'Email taken',
        required: true,
    },
    password:{
        type: String,
        unique: false,
        required: true,
    },
})

User.plugin(beautifyUnique)
const createUser = mongoose.model('Users', User)

module.exports = createUser