const express = require('express')
const router = express.Router();
const User = require('../models/user');
const authenticateToken = require('../middleware/auth');


// get user by id (show profile)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// update user (Edit profile)
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = router;