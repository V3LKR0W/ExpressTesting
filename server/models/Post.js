const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const Schema = mongoose.Schema

const settings = {
    titleMin: 3,
    titleMax: 40,
    contentMax: 2000,
}


const Posts = new Schema({
    title:{
        type: String,
        required: 'Title cannot be empty',
        minLength: settings.titleMin,
        maxLength: settings.titleMax
    },
    content:{
        type: String,
        required: 'Content cannot be empty',
        maxLength: settings.contentMax,
    },
    poster:{
        type: String,
    },
    timestamp:{
        type: Number,
    }
})

Posts.plugin(beautifyUnique)

const createPost = mongoose.model('Posts', Posts)

module.exports = createPost

