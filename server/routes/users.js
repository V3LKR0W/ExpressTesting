require('dotenv').config()
const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyAuth = require('../authJWT')
const router = express.Router()

router.post('/signup', async (req, res) =>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const hashed_password = await bcrypt.hash(password, 10)

    const newUser = await new User({
        username: username,
        email: email,
        password: hashed_password
    })


    newUser.save((error) => {
        if (error){
            if (error.errors.email){
            return res.status(500).json({msg: error.errors.email.message})
        } else {
            return res.status(500).json({msg: error.errors.username.message})
        }} else {
            return res.status(200).json({ msg: 'User Created successfully!'})
        }
    })
})

router.post('/login', async (req, res) => {
    const request_username = req.body.username
    const request_password = req.body.password
   
    await User.findOne({username: request_username}, function(err, user){
        if (err) {
            return res.status(500).json({msg: 'Internal server error'})
        }

        if (!user){
            return res.status(404).json({msg: 'Username not found'})
        } else {
            bcrypt.compare(request_password, user.password, async function(err, result){
                if (err) {
                    return res.status(500).json({msg: 'Internal server error'})
                }
                if (result === true) {
                    
                    const payload = {
                        username: user.username,
                    }

                    const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1500h'})
                    return res.status(200).json({token: token})
                } else {
                    return res.status(401).json({msg: 'Incorrect username or password'})
                }
            })
        }
    })

})



module.exports = router