require('dotenv').config()
const jwt = require('jsonwebtoken')


const verifyAuth = (req, res, next) => {
    const authHeader = req.headers['x-authorization']
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            if (err){
                return res.status(403).json({msg:'Something went wrong when we tried to authorize your request, try re-logging'})
            }

            req.user = user

            next()
        })
    } else {
        return res.status(401).json({msg:'You must be logged in to complete this request.'})
    }
}




module.exports = verifyAuth