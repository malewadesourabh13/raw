const express = require('express');
const generateToken = require('../generatetoken');
const User = require('../models/userModel')

//login & authenticate user and get token POST
const authUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if(user && (await user.matchPassword(password))) {
            return res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else { 
            return res.send({
                status: 401,
                message: `Invalid Email or Password`
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//register a new user POST
const registerUser = async(req, res) => {
        const { name, email, password, paid } = req.body

        if (name && email && password ) {
            const userExists = await User.findOne({ email: email })
            if(userExists) {
                return res.send({
                    status: 400,
                    message: `User already exists`
                })
            }
    
            const user = await User.create({
                name: name,
                email: email,
                password: password,
                paid: paid
            })
    
            if(user) {
                return res.send({
                    status: 201,
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                })
            } else {
                res.send({
                    status: 401,
                    message: `Invalid User data`
                })
            }
        } else {
            return res.send({
                status: 401,
                message: `Invalid User data`
            })
        }
}


//get user profile GET - need token 
const getUserProfile = async(req, res) => {
   const user = await User.findById(req.user._id)

   if(user) {
       return res.send({
           _id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           paid: user.paid
       })
   } else {
       return res.send({
            status: 404,
            message: `User not found`
       })
    }

}

//update user profile PUT-need token 
const updateUserProfile = async(req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
    
        const updatedUser = await user.save()
    
        return res.send({
           _id: updatedUser._id,
           name: updatedUser.name,
           email: updatedUser.email,
           isAdmin: updatedUser.isAdmin,
           token: generateToken(updatedUser._id),
        })
      } else {
          return res.send({
              status: 404,
              message: `User not found`
        })
      }
}

//get all users by only admin GET - need token 
const getUsers = async (req, res) => {
    const users = await User.find({})
    return res.send(users)
}


//delete a user DELETE -by admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      return res.send({ message: 'User removed' })
    } else {
        return res.send({
            status: 404,
            message: `User not found`
      })
    }
}


//get user by id - admin
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
        return res.send(user)
    } else {
        return res.send({
            status: 404,
            message: `User not found`
      })
    }
}


//update user by id - admin
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
  
      const updatedUser = await user.save()
  
      return res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
        return res.send({
            status: 404,
            message: `User not found`
      })
    }
}
  


module.exports = {authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }