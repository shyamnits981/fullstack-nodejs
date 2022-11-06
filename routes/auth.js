const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const User = mongoose.model("User")
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys')


router.post('/signup', (req, res) => {
    const { username, email, password } = req.body
    if (!email || !password || !username) {
        return res.status(422).json({ error: "Please add all the fild properly" })
    }
    User.findOne({ email: email }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "user alredy exits with that email" })
        }
        bcryptjs.hash(password, 12).then(hashedpassword => {
            const user = new User({
                username,
                email,
                password: hashedpassword,
            })

            user.save().then(user => {
                res.json({ message: "saved successfully" })
            }).catch((err) => {
                console.log(err);
            })
        })
    }).catch((err) => {
        console.log(err);
    })
})



router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" })
    }
    User.findOne({ email: email }).then(savedUser => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email or Password" })
        }
        bcryptjs.compare(password, savedUser.password).then(doMatch => {
            if (doMatch) {
                // res.json({ message: "successfully signed in" })
                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                const { _id, username, email } = savedUser
                res.json({ token, user: { _id, username, email } })
            }
            else {
                return res.status(422).json({ error: "Invalid Email or Password" })
            }
        }).catch(err => {
            console.log(err);
        })
    })
})


module.exports = router;