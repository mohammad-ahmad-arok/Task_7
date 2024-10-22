const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// add new user
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// login 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "all data is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

        res.json({ message: 'login successful', token: token });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});


module.exports = router;