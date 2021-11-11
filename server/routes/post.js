const express = require('express')
const verifyAuth = require('../authJWT')
const PostModel = require('../models/Post')
const router = express.Router()



router.post('/create', verifyAuth, (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const poster = req.user.username
    const timestamp = Date.now()

    const Post = new PostModel({
        title: title,
        content: content,
        poster: poster,
        timestamp: timestamp
    })

    Post.save((err, post)=>{
        if (err){
            return res.status(500).json({err})
        }
        res.json({post})            
    })
})

router.delete('/delete', verifyAuth, (req, res) => {
    const postID = req.body.post_id
    PostModel.findById(postID, (err, post) => {
        if (err) {
            return res.status(500).json({msg: 'Unable to delete post'})
        } else if (!post){
            return res.status(404).json({msg: 'Post not found'})
        } else {
            if (!post.poster === req.user.username){
                return res.status(401).json({msg: 'Unable to delete post'})
            } else {
                post.delete()
                res.status(200).json({msg: 'Post successfully deleted'})
            }
        }

    })
})

router.post('/search', (req, res) => {
    const query = req.body.query
    PostModel.find({title: {'$regex': RegExp(query, 'i')}}, (err, post) => {
        if (err){
            return res.status(500).json({msg: 'Internal server error'})
        }

        if (post.length <= 0){
            return res.status(404).json({msg: 'Post not found'})
        }

        return res.status(200).json(post)
    })
})



module.exports = router