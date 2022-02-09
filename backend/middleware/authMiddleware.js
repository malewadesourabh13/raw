const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async(req, res, next) => {
    let token 

    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
        ) {
            try {
                token = req.headers.authorization.split(' ')[1]

                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                
                /* console.log(decoded); */

                req.user = await User.findById(decoded.id).select('-password')

            
            } catch (error) {
                console.log(error);
                return res.send({
                    status: 401,
                    message: `Not Authorized, no token`
                })
            }
        /* console.log(`Token Found`); */
    }

    if(!token) {
        return res.send({
            status: 401,
            message: `Not Authorized, no token`
        })
    }

    next()
}

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        return res.send({
            status: 401,
            message: `Not Authorized, as an Admin`
    })
  }
} 

module.exports = {protect, admin}